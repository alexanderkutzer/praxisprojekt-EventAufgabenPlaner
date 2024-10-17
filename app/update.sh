#!/bin/bash

# .env-Datei laden und Anmeldedaten setzen
if [ -f .env ]; then
  source .env
else
  echo ".env-Datei nicht gefunden. Bitte neu erstellen nach Vorlage in 'env' Datei."
  exit 1
fi

# Überprüfen, ob die AWS-Anmeldedaten und PEM_FILE_PATH gesetzt sind
if [ -z "$AWS_ACCESS_KEY_ID" ] || [ -z "$AWS_SECRET_ACCESS_KEY" ] || [ -z "$AWS_SESSION_TOKEN" ] || [ -z "$PEM_FILE_PATH" ]; then
    echo "Fehler: Fehlende AWS-Zugangsdaten oder PEM-Dateipfad in der .env-Datei."
    exit 1
fi

# Instanz-ID der EC2-Instanz ermitteln
INSTANCE_ID=$(aws ec2 describe-instances \
    --filters "Name=tag:Name,Values=$AWS_EC2_INSTANCE_NAME    " \
    --query "Reservations[0].Instances[0].InstanceId" \
    --output text)

# Überprüfen, ob die Instanz gefunden wurde
if [ "$INSTANCE_ID" == "None" ]; then
    echo "Fehler: Keine Instanz mit dem Namen '$AWS_EC2_INSTANCE_NAME' gefunden."
    exit 1
fi

# IP-Adresse der Instanz abrufen
INSTANCE_IP=$(aws ec2 describe-instances \
    --instance-ids $INSTANCE_ID \
    --query "Reservations[0].Instances[0].PublicIpAddress" \
    --output text)

if [ -z "$INSTANCE_IP" ]; then
    echo "Fehler: Keine öffentliche IP-Adresse für die Instanz gefunden."
    exit 1
fi

echo "Verbindung zu Instanz $INSTANCE_ID (IP: $INSTANCE_IP) wird hergestellt und Update wird durchgeführt..."


# Erstellen eines lokalen Backup-Verzeichnisses, falls es noch nicht existiert
mkdir -p "$LOCAL_BACKUP_DIR"

# DB-Backup erstellen und auf den lokalen Rechner übertragen
ssh -i "$PEM_FILE_PATH" ec2-user@$INSTANCE_IP << EOF
  # Wechsle ins DB-Verzeichnis und kopiere die Datenbank als Backup-Datei
  cd $DB_PATH
  cp * "/tmp/$BACKUP_NAME"
EOF

# Backup-Datei herunterladen
scp -i "$PEM_FILE_PATH" ec2-user@$INSTANCE_IP:/tmp/$BACKUP_NAME "$LOCAL_BACKUP_DIR"

# Erfolgsmeldung ausgeben
if [ $? -eq 0 ]; then
  echo "Backup erfolgreich auf $LOCAL_BACKUP_DIR/$BACKUP_NAME gespeichert."
else
  echo "Fehler beim Erstellen des Backups."
fi

# Führe die Befehle direkt auf der EC2-Instanz aus
ssh -i "$PEM_FILE_PATH" -o "StrictHostKeyChecking=no" ec2-user@$INSTANCE_IP << EOF
  # Prozesse beenden (nur eigene npm und node Prozesse)
  echo "Suche und beende laufende npm und node Prozesse..."

  npm_pid=\$(ps -u ec2-user -A | grep "npm run start" | awk '{print \$1}')
  node_pid=\$(ps -u ec2-user -A | grep "node" | awk '{print \$1}')

  if [ -n "\$npm_pid" ]; then
    echo "Beende npm-Prozess mit PID: \$npm_pid"
    kill -9 \$npm_pid 2>/dev/null || echo "Konnte npm-Prozess \$npm_pid nicht beenden (Zugriff verweigert)."
    sleep 2
  else
    echo "npm-Prozess nicht gefunden."
  fi

  if [ -n "\$node_pid" ]; then
    echo "Beende Node-Prozess mit PID: \$node_pid"
    kill -9 \$node_pid 2>/dev/null || echo "Konnte Node-Prozess \$node_pid nicht beenden (Zugriff verweigert)."
    sleep 2
  else
    echo "Node-Prozess nicht gefunden."
  fi

  # Vorhandenes Projektverzeichnis löschen und neu klonen
  echo "Starte Update des Projekts..."
  rm -rf /home/ec2-user/praxisprojekt-EventAufgabenPlaner
  git clone https://github.com/alexanderkutzer/praxisprojekt-EventAufgabenPlaner.git /home/ec2-user/praxisprojekt-EventAufgabenPlaner
  echo "Repository erfolgreich neu geklont."

  echo "Installiere NPM-Pakete..."
  cd /home/ec2-user/praxisprojekt-EventAufgabenPlaner/app/view/
  sleep 2
  npm install
  sleep 2

  echo "Erstelle Build..."
  npm run build:server
  sleep 2

  # Verzeichnisinhalt löschen und neuen Build kopieren
  sudo rm -rf /var/www/html/*
  cd /home/ec2-user/praxisprojekt-EventAufgabenPlaner/app/view/dist
  sudo cp -r * /var/www/html
  sleep 2

  # API neu starten
  cd /home/ec2-user/praxisprojekt-EventAufgabenPlaner/app/api
  sleep 2
  npm install
  sleep 2
  nohup npm run start > api.log 2>&1 &

  # Kurze Wartezeit, um sicherzustellen, dass der Server Zeit zum Starten hat
  sleep 2

  # API-Verfügbarkeit prüfen
  echo ""
  curl -s http://localhost:3000 -X POST 
  if [ $? -ne 0 ]; then
    echo -e "\nAPI läuft nicht"
  else
    echo -e "\nAPI läuft erfolgreich\n"
  fi

  echo -e "\nUpdate und Neustart abgeschlossen."
  exit
EOF


echo "Instance ID: $INSTANCE_ID"
echo "Public IP: $INSTANCE_IP"
