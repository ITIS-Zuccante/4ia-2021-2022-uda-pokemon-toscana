import {BestMatch} from './resources/js/bestMatch.js';
import{pokedex, getPokemon} from "./resources/js/data/pokedex.js";
//import { WebSpeech } from './resources/js/webSpeech.js';
import {loadInfo} from "./resources/js/loadPokemonInfo.js"

let bestMatch = BestMatch();

//window.localStorage.clear();

const insertPokemon_buttonTeam1 = document.getElementById("insert1");
const insertPokemon_buttonTeam2 = document.getElementById("insert2");

//const pokemonStatus = document.getElementById("pokemon_status");
let pokemonStatusTeam1 = [];
for (let i = 0; i < 6; i++) {
    pokemonStatusTeam1[i] = document.getElementById(`pokemon_status1${i+1}`);
}
let pokemonNameTeam1 = [];
for (let i = 0; i < 6; i++) {
    pokemonNameTeam1[i] = document.getElementById(`pokemonName1${i+1}`);
}
let pokemonStatusTeam2 = [];
for (let i = 0; i < 6; i++) {
    pokemonStatusTeam2[i] = document.getElementById(`pokemon_status2${i+1}`);
}
let pokemonNameTeam2 = [];
for (let i = 0; i < 6; i++) {
    pokemonNameTeam2[i] = document.getElementById(`pokemonName2${i+1}`);
}
const startTheGame_Button = document.getElementById("startGameButton");//in teoria rimpiazzato con fightButton(da rendere cliccabile)
const fightButton = document.getElementById('fight');
const inputFieldTeam1 = document.getElementById("input1");
const inputFieldTeam2 = document.getElementById("input2");
const microphon_team1 = document.getElementById("micro1");
const microphon_team2 = document.getElementById("micro2") 
const loading = document.getElementById("loading")  //icona di caricamento in alto a destra (da togliere???)
const randomPokemon_buttonTeam1 = document.getElementById("random1");
const randomPokemon_buttonTeam2 = document.getElementById("random2");
const logoButton  = document.getElementById('logoButton');

let finishedSelectionTeam1 = false;
let finishedSelectionTeam2 = false;

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
if(!(JSON.parse(window.localStorage.getItem("teams")) == null)){
    teams = JSON.parse(window.localStorage.getItem("teams"));
    console.log(teams)
        for(let j = 0; j < teams[0].n; j++){
            pokemonStatusTeam1[teams[0].n-j-1].src = "../insertedPokemon.png";
            pokemonNameTeam1[teams[0].n-j-1].innerHTML = placeStars(teams[0].pokemon[teams[0].n-j-1].name.length);
        }
        for(let j = 0; j < teams[1].n; j++){
            pokemonStatusTeam2[teams[1].n-j-1].src = "../insertedPokemon.png";
            pokemonNameTeam2[teams[1].n-j-1].innerHTML = placeStars(teams[1].pokemon[teams[1].n-j-1].name.length);
        }
    
} 
console.log(teams)
let pokemonsObject = {};

async function chooseOne(currentTeam){
    if(teams[currentTeam].n == 6){
        switch(currentTeam){
            case 0:
                finishedSelectionTeam1 = true;
                break;
            case 1:
                finishedSelectionTeam2 = true;
                break;
        }
    }
    if((!finishedSelectionTeam1 && currentTeam == 0) || (!finishedSelectionTeam2 && currentTeam == 1)) {
        
        let inputField;
        switch(currentTeam){
            case 0:
                inputField = inputFieldTeam1.value;
                break;
            case 1:
                inputField = inputFieldTeam2.value;
                break;
        }
        console.log(inputField)
        if (inputField != "") {
            let val = bestMatch.bestMatch(inputField, pokedex);
            if (!(teams[currentTeam].pokemon.some(e => e.name === val))) {
                //loading.style.visibility = "visible";
                pokemonsObject.val = await getPokemon(pokedex.indexOf(val)+1)
                teams[currentTeam].pokemon.push(await loadInfo(pokemonsObject.val));
                //loading.style.visibility = "hidden";
                let name = teams[currentTeam].pokemon[teams[currentTeam].n].name;
                teams[currentTeam].n++;
                console.log("Pokemon scelto: ");
                console.log(teams[currentTeam].pokemon[teams[currentTeam].n-1]);
                switch(currentTeam){
                    case 0:
                        console.log("inside0")
                        pokemonStatusTeam1[teams[currentTeam].n-1].src = "../insertedPokemon.png";
                        pokemonNameTeam1[teams[currentTeam].n-1].innerHTML = placeStars(name.length);
                        break;
                    case 1:
                        console.log("inside1")
                        pokemonStatusTeam2[teams[currentTeam].n-1].src = "../insertedPokemon.png";
                        pokemonNameTeam2[teams[currentTeam].n-1].innerHTML = placeStars(name.length);
                        break;
                }
                console.log(teams[currentTeam].pokemon[teams[currentTeam].n-1].name);
            } else {
                alert("Hai già scelto questo pokemon nel tuo team!");
                console.log(val + " c'è già")
            }
            inputFieldTeam1.value = "";
            inputFieldTeam2.value = "";
        }
    }
    else{
        alert("Hai raggiunto il numero massimo di pokemon in questo team!");    
        console.log("Can't add more pokemon to the team")
    }
}

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

insertPokemon_buttonTeam1.addEventListener("click", () => {
    chooseOne(0);
});

insertPokemon_buttonTeam2.addEventListener("click",() => {
     chooseOne(1);
});

randomPokemon_buttonTeam1.addEventListener("click",() => {
    inputFieldTeam1.value = pokedex[Math.floor(Math.random()*896)];
    chooseOne(0);
});

randomPokemon_buttonTeam2.addEventListener("click",() => {
    inputFieldTeam2.value = pokedex[Math.floor(Math.random()*896)];
    chooseOne(1);
});

fightButton.addEventListener('click', () =>{
    window.localStorage.setItem("teams", JSON.stringify(teams));
    window.location.href='fight.html';
});

logoButton.addEventListener('click', () =>{
    location.reload();
});

microphon_team1.addEventListener('click', () =>{
    
});