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

echo "Verbindung zu Instanz $INSTANCE_ID (IP: $INSTANCE_IP) wird hergestellt und Backup wird hochgeladen..."

LATEST_BACKUP=$(ls -t $LOCAL_BACKUP_DIR | head -n 1)

if [ -z "$LATEST_BACKUP" ]; then
  echo "Fehler: Keine Backup-Datei im lokalen Backup-Verzeichnis gefunden."
  exit 1
fi

echo "Die neueste Backup-Datei ist: $LATEST_BACKUP"


# DB-Backup erstellen und auf den lokalen Rechner übertragen
ssh -i "$PEM_FILE_PATH" ec2-user@$INSTANCE_IP << EOF
  # Wechsle ins DB-Verzeichnis und lösche den Inhalt, lade Backup DB-Datei hoch
  cd $DB_PATH
  rm -rf *
EOF

# neuste Backupdatei wird auf die EC2 instanc geladen, in /tmp/
scp -i "$PEM_FILE_PATH" "$LOCAL_BACKUP_DIR/$LATEST_BACKUP" ec2-user@$INSTANCE_IP:/tmp/

ssh -i "$PEM_FILE_PATH" -o "StrictHostKeyChecking=no" ec2-user@$INSTANCE_IP << EOF 
    # Überprüfen, ob das Verzeichnis existiert
    if [ ! -d "$DB_PATH" ]; then
        echo "Zielverzeichnis existiert nicht, bitte API starten."
        exit 1
    fi

    # Backup-Datei von /tmp ins Zielverzeichnis verschieben
    mv /tmp/$LATEST_BACKUP "$DB_PATH/"

    # überprüfen des db-Ordners:
    uploadet_db_file=(ls "$DB_PATH")

    # Erfolgsmeldung ausgeben
    if [ $? -eq 0 ]; then
        echo "Backup erfolgreich hochgeladen und aktualisiert. db-Datei:  $uploadet_db_file"
    else
        echo "Fehler beim Hochladen des Backups."
    fi
EOF


echo "Backup-Verfahren beendet."
