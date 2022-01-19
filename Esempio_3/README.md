# 4ic-pokemon-game-birr
4ic-pokemon-game-birr created by GitHub Classroom

# IMPORTANT THINGS
- Prima di fare qualsiasi cosa con l'automa premere il bottone "Fight!" in battle.html, serve ad inizializzare i turni (comincia sempre la squadra di sinistra).
- Per verificare che gli HP tolti siano corretti nella console viene scritto un numero che rappresenta il damage calcolato.
- Per i colpi critici abbiamo inserito un alert in modo da poterli riconoscere. Determinare se i colpi critici avvengono troppo frequentemente o meno (in questa configurazione vengono rispettate le specifiche della wiki).
- Per le mosse il cui nome è composto da due parole, ricordarsi di apporre il carattere "-" tra esse. (es. air-slash, NOT air slash).

# TODO

- [x] Fare in modo che quando viene detto all'automa "PokemonName I Choose You" venga caricato il pokèmon corretto in termini di shiny. Ora la funzione che carica il pokémon nella carta rigenera il valore random che stabilisce se un pokémon è shiny o meno. Questo valore però è già stabilito, durante la creazione del team, ed è scritto all'interno dell'oggetto JSON caricato nel localStorage. Per risolvere ciò, nella funzione getPokemon di main.js bisogna leggere il valore hasShiny del pokémon all'interno del localstorage e quindi determinare se il pokémon sia shiny o meno.

- [x] Nelle immagini a lato, che rappresentano il team di sinistra e destra, fare in modo che quando il pokemon muore (attribute('health') <= 0) lo sfondo diventi rosso.

- [x] Sfumare il colore dei tipi sull'"onhover" delle immagini a lato.

- [x] Rallentare l'animazione della vita che scende durante l'attacco dei pokemon.

- [x] Creare l'animazione che simula la morte di un pokemon durante la battaglia (deve essere richiamata quando attribute('health') <= 0).

- [x] Capire perché, quando viene fatta una mossa da parte del pokémon di destra bisogna accendere il microfono, parlare, spegnerlo e così si dovrebbe attivare l'automa che però non parte finché non viene ripetuta l'azione di accensione e spegnimeno del microfono.

- [x] Aggiungere il caso quando le velocità sono uguali.

- [x] Implementare la funzione che, quando viene richiamata una delle tre pozioni disponibili per i pokémon (normal, super, hyper) rigeneri la vita del pokémon in caso abbia valore minore a quello massimo. !ATTENZIONE! Se gli HP massimi di un pokémon sono 65 e in quel momento il pokémon ha 50 di vita e gli viene chiamata una pozione che dovrebbe rigenerare 20 HP, il pokémon deve avere comunque come vita massima 65 ~~e non 70~~.

- [x] Sistemare le animazioni del doppio bounce-in e l'animazione dell'attacco.

- [x] Decidere se cambiare o meno le animazioni fatte in css in animazioni fatte con jQuery.

- [x] Fare in modo che i Pokémon morti non possano essere richiamati.

- [x] Nel local.storage salvare la vita del Pokémon.

- [x] Apply Dynamax non funziona perché non carica le immagini.

- [x] Se un Pokémon OHKO un altro Pokémon senza che quest'ultimo riesca ad attaccare, il form selector scompare.

- [x] Togliere le mega evoluzioni (Dynamax?). !ATTENZIONE! Eliminare anche tutte le funzioni attinenti, non lasciare nulla che non serva.

- [ ] Capire se è possibile implementare nuove parole in speech recognizer in quanto in questa configurazione le mosse che hanno un nome composto da due parole devono essere esplicitamente unite del carattere "-", altrimenti non vengono riconosciute.

- [ ] Dividere il CSS presente all'interno di chooseTeams.html dall'HTML e pulire il resto del codice.

- [ ] Per quando torna Rizzo dalla settimana in vacanza: implementare la funzione che modific il danno in base al tempo meteorologico nella vit reale in prossimità di dove viene svolta la partita.

- [ ] Decidere cosa fare con le mosse di stato.

- [ ] Decidere cosa fare con tutti i file relativi all'index.

- [ ] Finire animazione vittoria.

