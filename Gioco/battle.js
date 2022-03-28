import {BestMatch} from './resources/js/bestMatch.js';
import {pokedex, movesList} from "./resources/js/data/pokedex.js";
import {printPokemonCard, printDefaultCard, printMoveInfo} from "./resources/js/printCard.js";
import {calculateDamage, calculateEffect} from "./resources/js/damageCalculator.js";
import { printDialogue, closeDialogue } from './resources/js/printDialogue.js';
import { Automaton } from './resources/js/automaton.js';

const redPokeballs = document.getElementsByClassName("redPokeball");
const bluePokeballs = document.getElementsByClassName("bluePokeball");
const fightButton = document.getElementById("fightButton")
const insertPokemon = document.getElementById("insertPokemon")
const redChangeInfoButton = document.getElementById("redChangeButton")
const blueChangeInfoButton = document.getElementById("blueChangeButton")
const redMoves = document.getElementById("redMoves")
const redStats = document.getElementById("redStats")
const blueMoves = document.getElementById("blueMoves")
const blueStats = document.getElementById("blueStats")
const selectionDiv = document.getElementById("selectionDiv")


const pokeCards = document.getElementsByClassName("pokeCard")

const faintedPokeball = "images/symbols/pokemonIndicators/pokeball_fainted.png"
const redSelected = "images/symbols/pokemonIndicators/redPokeball_selected.png"
const blueSelected = "images/symbols/pokemonIndicators/bluePokeball_selected.png"
const redPokeball = "images/symbols/pokemonIndicators/redPokeball_alive.png"
const bluePokeball = "images/symbols/pokemonIndicators/bluePokeball_alive.png"

let bestMatch = BestMatch();

let teams = JSON.parse(window.localStorage.getItem("teams"));
let fainted = false;

selectionDiv.style.display = "none"

for(let poke of teams[0].pokemon){
    poke.hp = poke.startHP
    poke.defense = 100
    poke.attack = 200
    poke.stage = 0
    for(let move of poke.moves){
        move.currentPP = 30;
    }
}


for(let poke of teams[1].pokemon){
    poke.hp = poke.startHP                  // TODO: Togliere pp reset
    poke.defense = 100
    poke.attack = 200
    poke.stage = 0
    for(let move of poke.moves){
        move.currentPP = 30;
    }
}


window.localStorage.setItem("teams", JSON.stringify(teams));


let selectedMove = [-1,-1]
let selectedPokemon = [0,0]

let animations = ["attackAnimRed", "attackAnimBlue"]

let partita = {
    round: 0,
    pokemonOnField: [-1,-1],
    currentTeamTurn: 0
}


console.log("Red Team:")
console.log(teams[0].pokemon)

console.log("Blue Team:")
console.log(teams[1].pokemon)


await placeOnField(0)
await placeOnField(1)
closeDialogue()
selectionDiv.style.display = "block"

partita.round++

function faintPokemon(nPokemon, nTeam){
    if(nTeam == 0){
        redPokeballs[nPokemon].src=faintedPokeball;
    }
    else if(nTeam == 1){
        bluePokeballs[nPokemon].src=faintedPokeball;
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
    selectionDiv.style.display = "block"
}

function switchTurn(){
    if(partita.currentTeamTurn == 0){
        partita.currentTeamTurn = 1;
        selectionDiv.style.left = "70%";
    }
    else{
        partita.currentTeamTurn = 0;
        selectionDiv.style.left = "29.5%";
    }
}

async function attackPhase(choicesArray){
    console.log("Fase di attacco: [" + choicesArray + "]")
    selectionDiv.style.display = "none"
    if(choicesArray.includes("pokemon")){
        if(choicesArray.every(val => val === "pokemon")){
            await placeOnField(0)
            await placeOnField(1)
            closeDialogue()
            switchTurn()
        }
        else{
            let nAtkPokemon = partita.pokemonOnField[choicesArray.indexOf("move")];
            placeOnField(choicesArray.indexOf("pokemon"))
            await sleep(1000)
                let nTeam = choicesArray.indexOf("move")
                let maxHit = 1
                let minHit = 1

                if (teams[nTeam].pokemon[partita.pokemonOnField[nTeam]].moves[selectedMove[nTeam]].info.meta.max_hits != null){
                    maxHit = teams[nTeam].pokemon[partita.pokemonOnField[nTeam]].moves[selectedMove[nTeam]].info.meta.max_hits
                    minHit = teams[nTeam].pokemon[partita.pokemonOnField[nTeam]].moves[selectedMove[nTeam]].info.meta.min_hits
                }
            for(let i = 0; i < Math.floor(Math.random() * (maxHit - minHit + 1) + minHit); i++) {
                printDialogue(`${getPokemonName(partita.pokemonOnField[nTeam], nTeam)} uses ${getMoveName(selectedMove[nTeam], partita.pokemonOnField[nTeam], nTeam)}!`)
                pokeCards[nTeam].classList.add(animations[nTeam])
                await sleep(1000)
                console.log(`${getPokemonName(partita.pokemonOnField[nTeam], nTeam)} usa ${getMoveName(selectedMove[nTeam], partita.pokemonOnField[nTeam], nTeam)}!`)
                if (Math.random() < (teams[nTeam].pokemon[partita.pokemonOnField[nTeam]].moves[selectedMove[nTeam]].info.accuracy*teams[nTeam].pokemon[partita.pokemonOnField[nTeam]].accuracyModifier) / 100 || teams[nTeam].pokemon[partita.pokemonOnField[nTeam]].moves[selectedMove[nTeam]].info.accuracy == null)  //Eseguo la mossa con probabilità dell'accuracy
                    await dealDamage(nTeam, choicesArray.indexOf("pokemon"), getMoveName(selectedMove[nTeam], nAtkPokemon, nTeam))
                else{
                    printDialogue(`${getPokemonName(partita.pokemonOnField[nTeam], nTeam)} misses the target!`)
                    console.log(`${getPokemonName(partita.pokemonOnField[nTeam], nTeam)} manca il bersaglio!`)
                }
                pokeCards[nTeam].classList.remove(animations[nTeam])
                await sleep(1000)
            }
            closeDialogue()
        }
    }
    else{
        let redSpeed = teams[0].pokemon[partita.pokemonOnField[0]].speed
        let blueSpeed = teams[1].pokemon[partita.pokemonOnField[1]].speed
        let fasterTeam;
        let slowerTeam;
        if(redSpeed >= blueSpeed){
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
    selectionDiv.style.display = "initial"
}


async function attack(slowerTeam, fasterTeam){
    await sleep(1000)
    let maxHit = 1
    let minHit = 1

    if (teams[fasterTeam].pokemon[partita.pokemonOnField[fasterTeam]].moves[selectedMove[fasterTeam]].info.meta.max_hits != null){
        maxHit = teams[fasterTeam].pokemon[partita.pokemonOnField[fasterTeam]].moves[selectedMove[fasterTeam]].info.meta.max_hits
        minHit = teams[fasterTeam].pokemon[partita.pokemonOnField[fasterTeam]].moves[selectedMove[fasterTeam]].info.meta.min_hits
    }
    for(let i = 0; i < Math.floor(Math.random() * (maxHit - minHit + 1) + minHit); i++) {   //Calcolo hit multiple
        printDialogue(`${getPokemonName(partita.pokemonOnField[fasterTeam], fasterTeam)} uses ${getMoveName(selectedMove[fasterTeam], partita.pokemonOnField[fasterTeam], fasterTeam)}!`)
        pokeCards[fasterTeam].classList.add(animations[fasterTeam])
        await sleep(1000)
        console.log(`${getPokemonName(partita.pokemonOnField[fasterTeam], fasterTeam)} usa ${getMoveName(selectedMove[fasterTeam], partita.pokemonOnField[fasterTeam], fasterTeam)}!`)
        if (Math.random() < (teams[fasterTeam].pokemon[partita.pokemonOnField[fasterTeam]].moves[selectedMove[fasterTeam]].info.accuracy*teams[fasterTeam].pokemon[partita.pokemonOnField[fasterTeam]].accuracyModifier) / 100 || teams[fasterTeam].pokemon[partita.pokemonOnField[fasterTeam]].moves[selectedMove[fasterTeam]].info.accuracy == null)  //Eseguo la mossa con probabilità dell'accuracy
            await dealDamage(fasterTeam, slowerTeam, getMoveName(selectedMove[fasterTeam], partita.pokemonOnField[fasterTeam], fasterTeam))
        else{
            printDialogue(`${getPokemonName(partita.pokemonOnField[fasterTeam], fasterTeam)} misses the target!`)
            console.log(`${getPokemonName(partita.pokemonOnField[fasterTeam], fasterTeam)} manca il bersaglio!`)
        }
        pokeCards[fasterTeam].classList.remove(animations[fasterTeam])
        await sleep(1000)
    }


    maxHit = 1
    minHit = 1
    if (teams[slowerTeam].pokemon[partita.pokemonOnField[slowerTeam]].moves[selectedMove[slowerTeam]].info.meta.max_hits != null){
        maxHit = teams[slowerTeam].pokemon[partita.pokemonOnField[slowerTeam]].moves[selectedMove[slowerTeam]].info.meta.max_hits
        minHit = teams[slowerTeam].pokemon[partita.pokemonOnField[slowerTeam]].moves[selectedMove[slowerTeam]].info.meta.min_hits
    }

    for(let i = 0; i < Math.floor(Math.random()*(maxHit-minHit + 1)+minHit); i++) {
        printDialogue(`${getPokemonName(partita.pokemonOnField[slowerTeam], slowerTeam)} uses ${getMoveName(selectedMove[slowerTeam], partita.pokemonOnField[slowerTeam], slowerTeam)}!`)
        pokeCards[slowerTeam].classList.add(animations[slowerTeam])
        await sleep(1000)
        console.log(`${getPokemonName(partita.pokemonOnField[slowerTeam], slowerTeam)} usa ${getMoveName(selectedMove[slowerTeam], partita.pokemonOnField[slowerTeam], slowerTeam)}!`)
        if (Math.random() < ((teams[slowerTeam].pokemon[partita.pokemonOnField[slowerTeam]].moves[selectedMove[slowerTeam]].info.accuracy*teams[slowerTeam].pokemon[partita.pokemonOnField[slowerTeam]].accuracyModifier) / 100) || teams[slowerTeam].pokemon[partita.pokemonOnField[slowerTeam]].moves[selectedMove[slowerTeam]].info.accuracy == null)
            await dealDamage(slowerTeam, fasterTeam, getMoveName(selectedMove[slowerTeam], partita.pokemonOnField[slowerTeam], slowerTeam))
        else{
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
    if(move != -1) {
        if (move.currentPP > 0) {
            let nMove = getMoveIndex(moveName, nTeam, nPokemon)
            selectedMove[nTeam] = nMove
            console.log(`Team ${nTeam}: Mossa selezionata = ${moveName} [${nMove}]`)
            let [finalPhase, choiceArr] = checkFinalPhase()
            if (finalPhase) {
                await attackPhase(choiceArr)
            }
            switchTurn()
            return
        } else
            alert("This move doesn't have anymore PPs, select another one!")
    }
    else
        alert(`${getPokemonName(nPokemon, nTeam)} doesn't have that move!`)
}

async function placeOnField(nTeam){
    if (nTeam == 0) {
        if (partita.pokemonOnField[0] != -1)                                //Faccio ritornare il vecchio pokemon selezionato allo stato normale
            redPokeballs[partita.pokemonOnField[0]].src = redPokeball
        partita.pokemonOnField[nTeam] = selectedPokemon[nTeam];             //Metto in campo il nuovo pokemon selezionato
        redPokeballs[selectedPokemon[nTeam]].src = redSelected;
    }
    else if (nTeam == 1) {
        if (partita.pokemonOnField[1] != -1)                                //Faccio ritornare il vecchio pokemon selezionato allo stato normale
            bluePokeballs[partita.pokemonOnField[1]].src = bluePokeball
        partita.pokemonOnField[nTeam] = selectedPokemon[nTeam];             //Metto in campo il nuovo pokemon selezionato
        bluePokeballs[selectedPokemon[nTeam]].src = blueSelected;
    }
    console.log(`Team ${nTeam}: ${getPokemonName(partita.pokemonOnField[nTeam], nTeam)} [${partita.pokemonOnField[nTeam]}] scelgo te!`)
    printPokemonCard(nTeam, partita.pokemonOnField[nTeam])                  //Printo la carta del pokemon messo in campo
    printMoveInfo(nTeam, partita.pokemonOnField[nTeam])
    await printDialogue(`I choose you ${getPokemonName(partita.pokemonOnField[nTeam], nTeam)}!`)
    selectedPokemon[nTeam] = -1                                             //Faccio tornare il valore temporaneo di pokemon selezioanto allo stato iniziale

}

async function selectPokemon(pokeName, nTeam){
    pokeName = await bestMatch.bestMatch(pokeName, pokedex)
    let nPokemon = getPokemonIndex(pokeName, nTeam)
    if (nPokemon != -1) {
        if(nPokemon != partita.pokemonOnField[nTeam]){
            if(teams[nTeam].pokemon[nPokemon].hp > 0) {
                selectedPokemon[nTeam] = nPokemon;
                console.log(`Team ${nTeam}: Pokemon selezionato = ${pokeName} [${nPokemon}]`)
                if(!fainted) {
                    let [finalPhase, choiceArr] = checkFinalPhase()
                    if (finalPhase) {
                        await attackPhase(choiceArr)
                        return
                    }
                    else{
                        switchTurn()
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


async function dealDamage(teamAtk,teamDef, moveName){
    let nPokemonAtk = partita.pokemonOnField[teamAtk];
    let nPokemonDef = partita.pokemonOnField[teamDef];

    if(nPokemonAtk != -1 && nPokemonDef != -1) {

        let move = getMove(moveName, nPokemonAtk, teamAtk)
        let moveIndex = getMoveIndex(moveName, teamAtk, nPokemonAtk)
        switch(move.info.meta.category.name ){
            case "damage":    // TODO: Da modificare quanto verranno aggiunti gli ailment
            case "damage+ailment":
                let dealtDamage = Math.round(calculateDamage(teams[teamAtk].pokemon[partita.pokemonOnField[teamAtk]], teams[teamDef].pokemon[partita.pokemonOnField[teamDef]], move))
                for (let i = 0; i < dealtDamage; i++) {
                    teams[teamDef].pokemon[partita.pokemonOnField[teamDef]].hp -= 1
                    window.localStorage.setItem("teams", JSON.stringify(teams));
                    if (teams[teamDef].pokemon[partita.pokemonOnField[teamDef]].hp > 0) {
                        printPokemonCard(teamDef, nPokemonDef)
                    } else {
                        faintPokemon(nPokemonDef, teamDef)
                        if (teamDef != partita.currentTeamTurn) {
                            switchTurn()
                        }
                    }
                    await sleep(20)
                }
                break;
            case "net-good-stats":
                calculateEffect(teams[teamDef].pokemon[nPokemonDef], teams[teamAtk].pokemon[nPokemonAtk], move)
                window.localStorage.setItem("teams", JSON.stringify(teams));
                printPokemonCard(teamDef, nPokemonDef)
                break;
            case "damage+lower" || "damage+raise":  // TODO: DA TESTARE
                dealtDamage = Math.round(calculateDamage(teams[teamAtk].pokemon[partita.pokemonOnField[teamAtk]], teams[teamDef].pokemon[partita.pokemonOnField[teamDef]], move))
                for (let i = 0; i < dealtDamage; i++) {
                    teams[teamDef].pokemon[partita.pokemonOnField[teamDef]].hp -= 1
                    window.localStorage.setItem("teams", JSON.stringify(teams));
                    if (teams[teamDef].pokemon[partita.pokemonOnField[teamDef]].hp > 0) {
                        printPokemonCard(teamDef, nPokemonDef)
                    } else {
                        faintPokemon(nPokemonDef, teamDef)
                        if (teamDef != partita.currentTeamTurn) {
                            switchTurn()
                        }
                    }
                    await sleep(20)
                }
                calculateEffect(teams[teamDef].pokemon[nPokemonDef], move)
                window.localStorage.setItem("teams", JSON.stringify(teams));
                printPokemonCard(teamDef, nPokemonDef)
        }
        teams[teamAtk].pokemon[partita.pokemonOnField[teamAtk]].moves[moveIndex].currentPP -= 1;
        window.localStorage.setItem("teams", JSON.stringify(teams));
        printPokemonCard(teamAtk, nPokemonAtk)
        await sleep(500)
    }
}

function checkFinalPhase(){
    let teamChoice = ["",""];
    if(partita.round >= 1) {
        let cont = 0;
        for (let i in selectedPokemon) {
            if (selectedPokemon[i] != -1){
                teamChoice[i] = "pokemon"
                cont++
            }
        }
        for (let i in selectedMove) {
            if (selectedMove[i] != -1){
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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getPokemonIndex(pokeName, nTeam){
    for(let i in teams[nTeam].pokemon){
        if(teams[nTeam].pokemon[i].name == pokeName)
            return i;
    }
    return -1;
}

function getPokemonName(nPokemon, nTeam){
    return teams[nTeam].pokemon[nPokemon].name
}

function getMove(moveName, nPokemon, nTeam){
    for(let move of teams[nTeam].pokemon[nPokemon].moves){
        if(move.name == moveName){
            return move
        }
    }
    return -1
}

function getMoveName(nMove, nPokemon, nTeam){
    return teams[nTeam].pokemon[nPokemon].moves[nMove].name
}

function getMoveIndex(moveName, nTeam, nPokemon){
    for(let i in teams[nTeam].pokemon[nPokemon].moves){
        if(teams[nTeam].pokemon[nPokemon].moves[i].name == moveName){
            return i;
        }
    }
    return -1
}


fightButton.addEventListener('click', async () => {    // TODO: CAPIRE SE LASCIARE ASYNC O NO
   
    /*if (insertPokemon.value.startsWith("scelgo te")) {
        let str = insertPokemon.value
        selectPokemon(str.substr(str.indexOf(" ") + 2), partita.currentTeamTurn);   //substr ecc.. toglie le prime due parole (scelgo te) in modo da rimanere con il pokemon
    } else if (insertPokemon.value.startsWith("usa")) {
        let str = insertPokemon.value
        selectMove(str.substr(str.indexOf(" ") + 1), partita.currentTeamTurn, partita.pokemonOnField[partita.currentTeamTurn])
    } else if (insertPokemon.value == "test") {
        pokeCards[0].classList.add("attackAnim")
        await sleep(2000)
        pokeCards[0].classList.remove("attackAnim")

    }*/

    let automaton = Automaton();
    automaton.run(insertPokemon.value);
    if (automaton.accepted() == 1){
        let str = automaton.result()
        selectMove(str, partita.currentTeamTurn, partita.pokemonOnField[partita.currentTeamTurn])
    }
    else if(automaton.accepted() == 0){
        let str = automaton.result()
        selectPokemon(str, partita.currentTeamTurn);
    }
})

redChangeInfoButton.addEventListener('click', () =>{
    if(redStats.style.display == "" || redStats.style.display == "none"){
        redStats.style.display = "block";
        redMoves.style.display = "none";
    }
    else if(redMoves.style.display == "" || redMoves.style.display == "none"){
        redMoves.style.display = "block";
        redStats.style.display = "none";
    }
})
blueChangeInfoButton.addEventListener('click', () =>{
    if(blueStats.style.display == "" || blueStats.style.display == "none"){
        blueStats.style.display = "block";
        blueMoves.style.display = "none";
    }
    else if(blueMoves.style.display == "" || blueMoves.style.display == "none"){
        blueMoves.style.display = "block";
        blueStats.style.display = "none";
    }
})

