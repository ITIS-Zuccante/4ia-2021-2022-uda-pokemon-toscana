//import { pokedex } from '../team/Tmodules/pokedex.js';

function levenshteinDistance(str1, str2) {
    //console.log("LEVEN")
    var edits = [];
    for (var i = 0; i < str2.length + 1; i++) {
        var row = [];
        for (var j = 0; j < str1.length + 1; j++) {
            row.push(j);
        }
        row[0] = i;
        edits.push(row);
    }
    for (var x = 1; x < str2.length + 1; x++) {
        for (var y = 1; y < str1.length + 1; y++) {
            if (str2[x - 1] === str1[y - 1]) {
                edits[x][y] = edits[x - 1][y - 1];
            } else {
                edits[x][y] =
                    1 + Math.min(edits[x - 1][y - 1], edits[x - 1][y], edits[x][y - 1]);
            }
        }
    }
    return edits[str2.length][str1.length];
}
export function BestMatch() {
    function bestMatch(pokemonName, pokedex) {
        //console.log("BESTMATCH POKEMON NAME INPUT: >" + pokemonName);
        //console.log("pokedex <")
        //console.log(pokedex);
        //console.log(pokemonName + "mossa ");
        // console.log(pokedex.length)

        //console.log(pokedex);
        // if (pokemonName == "")
        //     return null;
        //NB: isNaN and typeOf are not working: everything is threated like string.
        // if (pokemonName / 1 == pokemonName) {
        //     console.log("POKEMON INVOKED BY ID ( " + pokemonName + " )");
        //     return pokemonName;
        // }

        pokemonName = pokemonName.toLowerCase();
        //console.log("BESTMATCH")
        let bestMatch = "";
        let leastMatch = "";

        for (let i = 0; i < pokedex.length; i++) {
            //for (let i = 0; i < 800; i++) {
            // let d = levenshteinDistance(pokemonName, pokedex[i]);
            let d = levenshteinDistance(pokemonName, pokedex[i].toLowerCase());

            if (i == 0) { //primo giro
                bestMatch = pokedex[i];
                leastMatch = d;
            } else {

                if (d < leastMatch) {
                    leastMatch = d;
                    bestMatch = pokedex[i];
                }
            }

        }
        //console.log("Script.js : bestMatch : " + bestMatch+" of ("+pokemonName+")")
        // console.log("The best match output is : "+bestMatch)
        return bestMatch;
    }
    return {
        "bestMatch": bestMatch
    }
}