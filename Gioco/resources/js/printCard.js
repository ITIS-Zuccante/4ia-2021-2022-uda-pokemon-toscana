import {typesColor} from "./data/typescolor.js";
import {getDiagonalGradient, getVerticalGradient, getHorizontalGradient} from "./colorGradient.js";

let typeAbbrevations = {
    "grass" : "GRS",
    "fire" : "FIR",
    "water" : "WTR",
    "bug" : "BUG",
    "normal" : "NOR",
    "poison" : "PSN",
    "electric" : "ELC",
    "ground" : "GRN",
    "fighting" : "FGT",
    "psychic" : "PSY",
    "rock" : "RCK",
    "ghost" : "GHO",
    "ice" : "ICE",
    "dragon" : "DRG",
    "dark" : "DRK",
    "steel" : "STL",
    "fairy" : "FRY",
    "flying" : "FLY"
}


const pokemonCards = document.getElementsByClassName("contentDiv")

const redMovesInfo = document.getElementsByClassName("redMoveInfo")
const blueMovesInfo = document.getElementsByClassName("blueMoveInfo")

const pokemonNameBox = document.getElementsByClassName("pokeName")
const pokemonTypeBox1 = document.getElementsByClassName("pokeType")
const pokemonTypeBox2 = document.getElementsByClassName("pokeType2")
const pokemonHpBox = document.getElementsByClassName("pokeHp")
const pokemonInfoBox = document.getElementsByClassName("pokeInfo")
const pokemonImg = document.getElementsByClassName("pokemonImg")


const pokemonAttackBox = document.getElementsByClassName("pokeAttack")
const pokemonDefenseBox = document.getElementsByClassName("pokeDefense")
const pokemonSpecialAttackBox = document.getElementsByClassName("pokeSpecialAtt")
const pokemonSpecialDefenseBox = document.getElementsByClassName("pokeSpecialDef")
const pokemonSpeedBox = document.getElementsByClassName("pokeSpeed")

const redMoveType = document.getElementsByClassName("redMoveType")
const blueMoveType = document.getElementsByClassName("blueMoveType")
const redMoveBox = document.getElementsByClassName("redMoveBox")
const blueMoveBox = document.getElementsByClassName("blueMoveBox")
const redMovesTextBox = document.getElementsByClassName("redMoves")
const blueMovesTextBox = document.getElementsByClassName("blueMoves")
const redPPBox = document.getElementsByClassName("redPP")
const bluePPBox = document.getElementsByClassName("bluePP")


export function printPokemonCard(nTeam, nPokemon){

    let teams = JSON.parse(window.localStorage.getItem("teams"));

    let type = teams[nTeam].pokemon[nPokemon].type[0]
    let typeColor = typesColor[type].color_type;
    let hp = teams[nTeam].pokemon[nPokemon].hp;
    let attack = teams[nTeam].pokemon[nPokemon].attack
    let defense = teams[nTeam].pokemon[nPokemon].defense
    let specialAttack = teams[nTeam].pokemon[nPokemon].specialAttack
    let specialDefense = teams[nTeam].pokemon[nPokemon].specialDefense
    let speed = teams[nTeam].pokemon[nPokemon].speed
    let imageSrc = teams[nTeam].pokemon[nPokemon].sprites["front_default"]
    let moves = teams[nTeam].pokemon[nPokemon].moves

    pokemonTypeBox2[nTeam].style.visibility = "hidden"

    pokemonNameBox[nTeam].innerHTML = teams[nTeam].pokemon[nPokemon].name;
    pokemonHpBox[nTeam].innerHTML = hp + " HP";
    pokemonTypeBox1[nTeam].innerHTML = typeAbbrevations[type];
    pokemonTypeBox1[nTeam].style.backgroundColor = typeColor;
    pokemonCards[nTeam].style.backgroundImage = getDiagonalGradient(type);
    //pokemonInfoBox[nTeam].style.backgroundImage = getVerticalGradient(type);
    //pokemonInfoBox[nTeam].style.backgroundColor = typeColor;
    //pokemonInfoBox[nTeam].style.backgroundImage = "linear-gradient(to right, lightgray, white)";
    pokemonImg[nTeam].src = imageSrc;

    pokemonAttackBox[nTeam].innerHTML = "Attack: " + attack
    pokemonDefenseBox[nTeam].innerHTML = "Defense: " + defense
    pokemonSpecialAttackBox[nTeam].innerHTML = "Special Attack: " + specialAttack
    pokemonSpecialDefenseBox[nTeam].innerHTML = "Special Defense: " + specialDefense
    pokemonSpeedBox[nTeam].innerHTML = "Speed: " + speed

    for(let i in moves){
        if(nTeam == 0){
            redMovesTextBox[i].innerHTML = moves[i].name;
            redPPBox[i].innerHTML = "PP: "  + moves[i].currentPP + "/" + moves[i].info.pp;
            //redMoveBox[i-1].style.backgroundImage = getDiagonalGradient(moves[i].info.type.name)
            redMoveBox[i].style.backgroundColor = typesColor[moves[i].info.type.name].color_type;
            redMoveType[i].innerHTML = typeAbbrevations[moves[i].info.type.name]
            redMoveType[i].style.backgroundColor = typesColor[moves[i].info.type.name].color_type
        }
        else if(nTeam == 1){
            blueMovesTextBox[i].innerHTML = moves[i].name;
            bluePPBox[i].innerHTML = "PP: "  + moves[i].currentPP + "/" + moves[i].info.pp;
            blueMoveBox[i].style.backgroundColor = typesColor[moves[i].info.type.name].color_type;
            blueMoveType[i].innerHTML = typeAbbrevations[moves[i].info.type.name]
            blueMoveType[i].style.backgroundColor = typesColor[moves[i].info.type.name].color_type
        }
    }

    /* pokemonImageBox[nTeam].style.backgroundImage = getVerticalGradient(type);   DA RIVEDERE DESIGN*/

    if(teams[nTeam].pokemon[nPokemon].type.length > 1){  //Se ha più di un tipo
        type = teams[nTeam].pokemon[nPokemon].type[1]
        typeColor = typesColor[type].color_type;
        pokemonTypeBox2[nTeam].style.visibility = "visible";
        pokemonTypeBox2[nTeam].innerHTML = typeAbbrevations[type];
        pokemonTypeBox2[nTeam].style.backgroundColor = typeColor;
    }
}

export function printDefaultCard(nTeam){

    pokemonTypeBox2[nTeam].style.visibility = "hidden"

    pokemonNameBox[nTeam].innerHTML ="???"
    pokemonHpBox[nTeam].innerHTML = "???"
    pokemonTypeBox1[nTeam].innerHTML = "???"
    pokemonTypeBox1[nTeam].style.backgroundColor = "gray";
    pokemonCards[nTeam].style.backgroundImage = "";
    pokemonImg[nTeam].src = "images/symbols/questionMark.png";

    pokemonAttackBox[nTeam].innerHTML = "Attack: " + "???"
    pokemonDefenseBox[nTeam].innerHTML = "Defense: " + "???"
    pokemonSpecialAttackBox[nTeam].innerHTML = "Special Attack: " + "???"
    pokemonSpecialDefenseBox[nTeam].innerHTML = "Special Defense: " + "???"
    pokemonSpeedBox[nTeam].innerHTML = "Speed: " + "???"

    for(let i = 1; i < 5; i++){
        if(nTeam == 0){
            redMovesTextBox[i-1].innerHTML = ""
            redPPBox[i-1].innerHTML = ""
            redMoveBox[i-1].style.backgroundColor = "white"
            redMoveType[i-1].innerHTML = ""
            redMoveType[i-1].style.backgroundColor = "white"
        }
        else if(nTeam == 1){
            blueMovesTextBox[i-1].innerHTML = ""
            bluePPBox[i-1].innerHTML = ""
            blueMoveBox[i-1].style.backgroundColor = "white"
            blueMoveType[i-1].innerHTML = ""
            blueMoveType[i-1].style.backgroundColor = "white"
        }
    }
}

export function printMoveInfo(nTeam, nPokemon){
    let teams = JSON.parse(window.localStorage.getItem("teams"));
    let moves = teams[nTeam].pokemon[nPokemon].moves

    let str;
    if(nTeam == 0){
        for(let i = 0; i < 4; i++){
            str = ""
            str += "Accuracy: " + moves[i].info.accuracy + "\n"
            str += "Power: " + moves[i].info.power + "\n"
            //str += "Description: " + moves[i].info.effect_entries[0].short_effect //TODO: Capire cosa fare della descrizione (alcune descrizioni dicono cose infattibili in game)
            redMovesInfo[i].title = str
        }        
    }

    else if(nTeam == 1){
        for(let i = 0; i < 4; i++){
            str = ""
            str += "Accuracy: " + moves[i].info.accuracy + "\n"
            str += "Power: " + moves[i].info.power + "\n"
            //str += "Description: " + moves[i].info.effect_entries[0].short_effect
            blueMovesInfo[i].title = str
        }        
    }


}