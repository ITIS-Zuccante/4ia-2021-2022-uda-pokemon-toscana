function levenshteinDistance(str1, str2) {  //Questa funzione calcola quanto due stringhe siano diverse tra di loro
    let edits = [];
    for (let i = 0; i < str2.length + 1; i++) {
        let row = [];
        for (let j = 0; j < str1.length + 1; j++) {
            row.push(j);
        }
        row[0] = i;
        edits.push(row);
    }
    for (let x = 1; x < str2.length + 1; x++) {
        for (let y = 1; y < str1.length + 1; y++) {
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
    function bestMatch(string, array) {
        string = string.toLowerCase();
        let bestMatch = array[0];
        let worstMatch = 100;           //100 è il valore peggiore che possiamo avere, significa che una stringa è al 100% diversa

        for (let i = 0; i < array.length; i++) {    //Scorre tutto l'array e trova il match migliore
            let currentSelection = levenshteinDistance(string, array[i].toLowerCase());
                if (currentSelection < worstMatch) {
                    worstMatch = currentSelection;
                    bestMatch = array[i];
                }
        }
        return bestMatch;
    }
    return {
        "bestMatch": bestMatch
    }
}