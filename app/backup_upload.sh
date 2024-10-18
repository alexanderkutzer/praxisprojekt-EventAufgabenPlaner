#!/bin/bash
DB_PATH="~/praxisprojekt-EventAufgabenPlaner/app/api/data/"
LOCAL_BACKUP_DIR="./backup/"
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

# neuste Backupdatei wird auf die EC2 instanc geladen, in /tmp/
scp -i "$PEM_FILE_PATH" "$LOCAL_BACKUP_DIR/$LATEST_BACKUP" ec2-user@$INSTANCE_IP:/tmp/

ssh -i "$PEM_FILE_PATH" -o "StrictHostKeyChecking=no" ec2-user@$INSTANCE_IP <<EOF
    # Wechsle ins DB-Verzeichnis und lösche den Inhalt, lade Backup DB-Datei hoch
    cd $DB_PATH
    rm -rf *
    # Überprüfen, ob das Verzeichnis existiert
    if [ ! -d $DB_PATH ]; then
        echo "Zielverzeichnis existiert nicht, bitte API starten."
        exit 1
    fi

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

    # Backup-Datei von /tmp ins Zielverzeichnis verschieben
    mv /tmp/$LATEST_BACKUP $DB_PATH/db.sqlite3

    # überprüfen des db-Ordners:
    uploadet_db_file=(ls "$DB_PATH")

    # Erfolgsmeldung ausgeben
    if [ $? -eq 0 ]; then
        echo "Backup erfolgreich hochgeladen und aktualisiert. db-Datei:  $uploadet_db_file"
    else
        echo "Fehler beim Hochladen des Backups."
    fi

    # API neu starten
    cd /home/ec2-user/praxisprojekt-EventAufgabenPlaner/app/api
    
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
EOF
echo $DB_PATH
echo "Backup-Verfahren beendet."
