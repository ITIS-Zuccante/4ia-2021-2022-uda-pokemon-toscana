import {BestMatch} from './resources/js/bestMatch.js';
import{pokedex, getPokemon} from "./resources/js/data/pokedex.js";

import {loadInfo} from "./resources/js/loadPokemonInfo.js"

let bestMatch = BestMatch();

window.localStorage.clear();

const insertPokemon_button = document.getElementById("insert");
//const pokemonStatus = document.getElementById("pokemon_status");
let pokemonStatus = [];
for (let i = 0; i < 6; i++) {
    pokemonStatus[i] = document.getElementById(`pokemon_status${i+1}`);
}
let pokemonName = [];
for (let i = 0; i < 6; i++) {
    pokemonName[i] = document.getElementById(`pokemonName${i+1}`);
}
const startTheGame_Button = document.getElementById("startGameButton");//in teoria rimpiazzato con fightButton(da rendere cliccabile)
const fightButton = document.getElementById('fight');
const inputField = document.getElementById("input");
const teamWriting = document.getElementById("teamImage"); //scritta sopra la pokeball ---DA TOGLIERE
const startButton = document.getElementById("startGameButton") //uguale a startTheGame_Button
const loading = document.getElementById("loading")  //icona di caricamento in alto a destra (da togliere???)
const randomPokemon_button = document.getElementById("random");

let finishedSelectionTeam1 = false;
let finishedSelectionTeam2 = false;

let currentTeam = 0;        //0 - RED , 1 - BLU

let teams = [
    {
        name: "red",
        n: 0,
        pokemon:[]
    },
    {
        name: "blue",
        n: 0,
        pokemon:[]

    }
];

let pokemonsObject = {};

/*function changeColor(){
    if(currentTeam == 0) {
        pokeball.src="images/symbols/pokeBalls/bluePokeball.png"
        teamWriting.src="images/writings/hdblueTeam.png"
        confirmButton.src = "images/buttons/ichooseyou_button2.png"
        currentTeam = 1;
    }
    else if (currentTeam == 1){
        startTheGame_Button.style.visibility = "visible";
        finishedSelection = true;
    }
    else{
        console.log("error")
    }
}*/

async function chooseOne(){
    if(!finishedSelectionTeam1) {
        if (inputField.value != "") {
            console.log(inputField.value);
            let val = bestMatch.bestMatch(inputField.value, pokedex);
            if (!(teams[currentTeam].pokemon.some(e => e.name === val))) {
                //loading.style.visibility = "visible";
                pokemonsObject.val = await getPokemon(pokedex.indexOf(val)+1)
                teams[currentTeam].pokemon.push(await loadInfo(pokemonsObject.val));
                //loading.style.visibility = "hidden";
                let name = teams[currentTeam].pokemon[teams[currentTeam].n].name;
                console.log(pokemonStatus[teams[currentTeam].n]);
                pokemonStatus[teams[currentTeam].n].src = "../insertedPokemon.png";
                teams[currentTeam].n++;
                console.log("Pokemon scelto: ");
                console.log(teams[currentTeam].pokemon[teams[currentTeam].n-1]);
                pokemonName[teams[currentTeam].n-1].innerHTML  = placeStars(name.length);
                console.log(teams[currentTeam].pokemon[teams[currentTeam].n-1].name);


                inputField.value = "";
                /*if (currentTeam == 0) {
                    pokeball.src = `images/symbols/pokeBalls/redPokeball${teams[currentTeam].n}.png`;
                } else if (currentTeam == 1) {
                    pokeball.src = `images/symbols/pokeBalls/bluePokeball${teams[currentTeam].n}.png`;
                }
                if (teams[currentTeam].n == 6) {
                    console.log(`Team ${teams[currentTeam].name}: ` + teams[currentTeam].pokemon[0])
                    changeColor()
                }*/
                if(teams[currentTeam].n == 6){
                    finishedSelectionTeam1 = true;
                }
            } else {
                alert("You already have this pokemon in your team!");
                inputField.value = "";
                console.log(val + " c'è già")
            }
        }
    }
    else{
        alert("Hai raggiunto il numero massimo di pokemon in questo team!");    
        console.log("Can't add more pokemon to the team")
    }
}

/*startButton.addEventListener('click', () =>{
    window.localStorage.setItem("teams", JSON.stringify(teams));
    window.location.href='battle.html';
})*/

function placeStars(length){
    let nameWithStars = "";
    for(let i = 0; i < length; i++){
        nameWithStars += '*';
    }
    //document.getElementById("demo").style.fontSize = "x-large";
    if(nameWithStars.length > 14){

    } else {

    }
    return nameWithStars;
}


insertPokemon_button.addEventListener("click", chooseOne);
