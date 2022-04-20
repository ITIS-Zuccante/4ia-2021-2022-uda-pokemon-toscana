let teams = JSON.parse(window.localStorage.getItem("teams"));
const versusAnimation = document.getElementById("versusGif");
versusAnimation.style.display = "none";
const win = document.getElementById("win");
win.style.display = "none"
console.log(teams)

import { BestMatch } from './resources/js/bestMatch.js';
import { pokedex, movesList } from "./resources/js/data/pokedex.js";
import { printPokemonCard, printDefaultCard, printMoveInfo } from "./resources/js/printCard.js";
import { calculateDamage, calculateEffect } from "./resources/js/damageCalculator.js";
import { printDialogue, closeDialogue } from './resources/js/printDialogue.js';
import { Automaton } from './resources/js/automaton.js';
import { WebSpeech } from "./resources/js/WebSpeech.js";

const logoButton = document.getElementById('logo');
const pokeballTeam1 = document.getElementsByClassName("team1");
const pokeballTeam2 = document.getElementsByClassName("team2");
const fightButtonTeam1 = document.getElementById("enter1");
const fightButtonTeam2 = document.getElementById("enter2");
const fightButton = document.getElementById("battle");
const inputFieldTeam1 = document.getElementById("input1");
const inputFieldTeam2 = document.getElementById("input2");
const randomTeam1Button = document.getElementById("random1");
const randomTeam2Button = document.getElementById("random2");
const microphon_team1 = document.getElementById("mic1");
const microphon_team2 = document.getElementById("mic2");
const menuBar1Button = document.getElementById("menubar1");
const menuBar2Button = document.getElementById("menubar2");
const rowItem = document.getElementsByClassName("mainRow");
const pokeball1 = document.getElementsByClassName('pokeball_team1');
const pokeball2 = document.getElementsByClassName('pokeball_team2');
const pokeCards = document.getElementsByClassName("card")
const ButtonMoves1 = document.getElementsByClassName("MoveBox1");
const ButtonMoves2 = document.getElementsByClassName("MoveBox2");
const Moves1 = document.getElementsByClassName("MoveSet1");
const Moves2 = document.getElementsByClassName("MoveSet2");
const moveSet1 = document.getElementById("MoveSet1");
const StatsWindowTeam1 = document.getElementById("Stats1");
const moveSet2 = document.getElementById("MoveSet2");
const StatsWindowTeam2 = document.getElementById("Stats2");
const changeStatsTeam2Button = document.getElementById("changeStatsTeam2");
const changeStatsTeam2Password = document.getElementById("team2StatsPassword");
const changeStatsTeam1Button = document.getElementById("changeStatsTeam1");
const changeStatsTeam1Password = document.getElementById("team1StatsPassword");
const pokemonAttackBox = document.getElementsByClassName("Attack")
const pokemonDefenseBox = document.getElementsByClassName("Defense")
const pokemonSpecialAttackBox = document.getElementsByClassName("SpecialAttack")
const pokemonSpecialDefenseBox = document.getElementsByClassName("SpecialDefense")
const pokemonSpeedBox = document.getElementsByClassName("Speed")

const pokeballsrc = "images/symbols/pokeBalls/PokeballMenu.png"
const pokeballUsed = "images/symbols/pokeBalls/pokeballDead.png";
const pokeballOpen = "images/symbols/pokeBalls/openPokeball.png";

let bestMatch = BestMatch();

let fainted = false;

for (let poke of teams[0].pokemon) {
    poke.hp = poke.startHP
    poke.defense = 100
    poke.attack = 200
    poke.stage = 0
    for (let move of poke.moves) {
        move.currentPP = 30;
    }
}


for (let poke of teams[1].pokemon) {
    poke.hp = poke.startHP
    poke.defense = 100
    poke.attack = 200
    poke.stage = 0
    for (let move of poke.moves) {
        move.currentPP = 30;
    }
}


window.localStorage.setItem("teams", JSON.stringify(teams));


let selectedMove = [-1, -1]
let selectedPokemon = [0, 0]

let animations = ["attackAnimRed", "attackAnimBlue"]

let partita = {
    round: 0,
    pokemonOnField: [-1, -1],
    currentTeamTurn: 0
}


console.log("Team 1:")
console.log(teams[0].pokemon)

console.log("Team 2:")
console.log(teams[1].pokemon)


await placeOnField(0)
await placeOnField(1)
closeDialogue()

partita.round++
let deadTeam1 = 0;
let deadTeam2 = 0;

function faintPokemon(nPokemon, nTeam) {
    if (nTeam == 0) {
        pokeballTeam1[nPokemon].src = pokeballUsed;
        deadTeam1++;
        if (deadTeam1 == 6) {
            winGame(0);
        }
    }
    else if (nTeam == 1) {
        pokeballTeam2[nPokemon].src = pokeballUsed;
        deadTeam2++;
        if (deadTeam2 == 6) {
            winGame(1);
        }
    }

    fainted = true;
    partita.pokemonOnField[nTeam] = -1
    printDefaultCard(nTeam)
    selectedMove = [-1, -1]
    selectedPokemon = [-1, -1]
    console.log(`${getPokemonName(nPokemon, nTeam)} è esausto!`)
    printDialogue(`It seems that ${getPokemonName(nPokemon, nTeam)} is exausted!`)
    closeDialogue()
    alert(`${getPokemonName(nPokemon, nTeam)} is exausted! Select another pokemon to proceed!`)
}

function switchTurn(row) {
    /*if (inputFieldTeam1.value == "") {
        alert("Il team 1 deve ancora fare una mossa per il combattimento!" + row + inputFieldTeam1.value);
    }
    else if (inputFieldTeam2.value == "") {
        alert("Il team 2 ancora fare una mossa per il combattimento!");
    }*/
    if (partita.currentTeamTurn == 0) {
        partita.currentTeamTurn = 1;
    }
    else {
        partita.currentTeamTurn = 0;
    }
}

async function attackPhase(choicesArray) {
    console.log("Fase di attacco: [" + choicesArray + "]")
    if (choicesArray.includes("pokemon")) {
        if (choicesArray.every(val => val === "pokemon")) {
            await placeOnField(0)
            await placeOnField(1)
            closeDialogue()
            switchTurn(146)
        }
        else {
            let nAtkPokemon = partita.pokemonOnField[choicesArray.indexOf("move")];
            placeOnField(choicesArray.indexOf("pokemon"))
            await sleep(1000)
            let nTeam = choicesArray.indexOf("move")
            let maxHit = 1
            let minHit = 1

            if (teams[nTeam].pokemon[partita.pokemonOnField[nTeam]].moves[selectedMove[nTeam]].info.meta.max_hits != null) {
                maxHit = teams[nTeam].pokemon[partita.pokemonOnField[nTeam]].moves[selectedMove[nTeam]].info.meta.max_hits
                minHit = teams[nTeam].pokemon[partita.pokemonOnField[nTeam]].moves[selectedMove[nTeam]].info.meta.min_hits
            }
            for (let i = 0; i < Math.floor(Math.random() * (maxHit - minHit + 1) + minHit); i++) {
                printDialogue(`${getPokemonName(partita.pokemonOnField[nTeam], nTeam)} uses ${getMoveName(selectedMove[nTeam], partita.pokemonOnField[nTeam], nTeam)}!`)
                pokeCards[nTeam].classList.add(animations[nTeam])
                await sleep(1000)
                console.log(`${getPokemonName(partita.pokemonOnField[nTeam], nTeam)} usa ${getMoveName(selectedMove[nTeam], partita.pokemonOnField[nTeam], nTeam)}!`)
                if (Math.random() < (teams[nTeam].pokemon[partita.pokemonOnField[nTeam]].moves[selectedMove[nTeam]].info.accuracy * teams[nTeam].pokemon[partita.pokemonOnField[nTeam]].accuracyModifier) / 100 || teams[nTeam].pokemon[partita.pokemonOnField[nTeam]].moves[selectedMove[nTeam]].info.accuracy == null)  //Eseguo la mossa con probabilità dell'accuracy
                    await dealDamage(nTeam, choicesArray.indexOf("pokemon"), getMoveName(selectedMove[nTeam], nAtkPokemon, nTeam))
                else {
                    printDialogue(`${getPokemonName(partita.pokemonOnField[nTeam], nTeam)} misses the target!`)
                    console.log(`${getPokemonName(partita.pokemonOnField[nTeam], nTeam)} manca il bersaglio!`)
                }
                pokeCards[nTeam].classList.remove(animations[nTeam])
                await sleep(1000)
            }
            closeDialogue()
        }
    }
    else {
        let Team1Speed = teams[0].pokemon[partita.pokemonOnField[0]].speed
        let Team2Speed = teams[1].pokemon[partita.pokemonOnField[1]].speed
        console.log("Team1 speed : " + Team1Speed + " team2 speed: " + Team2Speed)
        let fasterTeam;
        let slowerTeam;
        if (Team1Speed >= Team2Speed) {
            fasterTeam = 0;
            slowerTeam = 1;
        }
        else {
            fasterTeam = 1;
            slowerTeam = 0;
        }
        await attack(slowerTeam, fasterTeam)
        closeDialogue()
    }
    partita.round++
    selectedMove = [-1, -1]
    selectedPokemon = [-1, -1]
    inputFieldTeam2.value = "";
    inputFieldTeam1.value = "";
}


async function attack(slowerTeam, fasterTeam) {
    await sleep(1000)
    let maxHit = 1
    let minHit = 1
    if (teams[fasterTeam].pokemon[partita.pokemonOnField[fasterTeam]].moves[selectedMove[fasterTeam]].info.meta.max_hits != null) {
        maxHit = teams[fasterTeam].pokemon[partita.pokemonOnField[fasterTeam]].moves[selectedMove[fasterTeam]].info.meta.max_hits
        minHit = teams[fasterTeam].pokemon[partita.pokemonOnField[fasterTeam]].moves[selectedMove[fasterTeam]].info.meta.min_hits
    }
    for (let i = 0; i < Math.floor(Math.random() * (maxHit - minHit + 1) + minHit); i++) {   //Calcolo hit multiple
        printDialogue(`${getPokemonName(partita.pokemonOnField[fasterTeam], fasterTeam)} uses ${getMoveName(selectedMove[fasterTeam], partita.pokemonOnField[fasterTeam], fasterTeam)}!`)
        pokeCards[fasterTeam].classList.add(animations[fasterTeam])
        await sleep(1000)
        console.log(`${getPokemonName(partita.pokemonOnField[fasterTeam], fasterTeam)} usa ${getMoveName(selectedMove[fasterTeam], partita.pokemonOnField[fasterTeam], fasterTeam)}!`)
        if (Math.random() < (teams[fasterTeam].pokemon[partita.pokemonOnField[fasterTeam]].moves[selectedMove[fasterTeam]].info.accuracy * teams[fasterTeam].pokemon[partita.pokemonOnField[fasterTeam]].accuracyModifier) / 100 || teams[fasterTeam].pokemon[partita.pokemonOnField[fasterTeam]].moves[selectedMove[fasterTeam]].info.accuracy == null)  //Eseguo la mossa con probabilità dell'accuracy
            try {
                await dealDamage(fasterTeam, slowerTeam, getMoveName(selectedMove[fasterTeam], partita.pokemonOnField[fasterTeam], fasterTeam))
            } catch (error) {

            }
        else {
            printDialogue(`${getPokemonName(partita.pokemonOnField[fasterTeam], fasterTeam)} misses the target!`)
            console.log(`${getPokemonName(partita.pokemonOnField[fasterTeam], fasterTeam)} manca il bersaglio!`)
        }
        pokeCards[fasterTeam].classList.remove(animations[fasterTeam])
        await sleep(1000)
    }


    maxHit = 1
    minHit = 1
    if (teams[slowerTeam].pokemon[partita.pokemonOnField[slowerTeam]].moves[selectedMove[slowerTeam]].info.meta.max_hits != null) {
        maxHit = teams[slowerTeam].pokemon[partita.pokemonOnField[slowerTeam]].moves[selectedMove[slowerTeam]].info.meta.max_hits
        minHit = teams[slowerTeam].pokemon[partita.pokemonOnField[slowerTeam]].moves[selectedMove[slowerTeam]].info.meta.min_hits
    }

    for (let i = 0; i < Math.floor(Math.random() * (maxHit - minHit + 1) + minHit); i++) {
        printDialogue(`${getPokemonName(partita.pokemonOnField[slowerTeam], slowerTeam)} uses ${getMoveName(selectedMove[slowerTeam], partita.pokemonOnField[slowerTeam], slowerTeam)}!`)
        pokeCards[slowerTeam].classList.add(animations[slowerTeam])
        await sleep(1000)
        console.log(`${getPokemonName(partita.pokemonOnField[slowerTeam], slowerTeam)} usa ${getMoveName(selectedMove[slowerTeam], partita.pokemonOnField[slowerTeam], slowerTeam)}!`)
        if (Math.random() < ((teams[slowerTeam].pokemon[partita.pokemonOnField[slowerTeam]].moves[selectedMove[slowerTeam]].info.accuracy * teams[slowerTeam].pokemon[partita.pokemonOnField[slowerTeam]].accuracyModifier) / 100) || teams[slowerTeam].pokemon[partita.pokemonOnField[slowerTeam]].moves[selectedMove[slowerTeam]].info.accuracy == null)
            await dealDamage(slowerTeam, fasterTeam, getMoveName(selectedMove[slowerTeam], partita.pokemonOnField[slowerTeam], slowerTeam))
        else {
            printDialogue(`${getPokemonName(partita.pokemonOnField[slowerTeam], slowerTeam)} misses the target!`)
            console.log(`${getPokemonName(partita.pokemonOnField[slowerTeam], slowerTeam)} manca il bersaglio!`)
        }
        pokeCards[slowerTeam].classList.remove(animations[slowerTeam])
        await sleep(1000)
    }
}


async function selectMove(moveName, nTeam, nPokemon) {
    moveName = await bestMatch.bestMatch(moveName, movesList)
    let move = getMove(moveName, nPokemon, nTeam)
    if (move != -1) {
        if (move.currentPP > 0) {
            let nMove = getMoveIndex(moveName, nTeam, nPokemon)
            selectedMove[nTeam] = nMove
            console.log(`Team ${nTeam + 1}: Mossa selezionata = ${moveName} [${nMove}]`)
            let [finalPhase, choiceArr] = checkFinalPhase()
            if (finalPhase) {
                document.getElementById("versusGif").style.display = "block";
                pokeCards[0].style.display = "none";
                pokeCards[1].style.visibility = "hidden";
                await sleep(1500);
                document.getElementById("versusGif").style.display = "none";
                pokeCards[0].style.display = "block";
                pokeCards[1].style.visibility = "visible";
                await attackPhase(choiceArr)
            }
            switchTurn(271)
            return
        } else
            alert("This move doesn't have anymore PPs, select another one!")
    }
    else
        alert(`${getPokemonName(nPokemon, nTeam)} doesn't have that move!`)
}

async function placeOnField(nTeam) {
    if (nTeam == 0) {
        //Faccio ritornare il vecchio pokemon selezionato allo stato normale
        if (partita.pokemonOnField[0] != -1) {
            pokeballTeam1[partita.pokemonOnField[nTeam]].src = pokeballsrc;
        }
        partita.pokemonOnField[nTeam] = selectedPokemon[nTeam];             //Metto in campo il nuovo pokemon selezionato
        pokeballTeam1[selectedPokemon[nTeam]].src = pokeballOpen;
    }
    else if (nTeam == 1) {
        //Faccio ritornare il vecchio pokemon selezionato allo stato normale
        if (partita.pokemonOnField[1] != -1) {
            pokeballTeam2[partita.pokemonOnField[nTeam]].src = pokeballsrc;
        }
        partita.pokemonOnField[nTeam] = selectedPokemon[nTeam];             //Metto in campo il nuovo pokemon selezionato
        pokeballTeam2[selectedPokemon[nTeam]].src = pokeballOpen;
    }
    console.log(`Team ${nTeam + 1}: ${getPokemonName(partita.pokemonOnField[nTeam], nTeam)} [${partita.pokemonOnField[nTeam]}] scelgo te!`)
    printPokemonCard(nTeam, partita.pokemonOnField[nTeam], true)                  //Printo la carta del pokemon messo in campo
    printMoveInfo(nTeam, partita.pokemonOnField[nTeam])
    await printDialogue(`I choose you ${getPokemonName(partita.pokemonOnField[nTeam], nTeam)}!`)
    selectedPokemon[nTeam] = -1                                             //Faccio tornare il valore temporaneo di pokemon selezioanto allo stato iniziale

}

async function selectPokemon(pokeName, nTeam) {
    console.log(pokeName)
    pokeName = await bestMatch.bestMatch(pokeName, pokedex)
    let nPokemon = getPokemonIndex(pokeName, nTeam)
    if (nPokemon != -1) {
        if (nPokemon != partita.pokemonOnField[nTeam]) {
            if (teams[nTeam].pokemon[nPokemon].hp > 0) {
                selectedPokemon[nTeam] = nPokemon;
                console.log(`Team ${nTeam}: Pokemon selezionato = ${pokeName} [${nPokemon}]`)
                if (!fainted) {
                    let [finalPhase, choiceArr] = checkFinalPhase()
                    if (finalPhase) {
                        await attackPhase(choiceArr)
                        return
                    }
                    else {
                        switchTurn(321)
                    }
                }
                else {
                    placeOnField(nTeam)
                    fainted = false
                }
                return
            }
            alert("This pokemon is exausted")
            return
        }
        alert("This pokemon is already on the field")
        return
    }
    alert("This pokemon isn't on your team")
}


async function dealDamage(teamAtk, teamDef, moveName) {
    let nPokemonAtk = partita.pokemonOnField[teamAtk];
    let nPokemonDef = partita.pokemonOnField[teamDef];

    if (nPokemonAtk != -1 && nPokemonDef != -1) {

        let move = getMove(moveName, nPokemonAtk, teamAtk)
        let moveIndex = getMoveIndex(moveName, teamAtk, nPokemonAtk)
        let dealtDamage;
        switch (move.info.meta.category.name) {
            case "damage":    // TODO: Da modificare quanto verranno aggiunti gli ailment
            case "damage+ailment":
                dealtDamage = Math.round(calculateDamage(teams[teamAtk].pokemon[partita.pokemonOnField[teamAtk]], teams[teamDef].pokemon[partita.pokemonOnField[teamDef]], move))
                console.log(dealtDamage)
                for (let i = 0; i < dealtDamage; i++) {
                    teams[teamDef].pokemon[partita.pokemonOnField[teamDef]].hp -= 1
                    window.localStorage.setItem("teams", JSON.stringify(teams));
                    if (teams[teamDef].pokemon[partita.pokemonOnField[teamDef]].hp > 0) {
                        printPokemonCard(teamDef, nPokemonDef, false)
                    } else {
                        faintPokemon(nPokemonDef, teamDef)
                        if (teamDef != partita.currentTeamTurn) {
                            switchTurn(362)
                        }
                    }
                    await sleep(20)
                }
                break;
            case "net-good-stats":
                calculateEffect(teams[teamDef].pokemon[nPokemonDef], teams[teamAtk].pokemon[nPokemonAtk], move)
                window.localStorage.setItem("teams", JSON.stringify(teams));
                printPokemonCard(teamDef, nPokemonDef, false)
                break;
            case "damage+lower" || "damage+raise":  // TODO: DA TESTARE
                dealtDamage = Math.round(calculateDamage(teams[teamAtk].pokemon[partita.pokemonOnField[teamAtk]], teams[teamDef].pokemon[partita.pokemonOnField[teamDef]], move))
                for (let i = 0; i < dealtDamage; i++) {
                    teams[teamDef].pokemon[partita.pokemonOnField[teamDef]].hp -= 1
                    window.localStorage.setItem("teams", JSON.stringify(teams));
                    if (teams[teamDef].pokemon[partita.pokemonOnField[teamDef]].hp > 0) {
                        printPokemonCard(teamDef, nPokemonDef, false)
                    } else {
                        faintPokemon(nPokemonDef, teamDef)
                        if (teamDef != partita.currentTeamTurn) {
                            switchTurn(384)
                        }
                    }
                    await sleep(20)
                }
                try {
                    calculateEffect(teams[teamDef].pokemon[nPokemonDef], move)
                } catch (error) { }
                window.localStorage.setItem("teams", JSON.stringify(teams));
                printPokemonCard(teamDef, nPokemonDef, false)
        }
        teams[teamAtk].pokemon[partita.pokemonOnField[teamAtk]].moves[moveIndex].currentPP -= 1;
        window.localStorage.setItem("teams", JSON.stringify(teams));
        printPokemonCard(teamAtk, nPokemonAtk, false)
        await sleep(500)
    }
}

function checkFinalPhase() {
    let teamChoice = ["", ""];
    if (partita.round >= 1) {
        let cont = 0;
        for (let i in selectedPokemon) {
            if (selectedPokemon[i] != -1) {
                teamChoice[i] = "pokemon"
                cont++
            }
        }
        for (let i in selectedMove) {
            if (selectedMove[i] != -1) {
                teamChoice[i] = "move"
                cont++
            }
        }

        if (cont == 2)
            return [true, teamChoice]
        else if (cont < 2)
            return [false]
        else {
            console.log("Errore nel controllare se tutti i giocatori hanno selezinato qualcosa")
            return [true]
        }
    }
    return [false]
}

function winGame(nTeam) {
    rowItem[0].style.display = "none";
    rowItem[1].style.display = "none";
    rowItem[2].style.display = "none";
    win.style.display = "block";
    win.innerText = `Team ${nTeam + 1} you won the battle!`;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getPokemonIndex(pokeName, nTeam) {
    for (let i in teams[nTeam].pokemon) {
        if (teams[nTeam].pokemon[i].name == pokeName)
            return i;
    }
    return -1;
}

function getPokemonName(nPokemon, nTeam) {
    return teams[nTeam].pokemon[nPokemon].name
}

function getMove(moveName, nPokemon, nTeam) {
    for (let move of teams[nTeam].pokemon[nPokemon].moves) {
        if (move.name == moveName) {
            return move
        }
    }
    return -1
}

function getMoveName(nMove, nPokemon, nTeam) {
    return teams[nTeam].pokemon[nPokemon].moves[nMove].name
}

function getMoveIndex(moveName, nTeam, nPokemon) {
    for (let i in teams[nTeam].pokemon[nPokemon].moves) {
        if (teams[nTeam].pokemon[nPokemon].moves[i].name == moveName) {
            return i;
        }
    }
    return -1
}

fightButton.addEventListener('click', async () => {
    let insertPokemon = [inputFieldTeam1, inputFieldTeam2];
    for (let i = 0; i < 2; i++) {
        partita.currentTeamTurn = i;
        let automaton = Automaton();
        automaton.run(insertPokemon[i].value);
        if (automaton.accepted() == 1) {
            let str = automaton.result()
            selectMove(str, partita.currentTeamTurn, partita.pokemonOnField[partita.currentTeamTurn])
        }
        else if (automaton.accepted() == 0) {
            console.log(automaton.result())
            let str = automaton.result()
            selectPokemon(str, partita.currentTeamTurn);
        }
    }
})

menuBar1Button.addEventListener("click", () => {
    if (!(StatsWindowTeam1.style.display == "block")) {
        StatsWindowTeam1.style.display = "block";
        moveSet1.style.display = "none";
        menuBar1Button.innerHTML = "Mosse"
    } else {
        StatsWindowTeam1.style.display = "none";
        moveSet1.style.display = "block";
        menuBar1Button.innerHTML = "Statistiche"
    }
});

menuBar2Button.addEventListener("click", () => {
    if (!(StatsWindowTeam2.style.display == "block")) {
        StatsWindowTeam2.style.display = "block";
        moveSet2.style.display = "none";
        menuBar2Button.innerHTML = "Mosse"
    } else {
        StatsWindowTeam2.style.display = "none";
        moveSet2.style.display = "block";
        menuBar2Button.innerHTML = "Statistiche"
    }

});

changeStatsTeam1Button.addEventListener("click", async () => {
    if (changeStatsTeam1Password.value.toLowerCase() == "cambia") {
        StatsWindowTeam1.contentEditable = "true";
        await sleep(10000);
        StatsWindowTeam1.contentEditable = "false";
        changeStats(0);
    } else {
        alert("Password inserita sbagliata!")
    }
    changeStatsTeam1Password.value = "";
});

changeStatsTeam2Button.addEventListener("click", async () => {
    if (changeStatsTeam2Password.value.toLowerCase() == "cambia") {
        StatsWindowTeam2.contentEditable = "true";
        await sleep(10000);
        StatsWindowTeam2.contentEditable = "false";
        changeStats(1);
    } else {
        alert("Password inserita sbagliata!")
    }
    changeStatsTeam2Password.value = "";
});

function changeStats(team) {
    teams[team].pokemon[partita.pokemonOnField[team]].attack = (pokemonAttackBox[team].textContent).split(" ")[1];
    teams[team].pokemon[partita.pokemonOnField[team]].defense = (pokemonDefenseBox[team].textContent).split(" ")[1];
    teams[team].pokemon[partita.pokemonOnField[team]].speed = (pokemonSpeedBox[team].textContent).split(" ")[1];
    teams[team].pokemon[partita.pokemonOnField[team]].specialAttack = (pokemonSpecialAttackBox[team].textContent).split(" ")[2];
    teams[team].pokemon[partita.pokemonOnField[team]].specialDefense = (pokemonSpecialDefenseBox[team].textContent).split(" ")[2];
}

randomTeam1Button.addEventListener("click", () => {
    partita.currentTeamTurn = 0;
    let move = getMoveName(Math.floor(Math.random() * 4), partita.pokemonOnField[partita.currentTeamTurn], 0);
    inputFieldTeam1.value = 'use ' + move + ' now';
});

randomTeam2Button.addEventListener("click", () => {
    partita.currentTeamTurn = 1;
    let move = getMoveName(Math.floor(Math.random() * 4), partita.pokemonOnField[partita.currentTeamTurn], 1);
    inputFieldTeam2.value = 'use ' + move + ' now';
});

microphon_team1.addEventListener("click", (e) => {
    let webSpeech = WebSpeech(0);
    webSpeech.start();
});

microphon_team2.addEventListener("click", (e) => {
    let webSpeech = WebSpeech(1);
    webSpeech.start();
});

logoButton.addEventListener("click", () => {
    window.localStorage.clear();
    window.location.href = "index.html";
})

for (let i = 0; i < ButtonMoves1.length; i++) {
    ButtonMoves1[i].addEventListener('click', () => {
        inputFieldTeam1.value = 'use ' + Moves1[i].textContent + ' now';
    });
}

for (let i = 0; i < ButtonMoves2.length; i++) {
    ButtonMoves2[i].addEventListener('click', () => {
        inputFieldTeam2.value = 'use ' + Moves2[i].textContent + ' now';
    });
}

for (let i = 0; i < pokeball1.length; i++) {
    pokeball1[i].addEventListener('click', () => {
        inputFieldTeam1.value = teams[0].pokemon[i].name + ' i choose you';
    });
}

for (let i = 0; i < pokeball2.length; i++) {
    pokeball2[i].addEventListener('click', () => {
        inputFieldTeam2.value = teams[1].pokemon[i].name + ' i choose you';
    });
}