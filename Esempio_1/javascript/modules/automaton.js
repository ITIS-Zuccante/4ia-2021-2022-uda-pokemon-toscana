/* 
    LEXER --> interpreta le stringhe 
    implementato con un automa a stati finiti
    riconosciamo le frasi generabili dalla seguente grammatica
    FORMA EBNF
    <frase> := <soggetto> <verbo>
    <soggetto> := <articolo> <nome>
    <articolo> := il
    <nome> := nonno | papà
    <verbo> := mangia | prega
*/

/*
function compose(automaton1, automaton2){
    // due cicli for
    // che collegano tutti glistati finali del primo automa agli stati iniziali 
    // del secondo automa
}
*/

import {
    Speech
} from '../speech.js';
let speech = Speech();

import {
    BestMatch
} from './bestMatch.js';
let bestMatch = BestMatch(); // assomiglia ad una new di Java

// import {
//     whosInCharge , inCharge
// } from "../fight/prova.js";

import {
    pokedex
} from '../team/Tmodules/pokedex.js'

// document.getElementById("checkIfInCharge").onclick = function () {
// whosInCharge("left");
// }

export function Automaton() {
    // Definiamo gli stati dell'automa
    let _START = {
        "final": false,
        "name": "START"
    };
    let _ATT = {
        "final": false,
        "name": "ATT"
    };
    let _POTION = {
        "final": false,
        "name": "POTION"
    };
    let _VERBO = {
        "final": false,
        "name": "VERBO"
    };
    let _END = {
        "final": true,
        "name": "END",
        "code": 0
    };

    /*
        END CODES
        -1: ERROR
        0: richiama pokemon
        1: fai mossa

    */

    let _ERROR = {
        "final": false,
        "name": "ERROR"
    };

    let currentState = _START;
    let pokemonName = "";
    let move = "";
    let pozione = "";
    let moves = ""; //Array mosse di un pokemon
    let nomi = ""; //Array per ottenere i nomi dei pokemon

    // Definiamo le transizioni per ciascuno stato dell'automa
    // indicando gli input accettabili e le azioni da eseguire per ciascun input

    _START.transitions = function (input) {
        // console.log(_START);
        switch (input) {
            case "scelgo":
                input = input.toLowerCase();

                pokemonName = bestMatch.bestMatch(pokemonName, possiblePokemon);

                console.error("Hai scelto: " + pokemonName);
                return _VERBO;
            case "usa":
                input = input.toLowerCase();
                // pokemonName = bestMatch.bestMatch(pokemonName, possiblePokemon);

                // console.error("Nome del Pokemon attaccante:" + pokemonName);

                return _ATT;

            case "pozione":
                input = input.toLowerCase();
                console.error("Applica " + input);
                return _POTION;

            default:
                pokemonName = pokemonName + " " + input;
                return _START;
        }
    }

    _ATT.transitions = function (input) {
        // console.log("ENTRATO NELLA FASE ATTACCO DEL AUTOMA ");
        //BESTMATCH MOSSA DETTA A VOCE E LISTA MOSSE DI QUEL POKEMON
        input = input.toLowerCase();


        move = bestMatch.bestMatch(input, getmoves(target));
        console.error("la tua mossa è: " + move);
        _END.code = 1;
        pokemonName = "";
        return _END;
    }

    _VERBO.transitions = function (input) {
        switch (input) {
            case "te":
                //console.log("END")
                _END.code = 0;
                return _END;
            default:
                return _ERROR;
        }
    }

    _POTION.transitions = function (input) {
        console.error("la pozione è: " + input);
        switch (input) {
            case "normale":
                console.error("Pozione normale applicata!");
                pozione = "normale";
                _END.code = 2;
                return _END;
            case "grande":
                console.error("Pozione grande applicata!");
                pozione = "grande";
                _END.code = 2;
                return _END;
            default:
                return _ERROR;
        }
    }

    _END.transitions = function (input) {
        pokemonName = "";
        return _END;
    }

    // _MOVE.transitions = function (input) {
    //     pokemonName = "";
    //     return _MOVE;
    // }

    _ERROR.transitions = function (input) {
        return _ERROR;
    }

    let step = (input) => {
        currentState = currentState.transitions(input);
    };

    let possiblePokemon = [];
    let t = true;
    let y = 6;


    //--------------------possiblePokemonPopulation---------------------------//

    function possiblePokemonPopulation(listOfPokemonInTheTeam) {
        nomi = JSON.parse(localStorage.getItem("allPokemon"));
        // let a = listOfPokemonInTheTeam.length;
        // console.log("listOfPokemonInTheTeam.length: " + a)
        for (let i = 0; i < 6; i++) { //ATTENZIONE è STATO USATO IL 6 AL POSTO DI X.LENGTH
            possiblePokemon[i] = nomi["l"][i]["name"];
            possiblePokemon[y] = nomi["r"][i]["name"];
            //console.log("nome: " + listOfPokemonInTheTeam[i].name);
            y++;
        }
        t = false;
        //console.log("Lista elaborata di pokemon:")
        //console.log(possiblePokemon)
    }

    //--------------------possiblePokemonPopulation---------------------------//


    let target;


    //--------------------run---------------------------//

    let run = (input, listOfPokemonInTheTeam, pos) => { // input è una frase intera con parole divise da spazi
        target = pos;
        if (t)
            possiblePokemonPopulation(listOfPokemonInTheTeam)
        //console.log(listOfPokemonInTheTeam);
        let sequence = input.split(" ");
        for (let i = 0; i < sequence.length; i++) {
            let word = sequence[i];
            let transition = `Step: ${currentState.name} ---${word}--->`;
            step(word);
            //transition += currentState.name;
            //console.log(transition);
        }

        //console.log(sequence + "  \n" + currentState.name)
    };

    //--------------------run---------------------------//



    // function getmoves(pokemonName, target) {
    function getmoves(target) {
        let s = target.toString().charAt(0);
        moves = JSON.parse(localStorage.getItem("allPokemon"));


        // console.log("Pokemon[side][0] :")
        // console.log(moves);
        // console.log(moves[s][0]);
        // console.info("getMoves")
        // console.info("pokemonName: "+pokemonName)
        // console.info("target: "+s)
        // console.error("_______________________________________________________________-");
        // console.log("In charge:");
        let pokemon = inCharge(target)
        // console.log(pokemon);
        // console.error("_______________________________________________________________-");

        // console.log("pokemonName:"+pokemonName);
        // console.info("getMoves");
        // console.log("Looking for"+moves[s]["name"])



        // for (let i = 0; i < 6; i++) {
        // console.warn(moves[s][i].name +" risulta "+ moves[s][i].inCharge)
        // if (moves[s][i].inCharge == true) {
        // if (moves[s][i]["name"] === pokemonName) {
        var allmoves = [];
        //console.log(move["l"][i]["moves"][0]);

        for (let y = 0; y < pokemon["moves"].length; y++) {

            allmoves[y] = pokemon["moves"][y].name;
        }
        // console.info("getMoves is going to return:");
        // console.info(allmoves);

        return allmoves;
        // }
        // }



        //console.log(move["l"][2]["moves"][0]);
    }



    //--------------------accepted---------------------------//

    function accepted() {
        //console.log("Accepted request");
        if (currentState.name === _END.name) {
            currentState = _START;
            return _END.code;
        } else
            return -1;
    }

    //--------------------accepted---------------------------//


    let getPokemon = () => {
        return pokemonName;
    };

    let getMove = () => {
        return move;
    };
    let setPokemon = () => {
        //console.log("ANNULLATO");
        pokemonName = "";
    };
    let getPotion = () => {
        return pozione;
    }


    return { // esponiamo i metodi pubblici
        "step": step,
        "accepted": accepted,
        "run": run,
        "getPokemon": getPokemon,
        "setPokemon": setPokemon,
        "getMove": getMove,
        "getPotion": getPotion
    }
} // fine modulo Automaton