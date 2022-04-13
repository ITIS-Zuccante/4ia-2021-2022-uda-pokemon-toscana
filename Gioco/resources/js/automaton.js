import { movesList, pokedex } from "./data/pokedex.js";
import { BestMatch } from "./bestMatch.js";

let bestMatch = BestMatch();

export function Automaton() {
    // Definiamo gli stati dell'automa
    let _START = {
        "final": false,
        "name": "START"
    };
    let _START2 = {
        "final": false,
        "name": "START_EXT"
    };
    let _MOVE = {
        "final": false,
        "name": "MOVE"
    };
    let _SELECTION = {
        "final": false,
        "name": "SELECTION"
    };
    let _SELECTION2 = {
        "final": false,
        "name": "SELECTION_EXT"
    };
    let _END = {
        "final": true,
        "name": "END",
        "code": 99,
    };


    let value = ""
    let poke = pokedex    
    let moveList = movesList

        let _ERROR = {
            "final": false,
            "name": "ERROR"
        };
    
        let currentState = _START;
        let pokemonName = "";
        let currentMove = "";
    

        _START.transitions = function (input) {
            switch (input) {
                case "use":
                    input = input.toLowerCase();
                    return _MOVE;
                default:
                    input = input.toLowerCase();
                    pokemonName += input;
                    return _START2;
            }
        }
        
        _START2.transitions = function (input) {
            switch(input){
                case "i":
                    let pokemon = bestMatch.bestMatch(pokemonName, poke);
                    value = pokemon
                    return _SELECTION2;
                default:
                    input = input.toLowerCase();
                    pokemonName += input;
                    return _START2;
            }
        }

        _MOVE.transitions = function (input) {
            switch(input){
                case "now":
                    let move = bestMatch.bestMatch(currentMove, moveList);
                    _END.code = 1;
                    value = move
                    return _END;
                default:
                    input = input.toLowerCase();
                    currentMove += input
                    return _MOVE
            }

        }
        
        _SELECTION2.transitions = function (input) {
            switch(input){
                case "choose":
                    return _SELECTION;
                default:
                    return _ERROR;
            }
        }

        _SELECTION.transitions = function (input) {
            switch (input) {
                case "you":
                    _END.code = 0;
                    return _END;
                default:
                    return _ERROR;
            }
        }
    
        _END.transitions = function (input) {
            pokemonName = "";
            return _END;
        }

    
        _ERROR.transitions = function (input) {
            return _ERROR;
        }
    
        let step = (input) => {
                currentState = currentState.transitions(input);
        };
    
        //--------------------run---------------------------//
    
        let run = (input) => { // input è una stringa intera
            let sequence = input.toLowerCase().split(" ");
            for (let i = 0; i < sequence.length; i++) {
                let x = sequence[i];
                let transition = `Step: ${currentState.name} ---${x}--->`;
                step(x);
                transition += currentState.name;
                console.log(transition);
            }
        };
    
        //--------------------run---------------------------//
    
    
    
    
        //--------------------accepted---------------------------//
    
        function accepted() {
            if (currentState.name === _END.name) {
                return _END.code;
            } else
                return -1;
        }
    
        //--------------------accepted---------------------------//
    
    
        let getValue = () => {
            return value;
        };
    
    
        return { // esponiamo i metodi pubblici
            "step": step,
            "accepted": accepted,
            "run": run,
            "result": getValue
        }
    } // fine modulo Automaton