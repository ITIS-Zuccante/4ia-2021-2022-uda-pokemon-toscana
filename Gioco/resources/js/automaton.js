import { pokedex } from "./data/pokedex.js";
import { BestMatch } from "./bestMatch.js";

let bestMatch = BestMatch();

export function Automaton() {
    // Definiamo gli stati dell'automa
    let _START = {
        "final": false,
        "name": "START"
    };
    let _POKEMON = {
        "final": false,
        "name": "POKEMON"
    };
    let _POKEMON_I = {
        "final": false,
        "name": "POKEMON_I"
    };
    let _POKEMON_I_CHOOSE = {
        "final": false,
        "name": "POKEMON_I_CHOOSE"
    };
    let _POKEMON_I_CHOOSE_YOU = {
        "final": true,
        "name": "POKEMON_I_CHOOSE_YOU"
    };
    let _ERROR = {
        "final": false,
        "name": "ERROR"
    };
    let _POKEMON_USE = {
        "final": false,
        "name": "POKEMON_USE"
    };
    let _POKEMON_USE_ATTACK = {
        "final": true,
        "name": "POKEMON_USE_ATTACK"
    };

    let currentState = _START;
    let pokemonName = "";
    let spokenAttackName = "";

    _START.transitions = (input) => {
        // deve essere stato pronunciato il nome di un pokemon
        const lowerCasePokedex = pokedex.map(element => {
            return element.toLowerCase();
        });
        pokemonName = bestMatch.bestMatch(input.toLowerCase(), lowerCasePokedex);
        return _POKEMON;
    }

        
    _POKEMON.transitions = (input) => {
        let lower_input = input.toLowerCase();
        if (lower_input == "i"){
            return _POKEMON_I;
        } else if (lower_input == "use") {
            return _POKEMON_USE;
        } else {
            return _ERROR;
        }
    }

    _POKEMON_I.transitions = (input) => {
        let lower_input = input.toLowerCase();
        if (lower_input == "choose") {
            return _POKEMON_I_CHOOSE;
        } else {
            return _ERROR;
        }
    }

    _POKEMON_I_CHOOSE.transitions = (input) => {
        let lower_input = input.toLowerCase();
        if (lower_input == "you") {
            return _POKEMON_I_CHOOSE_YOU;
        } else {
            return _ERROR;
        }
    }
    
    _POKEMON_I_CHOOSE_YOU.transitions = (input) => {
        return _ERROR;
    }

    _POKEMON_USE.transitions = (input) => {
        // deve essere stato pronunciato il nome di un attacco
        // del pokemon corrente
        spokenAttackName += input;
        return _POKEMON_USE_ATTACK;
    }

    _POKEMON_USE_ATTACK.transitions = (input) => {
        // deve essere stato pronunciato il nome di un attacco
        // del pokemon corrente
        spokenAttackName += input;
        return _POKEMON_USE_ATTACK;
    }

    _ERROR.transitions = function (input) {
            return _ERROR;
    }
    
    let run = (input) => { // input è una stringa intera
        let sequence = input.split(" ");
        let i = 0;
        while (i < sequence.length && !isEqual(currentState, _ERROR)) {
            let csn = currentState.name;
            currentState = currentState.transitions(sequence[i])
            i++;
            console.log(`Step: ${csn} --[${sequence[i]}]--> ${currentState.name}`);
        }
        process();
    };

    function process() {
        if (isEqual(currentState, _ERROR) || !currentState.final) {
            console.log("frase non riconosciuta");
        } else if (isEqual(currentState, _POKEMON_USE_ATTACK)) {
            let moveName = spokenAttackName.replace(' ', '-').toLowerCase();
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
                .then(result => result.json())
                .then(data => {
                    return Promise.resolve(data.moves.indexOf(moveName));
                }).then(pos => {
                    if (pos == -1) {
                        throw new Error(`${pokemonName} non ha la mossa ${moveName}`);
                    } else {
                        // code to perform the attack data.moves[pos]
                        console.log(`${pokemonName} fa la mossa ${moveName}`);
                    }
                }).catch(console.error);
        } else if (isEqual(currentState, _POKEMON_I_CHOOSE_YOU)) {
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
                .then(result => result.json())
                .then(data => {
                    // code to paint card o the screen with data
                    console.log(`caricato il pokemon ${data.name}`);
                });
        }
    }
    
    function accepted() {
        return currentState.final;
    }

    function isObject(object) {
        return object != null && typeof object === 'object';
    }

    function isEqual(obj1, obj2) {
        var props1 = Object.getOwnPropertyNames(obj1);
        var props2 = Object.getOwnPropertyNames(obj2);
        if (props1.length != props2.length) {
            return false;
        }
        for (var i = 0; i < props1.length; i++) {
            let val1 = obj1[props1[i]];
            let val2 = obj2[props2[i]];
            let areObjects = isObject(val1) && isObject(val2);
            if (!areObjects) {
                if (val1 !== val2) {
                    return false;
                }
            } else {
                if (!isEqual(val1, val2)) {
                    return false;
                }
            }
        }
        return true;
    }
    
    
        return { // esponiamo i metodi pubblici
            "accepted": accepted,
            "run": run,
            "isEqual": getValue
        }
    } // fine modulo Automaton