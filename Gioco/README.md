# Zuckemon
Versione Zuckemon del team Veneto.
## Files:
    - index.html            --> Pagina iniziale del gioco.
    - indexStyle.css        --> File css per la pagina iniziale.
    - index.js              --> File javascript contenente il codice che fa funzionare la pagina iniziale.
    - choosingTeam.html     --> Pagina di preparazione alla partita (selezione dei pokemon per ogni team).
    - prepStyle.css         --> File css per la pagina di preparazione alla partita.
    - prep.js               --> File javascript contenente il codice che fa funzionare la pagina di preparazione alla partita.
    - battle.html           --> Pagina della battaglia.
    - battle.css            --> File css per la pagina di battaglia
    - battle.js             --> File javascript contenente il codice che fa funzionare la pagina di battaglia.

## Directory:
    - fonts\                --> Contiene tutti i fonts custom in formato woff.
    - images\               --> Contiene tutte le immagini e i vari sprite per le pagine.
    - js\                   --> Contiene tutti i file javascript che non servono a far funzionare una pagina html (più dettagliato sotto).
    - css\                  --> Contiene tutti i file css per ogni file html.
    - js\data\              --> Contiene tutti i file con al loro interno dati per il gioco (più dettagliato sotto).

## Script:
    - bestMatch.js          --> File javascript che contiene la funzione capace di determinare il best match di una stringa con un array di stringhe.
    - loadPokemon.js        --> File javascript che, dato un pokemon, ne ritorna un oggetto contenente tutte le stats e info di quel pokemon.
    - colorGradient.js      --> File javascript che, dato un tipo di pokemon, ritorna vari tipi e modelli di gradazioni di colori diverse in base alla palette.
    - damageCalculator.js   --> File javascript che, dato attaccante, difensore e mossa ritorna il numero di hp da togliere al difensore.
    - printCard.js          --> File javascript che, dato in input un pokemon, ne printa a schermo la carta con i valori ed i colori corretti.
    - printDialogue.js          --> File javascript che, data in input una stringa, la mostra correttamente nella schermata di dialogo.
  
## Data:
    - pokedex.js            --> Contiene un array con i nomi di tutti i pokemon e mosse presenti e due funzioni che gettano una mossa o un pokemon dall'api.
    - typescolor.js         --> Contiene un array con tutti i tipi pokemon e le rispettive palette di colori per lo styling.
    - typeEffectivness      --> Contiene un oggetto che, in base al tipo del pokemon attaccante e difensore, ritorna il valore numerico da inserire nella formula.

## TODO Script:
- [X] Nella pagina di prep impostare tutto con lo stesso stile pixelato (fixare tasto i choose you e scritte team)
- [X] Aggiungere la pagina di tutorial ed implementarla con il click sul tasto '?' nell'index.
- [X] Creare pagina battaglia.
- [X] Creare sprites pokeball per la pagina battaglia.
- [X] Importare tramite l'api pokemon le info dei pokemon (importare tutto nel file pokedex o fare una richiesta ogni partita per i pokemon scelti?).
- [X] Decidere quali sprites usare per i pokemon (di quale gen).
- [X] Mostrare in battaglia sulla carta il tipo del pokemon.
- [X] Nella pagina battaglia creare pulsante sulla carta che permette di switchare info del pokemon (o visualizza le mosse o le stats).
- [X] Far cambiare colore alla carta in base al tipo del pokemon, utilizzando la palette in typescolor.js
- [X] Scegliere casualmente dall'API 4 mosse che ogni pokemon avrà.
- [X] Inserire i riquadri per le mosse e farle visualizzare.
- [X] Importare damage calculator con l'API di Pokemon Showdown.  [API AL MOMENTO DOWN, SCRITTA LA FORMULA A MANO]
- [X] Creare fase effettiva della fight (tutti e due scelgono una mossa e chi è più veloce attacca per primo).
- [ ] Cercare una soluzione per le immagini dei pokemon piccoli.
- [X] Nella pagina battaglia far spostare la barra di input e il bottone sotto il team a cui tocca.
- [ ] Implementare il STT (Speech to Text).
- [X] Implementare automa.
- [ ] Cambiare sfondo dell'immagine del pokemon a seconda del tipo.
- [X] Resettare i pp quando si refresha la pagina.
- [ ] Capire cosa fare con i pokemon che hanno le trasformazioni
- [ ] Capire se implementare o meno le abilità.
- [X] Implementare un sistema di notifiche come nel videogioco in modo da dare un output al giocatore durante la partita.
    - [X] Implementare il sistema primitivo.
    - [X] Testarlo in tutte le occasioni per verificarne il corretto funzionamento. 
- [ ] Aggiungere la musica.
- [ ] Aggiungere la vittoria quando uno dei due team ha tutti e 6 i pokemon esausti.
- [ ] Implementare priorità mosse.
- [X] Implementare doppie mosse (tipo double kick o slap che vengono eseguite più di una volta)
- [X] Implementare accuracy delle mosse
- [ ] Aggiungere tasto info per le mosse.
    - [X] Aggiungere le info base (accuracy e power)
    - [ ] Aggiungere una breve descrizione della mossa
- [X] Implementare pokemon nuove generazioni (ora si arriva fino alla settima).
- [ ] Su prep.html mettere che il pokemon inserito deve avere minimo 4 caratteri
- [ ] Aggiungere colpo critico
- [ ] Implementare mosse passive:
    - [X] Implementare modifiche alle stats
    - [ ] Implementare ailments (burn, asleep ecc)
    - [ ] Eliminare dall'array tutte le mosse impossibili da scriptare.
   
## TODO Design:
- [X] Rivedere pallini di completamento quando si scelgono i pokemon da vedere nella squadra.
- [X] Rivedere i colori dei tipi.
    - [X] Poison.
    - [X] Psycho.
    - [X] Bug.
    - [X] Fight (troppo simile a ground, deve essere più rosa/rosso).
- [ ] Rivedere i colori dei gradient dei tipi (background della carta).
    - [X] Dragon.
    - [ ] Dark.
    - [ ] Bug.
    - [X] Fight.
    - [ ] Rock.
    - [X] Ground.
    - [ ] Ghost.
    - [X] Grass.
    - [X] Normal.
    - [X] Poison.
    - [X] Psycho
- [X] Aggiungere tutto il regolamento con le varie pagine.
- [ ] Sistemare le pagine quando vengono resizate.
- [ ] Fixare la barra di input nella pagina battaglia, al resize della finestra si stacca dalla carta quando dovrebbe invece starle attaccata.
- [X] Fixare scritte red team e blue team (troppo pixelate e si vedono male).
- [X] Creare animazione di attacco.
- [ ] Creare animazione di morte.
   
## Problemi:
- [X] Le scritte 'red team!' e 'blue team!' in prep.html non sono centrate rispetto alla pokeball.
- [X] Mr. Mime non viene preso come pokemon durante la scelta.
- [ ] I nuovi pokemon non hanno dei nomi fatti bene ma con i trattini ("Urshifu" dalla api diventa "urshifu-single-strike"), che vengono visualizzati sulla carta.
- [X] Alcuni pokemon (come caterpie e metapod) hanno meno di 4 mosse che imparano tramite level-up, creando un loop infinito che blocca tutto.
- [X] Prep.html appare la barra per scorrere in basso
- [X] Quando il pokemon missa l'animazione non viene eseguita anche se dovrebbe.
- [ ] Le mosse con il nome lungo si vanno ad overlappare al bottone delle info della mossa (es: flamethrower).
- [ ] Quando si apre il regolamento viene la barra per scorrere in basso nella pagina.

## Link utili:
- **Web Speech API:**
  - https://github.com/ITIS-Zuccante/web-speech-api
  - https://tutorialzine.com/2017/08/converting-from-speech-to-text-with-javascript
  - https://www.google.com/intl/en/chrome/demos/speech.html
  - https://cloud.google.com/speech-to-text/
  - http://www.moreawesomeweb.com/demos/speech_translate.html
  - https://mdn.github.io/web-speech-api/speak-easy-synthesis/
 
- **Pokemon API:**
  - https://pokeapi.co/
  - https://github.com/smogon/damage-calc
 
- **Pokemon:**
  - https://bulbapedia.bulbagarden.net/wiki/Damage
 
- **Validità del sito:**
  - http://lau.csi.it/
  - https://validator.w3.org/

