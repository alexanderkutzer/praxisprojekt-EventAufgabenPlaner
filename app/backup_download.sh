#!/bin/bash
DB_PATH="~/praxisprojekt-EventAufgabenPlaner/app/api/data/"
LOCAL_BACKUP_DIR="./backup/"
BACKUP_NAME="db.$(date +%Y-%m-%d-%H-%M-%S).sqlite3"
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
  --filters "Name=tag:Name,Values=$AWS_EC2_INSTANCE_NAME" \
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

echo "Verbindung zu Instanz $INSTANCE_ID (IP: $INSTANCE_IP) wird hergestellt und Backup wird durchgeführt..."

# Erstellen eines lokalen Backup-Verzeichnisses, falls es noch nicht existiert
mkdir -p "$LOCAL_BACKUP_DIR" && echo "Backup-Verzeichnis erstellt: $LOCAL_BACKUP_DIR"
echo $DB_PATH $BACKUP_NAME
# DB-Backup erstellen und auf den lokalen Rechner übertragen
ssh -i "$PEM_FILE_PATH" ec2-user@$INSTANCE_IP <<EOF
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
