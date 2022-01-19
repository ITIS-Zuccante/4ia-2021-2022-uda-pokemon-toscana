import { bestMatch } from './bestMatch.js';
import { getPokedex } from './pokedex.js';
import { modifyleftMoveType, modifyrightMoveType } from "./battle.js";

export async function Automaton(target) {
    // Definiamo gli stati dell'automa
    let _START = { "final": false, "name": "_START", "transitions": {} };
    let _SUBJECTI = { "final": false, "name": "_SUBJECTI", "transitions": {} };

    let _VERBCHOOSE = { "final": false, "name": "_VERBCHOOSE", "transitions": {} };
    let _VERBUSE = { "final": false, "name": "_VERBUSE", "transitions": {} };
    let _VERBDM = { "final": false, "name": "_VERBDM", "transitions": {} };
    let _VERBTAKE = { "final": false, "name": "_VERBTAKE", "transitions": {} };

    let _WORDNOW = { "final": false, "name": "_VERBTAKE", "transitions": {} };

    let _NORMALTYPE = { "final": false, "name": "_NORMALTYPE", "transitions": {} };

    let _SUPERTYPE = { "final": false, "name": "_SUPERTYPE", "transitions": {} };

    let _HYPERTYPE = { "final": false, "name": "_HYPERTYPE", "transitions": {} };

    let _ENDMOVE = { "final": true, "name": "_ENDMOVE", "transitions": {} };
    let _ENDYOU = { "final": true, "name": "_ENDYOU", "transitions": {} };
    let _ENDDM = { "final": true, "name": "_ENDDM", "transitions": {} };
    let _ENDPOTION = { "final": true, "name": "_ENDPOTION", "transitions": {} };

    /*****************************FUNZIONI PRINCIPALI DELL'AUTOMA************************************/
    let step = (input) => {
        let test = (typeof currentState.transitions[input]) === 'undefined' ||
            currentState.transitions[input] == null;
        if (!test) {
            (currentState.transitions[input].action)();
            currentState = currentState.transitions[input].nextState;
        }
    };

    let run = (input) => { // input è una frase intera con parole divise da spazi
        let sequence = input.split(" ");
        pokemonName = sequence[0];
        for (let i = 0; i < sequence.length; i++) {
            let word = sequence[i];
            step(word);
        }
    };

    function getMoves() {
        if (target == "left") {
            for (let i = 0; i < JSON.parse(window.localStorage.getItem("_TEAMS")).teamAlfa.pokemons.length; i++) {
                let name = $("#left-card-name").clone().children().remove().end().text().charAt(0).toLowerCase() + $("#left-card-name").clone().children().remove().end().text().slice(1);
                if (name == JSON.parse(window.localStorage.getItem("_TEAMS")).teamAlfa.pokemons[i].name) {
                    return JSON.parse(window.localStorage.getItem("_TEAMS")).teamAlfa.pokemons[i].stats.moves;
                }
            }
        } else {
            for (let i = 0; i < JSON.parse(window.localStorage.getItem("_TEAMS")).teamBeta.pokemons.length; i++) {
                let name = $("#right-card-name").clone().children().remove().end().text().charAt(0).toLowerCase() + $("#right-card-name").clone().children().remove().end().text().slice(1);
                if (name == JSON.parse(window.localStorage.getItem("_TEAMS")).teamBeta.pokemons[i].name) {
                    return JSON.parse(window.localStorage.getItem("_TEAMS")).teamBeta.pokemons[i].stats.moves;
                }
            }
        }
    }


    let accepted = () => {
        return currentState.final;
    };

    let returnPokemon = async () => {
        return await bestMatch(pokemonName);
    };

    let returnMove = async () => {
        let jsonMove = await fetch(move);
        return JSON.parse(await jsonMove.text());
    };

    let returnPotion = () => {
        return potion;
    };

    let currentState = _START;
    let pokemonName = "";
    let pokemonMoves = "";
    let move = "";
    let potion = "";
    let pokedex = await getPokedex();

    // Definiamo le transizioni per ciascuno stato dell'automa
    // indicando gli input accettabili e le azioni da eseguire per ciascun input

    for (let i = 0; i < pokedex.length; i++) {
        let splittedName = pokedex[i].name.english.split(" ");
        for (let j = 0; j < splittedName.length; j++) {
            let input = splittedName[j];
            _START.transitions[input] = {
                "nextState": _START,
                "action": () => {
                    pokemonName += input;
                }
            };
        }
    }

    /***************************************************************SCELTA POKEMON*********************************************************************/

    _START.transitions["I"] = {
        "nextState": _SUBJECTI,
        "action": () => { }
    };

    _SUBJECTI.transitions["choose"] = {
        "nextState": _VERBCHOOSE,
        "action": () => { }
    };

    _VERBCHOOSE.transitions["you"] = {
        "nextState": _ENDYOU,
        "action": () => {
            if (target == "left") {
                modifyleftMoveType("pokemonchange");
            } else {
                modifyrightMoveType("pokemonchange");
            }

        }
    };

    /****************************************************************UTILIZZO MOSSA********************************************************************/

    _START.transitions["use"] = {
        "nextState": _VERBUSE,
        "action": function () {
            pokemonMoves = getMoves();
            for (let i = 0; i < pokemonMoves.length; i++) {
                let input = pokemonMoves[i].move.name;
                _VERBUSE.transitions[input] = {
                    "nextState": _WORDNOW,
                    "action": () => {
                        move += pokemonMoves[i].move.url;
                    }
                };
            }
        }
    };



    _WORDNOW.transitions["now"] = {
        "nextState": _ENDMOVE,
        "action": () => {
            if (target == "left") {
                modifyleftMoveType("pokemonmove");
            } else {
                modifyrightMoveType("pokemonmove");
            }
        }
    };


    /****************************************************************UTILIZZO DYNAMAX********************************************************************/

    _START.transitions["apply"] = {
        "nextState": _VERBDM,
        "action": () => { }
    };

    _VERBDM.transitions["gigantamax"] = {
        "nextState": _ENDDM,
        "action": () => {
            if (target == "left") {
                modifyleftMoveType("pokemondynamax");
            } else {
                modifyrightMoveType("pokemondynamax");
            }
        }
    };

    /****************************************************************UTILIZZO STRUMENTI********************************************************************/

    _START.transitions["take"] = {
        "nextState": _VERBTAKE,
        "action": () => { }
    };

    _VERBTAKE.transitions["normal"] = {
        "nextState": _NORMALTYPE,
        "action": () => { potion = "normal" }
    };

    _VERBTAKE.transitions["super"] = {
        "nextState": _SUPERTYPE,
        "action": () => { potion = "super" }
    };

    _VERBTAKE.transitions["hyper"] = {
        "nextState": _HYPERTYPE,
        "action": () => { potion = "hyper" }
    };

    _NORMALTYPE.transitions["potion"] = {
        "nextState": _ENDPOTION,
        "action": () => {
            if (target == 'left') {
                modifyleftMoveType("pokemonpotion");
            } else {
                modifyrightMoveType("pokemonpotion");
            }
        }
    };

    _SUPERTYPE.transitions["potion"] = {
        "nextState": _ENDPOTION,
        "action": () => {
            if (target == 'left') {
                modifyleftMoveType("pokemonpotion");
            } else {
                modifyrightMoveType("pokemonpotion");
            }
        }
    };

    _HYPERTYPE.transitions["potion"] = {
        "nextState": _ENDPOTION,
        "action": () => {
            if (target == 'left') {
                modifyleftMoveType("pokemonpotion");
            } else {
                modifyrightMoveType("pokemonpotion");
            }
        }
    };

    /************************************************************************************************************************************/

    return { // esponiamo i metodi pubblici
        "step": step,
        "accepted": accepted,
        "run": run,
        "getPokemon": returnPokemon,
        "getMove": returnMove,
        "getPotion": returnPotion
    }

} // fine modulo Automaton