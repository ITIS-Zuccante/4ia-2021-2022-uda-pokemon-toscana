import { getPokedex } from './pokedex.js';

/*
* Trova la parola più simile a quella scritta dall'utente.
*/

export async function bestMatch(pokemonName) {
    let pokedex = await getPokedex();
    let bestMatch = "";
    let leastMatch = "";
    for (let i = 0; i < pokedex.count; i++) {
        let d = levenshteinDistance(pokemonName, pokedex.results[i].name);


        if (i == 0) {
            bestMatch = pokedex.results[i].name;
            leastMatch = d;
        } else {
            if (d < leastMatch) {
                leastMatch = d;
                bestMatch = pokedex.results[i].name;
            }
        }
    }
    return bestMatch;
}

export function levenshteinDistance(str1, str2) {

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