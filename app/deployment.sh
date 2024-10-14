#!/bin/bash

# Variablen setzen
STACK_NAME="EventAufgabenPlanerStack"  # Name des CloudFormation-Stacks
TEMPLATE_FILE="template.yaml"          # Pfad zur Template-Datei
REGION="eu-central-1"                  # AWS-Region
PROFILE="student-profile"              # AWS CLI Profilname, optional

# CloudFormation Stack Deployment
echo "Deploying CloudFormation stack: $STACK_NAME"
aws cloudformation deploy \
  --stack-name $STACK_NAME \
  --template-file $TEMPLATE_FILE \
  --capabilities CAPABILITY_NAMED_IAM \
  --region $REGION \
  --profile $PROFILE

# Überprüfen, ob das Deployment erfolgreich war
if [ $? -eq 0 ]; then
  echo "Deployment erfolgreich abgeschlossen."

  # URL der Anwendung ausgeben
  WEB_URL=$(aws cloudformation describe-stacks \
    --stack-name $STACK_NAME \
    --query "Stacks[0].Outputs[?OutputKey=='WebURL'].OutputValue" \
    --output text \
    --region $REGION \
    --profile $PROFILE)

  echo "Die Anwendung ist verfügbar unter: $WEB_URL"
else
  echo "Deployment fehlgeschlagen."
fi
