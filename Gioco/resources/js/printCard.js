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


const pokemonCards = document.getElementsByClassName("card")

const Team1MovesInfo = document.getElementsByClassName("moveInfo1")
const Team2MovesInfo = document.getElementsByClassName("moveInfo2")

const pokemonNameBox = document.getElementsByClassName("name")

//const pokemonTypeBox1 = document.getElementsByClassName("pokeType")
//const pokemonTypeBox2 = document.getElementsByClassName("pokeType2")

const pokemonHpBox = document.getElementsByClassName("HP")
const pokemonTotalHp = document.getElementsByClassName("totalHP")

const pokemonInfoBox = document.getElementsByClassName("pokeInfo")
const pokemonImg = document.getElementsByClassName("PokemonSprite")


const pokemonAttackBox = document.getElementsByClassName("Attack")
const pokemonDefenseBox = document.getElementsByClassName("Defense")
const pokemonSpecialAttackBox = document.getElementsByClassName("SpecialAttack")
const pokemonSpecialDefenseBox = document.getElementsByClassName("SpecialDefense")
const pokemonSpeedBox = document.getElementsByClassName("Speed")

const Team1MoveType = document.getElementsByClassName("Team1MoveType")
const Team2MoveType = document.getElementsByClassName("Team2MoveType")
const Team1MoveBox = document.getElementsByClassName("MoveBox1")
const Team2MoveBox = document.getElementsByClassName("MoveBox2")
const Team1MovesTextBox = document.getElementsByClassName("MoveSet1")
const Team2MovesTextBox = document.getElementsByClassName("MoveSet2")
//const redPPBox = document.getElementsByClassName("redPP")
//const bluePPBox = document.getElementsByClassName("bluePP")

const bar1 = document.getElementById("bar1");
const bar2 = document.getElementById("bar2");

function updateProgressBar(progressBar, value) {
    value = Math.round(value);
    progressBar.querySelector(".progress__fill").style.width = `${value}%`;
    progressBar.querySelector(".progress__text").textContent = `${value}%`;
}

export function printPokemonCard(nTeam, nPokemon, firstTime){

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
    let startHp = teams[nTeam].pokemon[nPokemon].startHP
    //pokemonTypeBox2[nTeam].style.visibility = "hidden"

    pokemonNameBox[nTeam].innerHTML = teams[nTeam].pokemon[nPokemon].name;
    pokemonHpBox[nTeam].innerHTML = hp + "/";
    if (firstTime){
        pokemonTotalHp[nTeam].innerHTML = startHp + " HP";
        pokemonImg[nTeam].src = imageSrc;
        pokemonImg[nTeam].style.height = "200px";
        pokemonAttackBox[nTeam].innerHTML = "Attack: " + attack
        pokemonDefenseBox[nTeam].innerHTML = "Defense: " + defense
        pokemonSpecialAttackBox[nTeam].innerHTML = "Special Attack: " + specialAttack
        pokemonSpecialDefenseBox[nTeam].innerHTML = "Special Defense: " + specialDefense
        pokemonSpeedBox[nTeam].innerHTML = "Speed: " + speed
    }
    if(nTeam == 0){
        updateProgressBar(bar1, (hp/startHp)*100);
    } else {
        updateProgressBar(bar2, (hp/startHp)*100);
    }
    //pokemonTypeBox1[nTeam].innerHTML = typeAbbrevations[type];
    //pokemonTypeBox1[nTeam].style.backgroundColor = typeColor;
    pokemonCards[nTeam].style.backgroundImage = getDiagonalGradient(type);
    //pokemonInfoBox[nTeam].style.backgroundImage = getVerticalGradient(type);
    //pokemonInfoBox[nTeam].style.backgroundColor = typeColor;
    //pokemonInfoBox[nTeam].style.backgroundImage = "linear-gradient(to right, lightgray, white)";
   

    for(let i in moves){
        if(nTeam == 0){
            Team1MovesTextBox[i].innerHTML = moves[i].name;
            //redPPBox[i].innerHTML = "PP: "  + moves[i].currentPP + "/" + moves[i].info.pp;
            //redMoveBox[i-1].style.backgroundImage = getDiagonalGradient(moves[i].info.type.name)
            Team1MoveBox[i].style.backgroundColor = typesColor[moves[i].info.type.name].color_type;
            //Team1MoveType[i].innerHTML = typeAbbrevations[moves[i].info.type.name]
            Team1MoveType[i].style.backgroundColor = typesColor[moves[i].info.type.name].color_type
        }
        else if(nTeam == 1){
            Team2MovesTextBox[i].innerHTML = moves[i].name;
            //bluePPBox[i].innerHTML = "PP: "  + moves[i].currentPP + "/" + moves[i].info.pp;
            Team2MoveBox[i].style.backgroundColor = typesColor[moves[i].info.type.name].color_type;
            //Team2MoveType[i].innerHTML = typeAbbrevations[moves[i].info.type.name]
            Team2MoveType[i].style.backgroundColor = typesColor[moves[i].info.type.name].color_type
        }
    }

    /* pokemonImageBox[nTeam].style.backgroundImage = getVerticalGradient(type);   DA RIVEDERE DESIGN*/

    if(teams[nTeam].pokemon[nPokemon].type.length > 1){  //Se ha più di un tipo
        type = teams[nTeam].pokemon[nPokemon].type[1]
        typeColor = typesColor[type].color_type;
        /*pokemonTypeBox2[nTeam].style.visibility = "visible";
        pokemonTypeBox2[nTeam].innerHTML = typeAbbrevations[type];
        pokemonTypeBox2[nTeam].style.backgroundColor = typeColor;*/
    }
}

export function printDefaultCard(nTeam){

    //pokemonTypeBox2[nTeam].style.visibility = "hidden"

    pokemonNameBox[nTeam].innerHTML ="???"
    pokemonHpBox[nTeam].innerHTML = "???"
    pokemonTotalHp[nTeam].innerHTML = ""
    //pokemonTypeBox1[nTeam].innerHTML = "???"
    //pokemonTypeBox1[nTeam].style.backgroundColor = "gray";
    pokemonCards[nTeam].style.backgroundImage = "";
    pokemonImg[nTeam].src = "images/symbols/question-mark.png";

    pokemonAttackBox[nTeam].innerHTML = "Attack: " + "???"
    pokemonDefenseBox[nTeam].innerHTML = "Defense: " + "???"
    pokemonSpecialAttackBox[nTeam].innerHTML = "Special Attack: " + "???"
    pokemonSpecialDefenseBox[nTeam].innerHTML = "Special Defense: " + "???"
    pokemonSpeedBox[nTeam].innerHTML = "Speed: " + "???"

    for(let i = 1; i < 5; i++){
        if(nTeam == 0){
            Team1MovesTextBox[i-1].innerHTML = ""
            //redPPBox[i-1].innerHTML = ""
            Team1MoveBox[i-1].style.backgroundColor = "white"
            Team1MoveType[i-1].innerHTML = ""
            Team1MoveType[i-1].style.backgroundColor = "white"
        }
        else if(nTeam == 1){
            Team2MovesTextBox[i-1].innerHTML = ""
            //bluePPBox[i-1].innerHTML = ""
            Team2MoveBox[i-1].style.backgroundColor = "white"
            Team2MoveType[i-1].innerHTML = ""
            Team2MoveType[i-1].style.backgroundColor = "white"
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
            Team1MovesInfo[i].title = str
        }        
    }

    else if(nTeam == 1){
        for(let i = 0; i < 4; i++){
            str = ""
            str += "Accuracy: " + moves[i].info.accuracy + "\n"
            str += "Power: " + moves[i].info.power + "\n"
            //str += "Description: " + moves[i].info.effect_entries[0].short_effect
            Team2MovesInfo[i].title = str
        }        
    }


}