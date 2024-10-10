## React app struktur

view:

    - ✅src | programmcode
    
        ✅- components | wiederverwendbare komponenten
        
            ❌- html | html komponenten
            
                ❌- button:link | button
                
                ❌- button:submit | submit button
                
                ❌- button:positive | positiver button
                
                ❌- button:negative | negativer button
                
                ❌- input:text | eingabefeld
                
                ❌- input:password | passwort eingabefeld
                
                ❌- select | auswahlfeld
                
                ❌- inputselect | eingabeauswahl
                
                ❌- form | formular
                
            ❌- core | kernkomponenten
            
                ❌- header | kopfzeile
                
                ❌- footer | fußzeile
                
                ❌- sidebar | seitenleiste
                
                ❌- main | hauptbereich
                
                ❌- task | aufgaben
                
                ❌- user | benutzer
                
                ❌- login | login
                
                ❌- register | registrierung
                
                ❌- profile | profil
            
        ❌- pages | seiten
        
            ❌- core | kernseiten
            
                ❌- login | login seite
                
                ❌- register | registrierungs seite
                
                ❌- 🔐profile | profil seite
                
            ❌- home | startseite
            
            ❌- 👤dashboard | hauptseite
            
            ❌- 👤Events | events
            
            ❌- 👤Tasks | aufgaben
            
            ❌- 🔐admin | admin
            
                ❌- 🔐user | benutzer
                
                ❌- 🔐userroles | benutzerrollen
   
        ✅- App.js | hauptkomponente
