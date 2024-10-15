#!/bin/bash

# .env-Datei laden
if [ -f .env ]; then
  source .env
else
  echo ".env-Datei nicht gefunden. Bitte neu erstellen nach Vorlage in 'env' Datei."
  exit 1
fi

# Festlegen von SSHLocation je nach Modus
if [ "$MODE" == "dev" ]; then
  SSH_LOCATION="0.0.0.0/0" # Offen für alle
else
  SSH_LOCATION="127.0.0.1/32" # Geschlossen (nur Loopback)
fi

# Stack-spezifische Variablen
STACK_NAME="EventAufgabenPlaner-Stack"
TEMPLATE_FILE="template.yaml"
REGION="eu-central-1"

echo "Deployment von $TEMPLATE_FILE zu CloudFormation Stack: $STACK_NAME in Region: $REGION..."

# Login sicherstellen
aws sso login

# Überprüfung des AWS-Identitätstokens
aws sts get-caller-identity

# Stack erstellen oder aktualisieren
aws cloudformation deploy \
  --stack-name $STACK_NAME \
  --template-file $TEMPLATE_FILE \
  --parameter-overrides KeyName="$KEY_PAIR_NAME" \
  SSHLocation="$SSH_LOCATION" \
  --capabilities CAPABILITY_NAMED_IAM \
  --region $REGION

# Ergebnisprüfung
if [ $? -eq 0 ]; then
  echo "Stack $STACK_NAME wurde erfolgreich erstellt."
else
  echo "Fehler beim Erstellen des Stacks!"
fi

echo "Deine Logindaten für AWS sind:"
echo "AWS_ACCESS_KEY_ID: $AWS_ACCESS_KEY_ID"
echo "AWS_SECRET_ACCESS_KEY: $AWS_SECRET_ACCESS_KEY"
echo "AWS_SESSION_TOKEN: $AWS_SESSION_TOKEN"
echo "KEY_PAIR_NAME: $KEY_PAIR_NAME"
# Modus-spezifische Warnung
if [ "$MODE" == "dev" ]; then
  echo "Achtung: Port 22 ist im Modus 'dev' für alle offen!"
else
  echo "Modus 'prod': Port 22 ist standardmäßig geschlossen."
fi
