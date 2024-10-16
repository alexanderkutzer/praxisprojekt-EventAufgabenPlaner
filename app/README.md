View: React app struktur 
Api: Node.js api struktur

**werden über die**

```sh
start-dev.sh
```
**zusammen installiert und gestartet.**
ausgabe ist in einen terminal

diese variante wird bevorzugt da ggf über das script etwas vorbereitet wird.


wenn es einzelnd gestartet werden soll


die über jeweils in dem ordnern mit

```sh
npm install
```

installiert werden können.

und mit jeweils im ordner

```sh
npm run dev
```

gestartet werden fürs development im watch mode.


die strukturen werden in den jeweiligen README.md dateien beschrieben.


deployment.sh:
 Einmalig ausführen, um die komplette AWS-Infrastruktur automatisch mit AWS Cloudfront zu erstellen und zu konfigurieren.
 Github Verzeichnis wird automatisch geclont, eingerichtet, dass Node, Api läuft, ... 

```sh
./deployment.sh
```
update.sh: 
Aktualisiert das Verzeichnis, lädt aktuelle Version von Github auf der EC2-Instanz und startet die Anwendung neu, mit allen Abhängigkeiten

```sh
./update.sh
```

env: 
Template für benötigte Zugangsdaten und Konfigurationen:

AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_SESSION_TOKEN: AWS-Zugangsdaten.
PEM_FILE_PATH: Pfad zur .pem-Datei für SSH-Zugriff auf die EC2-Instanz. (Wichtig: .pem Datei mit chmod 400!!!)
Füge deine eigenen Werte in die .env Datei ein und halte diese privat.
