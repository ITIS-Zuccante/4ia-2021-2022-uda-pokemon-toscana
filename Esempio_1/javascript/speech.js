import {
    Automaton
} from './modules/automaton.js';
let automaton = Automaton(); // assomiglia ad una new di Java


// import { InputData } from './modules/inputData.js';
// let inputData = InputData(); // assomiglia ad una new di Java

// import { BestMatch } from './modules/bestMatch.js';
// let bestMatch = BestMatch(); // assomiglia ad una new di Java



// document.getElementById("leftMic").onclick = function () { start("left");  }
// document.getElementById("rightMic").onclick = function () { start("right");  }
//document.getElementById("rightMic").addEventListener("click", () => { start("right"); });

import {
    Moves
} from './fight/Fmodules/moves.js';

import {
    findPokemon
} from "./fight/fight.js";

let lastPos, lastListOfPokemonInTheTeam;

export function Speech() {
    var results, interim, final_transcript = '',
        interim_transcript = '';

    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    var restart = function () {
        start(lastPos, lastListOfPokemonInTheTeam)
        var results, interim, final_transcript = '',
            interim_transcript = '';

        var recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

    }
    // var start = (pos) => {
    var start = function (pos, listOfPokemonInTheTeam) {
        lastPos = pos, lastListOfPokemonInTheTeam = listOfPokemonInTheTeam;
        console.log("Speech called. All the pokemon of the " + pos + " team are : ");
        console.log(listOfPokemonInTheTeam);
        final_transcript = '';
        interim_transcript = '';
        recognition.start();

        recognition.onresult = function (event) {
            interim_transcript = '';

            for (var i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    final_transcript += event.results[i][0].transcript;
                } else {
                    interim_transcript += event.results[i][0].transcript;
                }
            }
            //results.innerHTML = final_transcript;
            //interim.innerHTML = "Currently Saying: " + interim_transcript;
            console.log("Currently Saying: " + interim_transcript);

            automaton.run(final_transcript, listOfPokemonInTheTeam, pos);
            console.log(final_transcript);
            //console.log("accepted "+automaton.accepted());


            switch (automaton.accepted()) {
                case 0:
                    console.log("Speech in fase codice 0 : il Pokemon richiesto è " + automaton.getPokemon());
                    console.log("Ho capito! Vuoi : " + automaton.getPokemon());
                    findPokemon(automaton.getPokemon(), pos);
                    automaton.setPokemon(); //Questa funzione annulla il nome del pokemon, che altrimenti sarebbe composto da tutti i nomi di pokemon che sono stati richiamati 
                    // da quando la pagina è in funzione.
                    recognition.stop();
                    break;
                case 1:
                    let mossa = automaton.getMove();
                    console.log("Speech in fase codice 1 : la mossa richesta è " + mossa);

                    let proprietà = Moves().getMoveInfo(mossa)[0]; //Potenza della mossa, in questo caso utilizzata per controllare se fa danno

                    console.log(proprietà);
                    //Mossa del pokemon, target
                    if (!proprietà) { //La mossa non fa danno (null)

                        alert("La mossa scelta non effettua alcun danno");

                    } else {
                        alert("Purtroppo la parte del danno non è completa :(")
                        // Moves().damage(mossa, pos);
                    }

                    recognition.stop();
                    break;
                case 2:
                    console.log("Speech in fase codice 2 : la pozione richiesta è " + automaton.getPotion());


                    recognition.stop();
                    break;
                default:
                    console.log("Non ho ancora capito.");
            }


            // if (automaton.accepted()==0) {

            // } else {
            //     console.log("Non ho ancora capito.")
            // }

            // fai girare l'automa su tutto il final_transcript
            // e se l'automa ha accettato la frase, fatti dare da lui il nome del pokemon
            // e esegui le chiamate ajax opportune

            // inputData(pos, bestMatch(final_transcript));

        };

        recognition.onend = function (event) { //LA PAUSA DEVE ESSRE DI 8 SECONDI CIRCA PERCHè QUESTO SI VERIFICHI
            final_transcript = '';
            interim_transcript = '';
            console.log("recognition.stop()")
            recognition.stop();
        };
    };
    return {
        "start": start,
        "restart": restart
    }
}