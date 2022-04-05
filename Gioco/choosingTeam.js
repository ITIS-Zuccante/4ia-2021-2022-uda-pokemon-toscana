import {BestMatch} from './resources/js/bestMatch.js';

import{pokedex, getPokemon} from "./resources/js/data/pokedex.js";

import {loadInfo} from "./resources/js/loadPokemonInfo.js"

let bestMatch = BestMatch();

window.localStorage.clear();

const iChooseYou_Button = document.getElementById("confirmButton");
const pokeball = document.getElementById("pokeball");
const startTheGame_Button = document.getElementById("startGameButton");
const insertPokemon_Field = document.getElementById("insertPokemon");
const teamWriting = document.getElementById("teamImage");
const confirmButton = document.getElementById("confirmButtonImage");
const startButton = document.getElementById("startGameButton")
const loading = document.getElementById("loading")  

let finishedSelection = false;
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

function changeColor(){
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
}

async function chooseOne(){
    if(!finishedSelection) {
        if (insertPokemon_Field.value != "") {
            let val = bestMatch.bestMatch(insertPokemon_Field.value, pokedex);
            //if (!(teams[currentTeam].pokemon.some(e => e.name === val))) {
                loading.style.visibility = "visible";
                pokemonsObject.val = await getPokemon(pokedex.indexOf(val)+1)
                teams[currentTeam].pokemon.push(await loadInfo(pokemonsObject.val));
                loading.style.visibility = "hidden";
                teams[currentTeam].n++;
                console.log("Pokemon scelto: ")
                console.log(teams[currentTeam].pokemon[teams[currentTeam].n-1])
            //insertPokemon_Field.value = "";
                if (currentTeam == 0) {
                    pokeball.src = `images/symbols/pokeBalls/redPokeball${teams[currentTeam].n}.png`;
                } else if (currentTeam == 1) {
                    pokeball.src = `images/symbols/pokeBalls/bluePokeball${teams[currentTeam].n}.png`;
                }
                if (teams[currentTeam].n == 6) {
                    console.log(`Team ${teams[currentTeam].name}: ` + teams[currentTeam].pokemon[0])
                    changeColor()
                }
            } else {
                alert("You already have this pokemon in your team!");
                insertPokemon_Field.value = "";
                console.log(val + " c'è già")
            }
        }
    //}
    //else{
    //    console.log("Can't add more pokemon to the team")
   // }
}

startButton.addEventListener('click', () =>{
    window.localStorage.setItem("teams", JSON.stringify(teams));
    window.location.href='battle.html';
})


iChooseYou_Button.addEventListener("click", chooseOne);