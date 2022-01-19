//setInterval(f, 100);function f() {console.log(window.innerWidth);} //per studiare il comportamento del @media
/*
import { getPokemon } from './selection.js';
let data = getPokemon();

import { InputData } from './team/Tmodules/inputData';
let inputData = InputData(); // assomiglia ad una new di Java


import { pokedex } from './modules/pokedex.js';
*/

import {
    BestMatch
} from '../modules/bestMatch.js';
let bestMatch = BestMatch(); // assomiglia ad una new di Java

import {
    SetColor
} from '../modules/colors.js';
let color = SetColor(); // assomiglia ad una new di Java

import {
    Speech
} from '../speech.js';

import {
    Moves
} from './Fmodules/moves.js'
// import { changeTurn } from './Fmodules/Fturns.js';

let speech = Speech();

// let howMutchBackgrounds = 20;

//--------------------capitalize---------------------------//

function capitalize(str) {
    str = str.split(" ");

    for (var i = 0, x = str.length; i < x; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

    return str.join(" ");
}

let leftPokemon, rightPokemon;



// let notTarget = "";

// function turns() {
//     if (turn == "left") {
//         turn = "right";
//     } else {
//         if (turn == "right") {
//             turn = "left";
//         }
//     }

//     if (turn == "left") notTarget = "right";
//     if (turn == "right") notTarget = "left";
//     // opacity(turn, 1);
//     // opacity(notTarget, 0.5);
// }

// function opacity(target, opacity) {
//     document.getElementById(target + "UserInput").style.opacity = opacity;
//     document.getElementById(target + "ResetButton").style.opacity = opacity;
//     document.getElementById(target + "Mic").style.opacity = opacity;
//     document.getElementById(target + "RandomButton").style.opacity = opacity;
//     document.getElementById(target + "SubmitButton").style.opacity = opacity;
//     document.getElementById(target + "MiniaturesDiv").style.opacity = opacity;

// }


function removeAllAnimations() {
    // for (let i = 0; i < 6; i++) {
    document.getElementById(turns[0] + "Pokemon").classList.remove("animated");
    document.getElementById(turns[1] + "Pokemon").classList.remove("animated");
    // document.getElementById("right" + i + "Pokemon").classList.remove("animated");
    // }
}
function animation(target) {
    removeAllAnimations(target);
    document.getElementById(target + "Pokemon").classList.add("animated");
}

document.getElementById('UserInput').addEventListener('keydown', (e) => {
    if (e.key == "Enter") {
        let val = document.getElementById('UserInput').value;
        if (val != "" && val != " ")
            findPokemonByName(val);
        else
            console.log("Empty message");
    }
});

function removeFormClasses() {
    document.querySelector(".formIsland").classList.remove("to" + turns[0]);
    document.querySelector(".formIsland").classList.remove("to" + turns[1]);
}

function moveForm() {
    removeFormClasses();
    document.querySelector(".formIsland").classList.add("to" + turns[turnI]);
}

function changeTurn() {
    if (turnI == 0)
        turnI = 1;
    else
        turnI = 0;
}
function fromLetterToWord(letter) {
    if (letter == "l") {
        return "left"
    } else {
        return "right"
    }
}

function loadPokemonFromMiniature(pos, localPokemon) {
    let posWord = fromLetterToWord(pos);
    console.log("pos: " + posWord);
    notify("info", "Stai chiamando <strong>" + localPokemon.name + "</strong>", "top-" + posWord)
    // set false to inCharge to all pokemons
    for (let i = 0; i < 6; i++) {
        allPoke[pos][i].inCharge = false;
        if (localPokemon.uniQueId == allPoke[pos][i].uniQueId) {
            allPoke[pos][i].inCharge = true;
        }
    }

    // localPokemon.inCharge = true;
    console.log(allPoke)

    if (pos == "l")
        pos = "left";
    if (pos == "r")
        pos = "right";


    changeTurn();
    // removeAllAnimations();
    animation(turns[turnI]);

    moveForm();
    // if (turn == "") {
    //     if (pos == "left")
    //         turn = "right";
    //     if (pos == "right")
    //         turn = "left";
    //     // turns();
    // }
    // console.log(whosInCharge(pos))
    // if (whosInCharge(pos) == localPokemon.name)
    // console.error("Questo pokemon è già in carica! - fight.js 85")
    // console.log("Now turn is " + turn)

    // if (whosInCharge(pos) != localPokemon.name)
    // if (turn != pos)
    // console.error("It's not your turn!")
    // else {

    // localPokemon.inCharge = true;
    // console.log("is local pokemon in charge? " + localPokemon);
    // console.log(localPokemon);
    // console.log(" " + localPokemon.inCharge);

    // turns();
    document.getElementById(pos + '__card__name').innerHTML = capitalize(localPokemon.name);
    document.getElementById(pos + '_pokemon_attack').innerHTML = localPokemon.base_attack_stats;
    // document.getElementById(pos + 'HpValue').innerHTML = localPokemon.hp_modify;
    document.getElementById(pos + '-pokemon-hp').innerHTML = localPokemon.hp_modify;
    document.getElementById(pos + '_pokemon_defense').innerHTML = localPokemon.base_defence;
    document.getElementById(pos + '_pokemon_special_attack').innerHTML = localPokemon.special_attack;
    document.getElementById(pos + '_pokemon_special_defense').innerHTML = localPokemon.special_defence;
    document.getElementById(pos + '_pokemon_speed').innerHTML = localPokemon.speed;


    //Abilità
    if (localPokemon.abilities[1] == null) {
        document.getElementById(pos + '_hidden_ability').innerHTML = localPokemon.abilities[0];
        document.getElementById(pos + '_ability').innerHTML = "";
    } else {
        document.getElementById(pos + '_hidden_ability').innerHTML = localPokemon.abilities[0];
        document.getElementById(pos + '_ability').innerHTML = localPokemon.abilities[1];
    }

    document.getElementById(pos + '_image').src = localPokemon.image;

    if (localPokemon.types[1] == null) {
        document.getElementById(pos + "_top").innerHTML = localPokemon.types[0];
        /*document.getElementById(pos + "_top2").innerHTML = "";*/
    } else {
        document.getElementById(pos + "_top").innerHTML = localPokemon.types[0] + "/" + localPokemon.types[1];
        /*document.getElementById(pos + "_top2").innerHTML = localPokemon.types[1];*/
    }


    if (pos == "left")
        leftPokemon = Object.assign({}, localPokemon); //questo metodo copia l'oggetto, senza che i due facciano riferimento alla stessa cella di memoria.
    if (pos == "right")
        rightPokemon = Object.assign({}, localPokemon);

    // console.log(localPokemon)
    color.setColor(pos, localPokemon);

    document.getElementById('UserInput').value = "";
    // document.getElementById('HpL').style.visibility = "visible"; //rendo visibile la vita del pokemon

    // for (let i = 0; i < 6; i++) {
    // if (allPoke[pos[0]][i].name != localPokemon.name)
    // allPoke[pos[0]][i].inCharge = false;
    // }
    // }
}

let elmnt;
let allPoke;

let pokeList = {
    "right": [],
    "left": []
};


// document.getElementById("card0l").onmouseout = function(){
//     console.log("out");
// }
// document.getElementById("card0l").onmouseover = function(){
//     document.getElementById("type0l").style.display = "block";
//     // console.log("Bro")
// }
//--------------------loadMiniatures---------------------------//
let turns = ["left", "right"];
let turn = 0;
let turnI = 0;



function otherSide() {
    if (turn = 0)
        return turns[1];
    else
        return turns[0];
}

function findPokemonByName(name) {
    // console.log("Ima lookin to load by name: " + name);
    let u = -1;
    // console.log("Turn: " + turns[turnI])

    let pokemonList = [];
    for (let i = 0; i < allPoke[turns[turnI][0]].length; i++)
        pokemonList.push(allPoke[turns[turnI][0]][i].name);

    let correctPokeName = bestMatch.bestMatch(name, pokemonList);
    // console.log(correctPokeName);
    for (let i = 0; i < allPoke[turns[turnI][0]].length; i++) {
        if (correctPokeName == allPoke[turns[turnI][0]][i].name) {
            let correctPokemonObj = allPoke[turns[turnI][0]][i];
            // console.log("Il tuo pokemon è")
            // console.log(correctPokemonObj);

            loadPokemonFromMiniature(turns[turnI][0], correctPokemonObj);
        }
    }

}



function findPokemonByUniqId(id) {
    // console.log("Ima lookin to load : " + id);
    let balala = id.split("-")[1][0];
    let u = -1;
    for (let i = 0; i < allPoke[balala].length; i++) {
        if (id == allPoke[balala][i].uniQueId) {
            u = i;
            break;
        }
    }
    // console.log("Il pokemon selezionato è :");
    // console.log(allPoke[balala][u]);
    loadPokemonFromMiniature(balala, allPoke[balala][u]);
}

function loadSide(side) {
    let s = side[0];
    let elm = document.querySelectorAll("." + side + "-m-i");
    let elmFather = document.querySelectorAll(".miniature." + s);
    let elmType = document.querySelectorAll(".type." + s);
    let elmName = document.querySelectorAll(".pokename." + s);

    // console.log(elm);
    for (let i = 0; i < 6; i++) {

        // ATTENZIONE! GLI ID VENGONO GENERATI TRAMITE LA CONCATENAZIONE DI:
        // nomepokemon-sideNumber
        // meltan-left0
        // Di conseguenza non possono esistere due pokemon con lo stesso id,
        // in quanto vorrebbe dire che hanno la stessa posizione.

        // elmFather[i].classList.add(allPoke[s][i].name);
        elmFather[i].onclick = function () {
            if (turns[turnI] == side)
                findPokemonByUniqId(allPoke[s][i].uniQueId);
            else {
                notify("danger", "Non è il tuo <strong>turno!</strong>", "top-" + side)
                console.log("Non è il tuo turno")
            }
        }
        elm[i].src = allPoke[s][i].image;
        color.setColorByObject(elmFather[i], allPoke[s][i]);

        elmName[i].innerText = capitalize(allPoke[s][i].name);
        elmType[i].innerText = allPoke[s][i].types;
    }
}

function loadMiniatures() {
    console.log("-Questi sono i pokemon salvati nel local storage-");
    allPoke = JSON.parse(localStorage.getItem("allPokemon"));
    console.log(allPoke);
    // elmnt = document.querySelectorAll(".miniatures");

    loadSide("right");
    loadSide("left");

    // elm = document.querySelectorAll(".left-m-i");
    // elmFather = document.querySelectorAll(".miniatures.l");
    // for(let i = 0; i<6;i++){
    //     elm[i].src = allPoke["l"][i].image;
    //     color.setColorByObject(elmFather[i], allPoke["l"][i]);
    // }



    // for (let i = 0; i < elmnt.length; i++) {
    //     let img = document.createElement("img");
    //     let nameEl = document.createElement("span");

    //     img.style.width = "90%%"
    //     img.style.height = "90%"
    //     if (i <= 5) {
    //         img.src = allPoke["r"][i].image;
    //         color.setColorByObject(elmnt[i], allPoke["r"][i]);
    //         nameEl.innerHTML = capitalize(allPoke["r"][i].name);
    //         elmnt[i].classList.add("r" + [i]);
    //     } else {
    //         img.src = allPoke["l"][i - 6].image;
    //         color.setColorByObject(elmnt[i], allPoke["l"][i - 6]);
    //         nameEl.innerHTML = capitalize(allPoke["l"][i - 6].name);
    //         elmnt[i].classList.add("l" + [i - 6]);
    //     }


    //     elmnt[i].appendChild(nameEl);
    //     nameEl.appendChild(img);
    // }
    //elmnt[0].backgroundImage = allPoke["l"][0].image;
    //console.log(elmnt.length);

    //color.setColor(pos, localPokemon);
}

export function findPokemon(pokeName) {
    findPokemonByName(pokeName);
    // let bestChoise = bestMatch.bestMatch(pokeName, pokeList[target]);
    // for (let i = 0; i < pokeList[target].length; i++) {
    //     if (bestChoise == allPoke[target[0]][i].name)
    //         loadPokemonFromMiniature(target, allPoke[target[0]][i]);
    // }
    // document.getElementById(target + 'Hp').style.visibility = "visible"; //rendo visibile la vita del pokemon
}

function randomPokemon(target) {
    loadPokemonFromMiniature(target, allPoke[target][Math.floor(Math.random() * 6)])
}

export function inCharge(side) {
    // console.log(inCharge());
    let s = side.toString().charAt(0);
    for (let i = 0; i < 6; i++) {
        // console.log(allPoke[s][i].name +" is "+allPoke[s][i].inCharge);
        if (allPoke[s][i].inCharge)
            return allPoke[s][i];
    }
}
export function whosInCharge(target) {
}
//     // console.log("whosInCharge |  All pokemons are:")
//     // console.log(allPoke);
//     // console.log(" + allPoke[target[0]][0] | ")
//     // console.log(allPoke[target[0]][0])
//     console.log("whosInCharge | Target is : " + target);

//     for (let i = 0; i < 6; i++) {
//         console.log(allPoke[target[0]][i].name +" is " + allPoke[target[0]][i].inCharge);
//         if (allPoke[target[0]][i].inCharge) {
//             console.error("Il pokemon in carica è : ")
//             console.error(allPoke[target[0]][i])
//             return allPoke[target[0]][i];
//         }
//         // return allPoke[target[0]][i]["name"];
//     }
// }

function listnersPos() {

    // document.getElementById(target + "ResetButton").onclick = function () {

    //     resetCard(target)
    // };
    document.getElementById("SubmitButton").onclick = function () {
        // findPokemon(document.getElementById(target + 'UserInput').value, target);
        let val = document.getElementById('UserInput').value;
        // console.log(val);
        if (val != "")
            findPokemonByName(val);
        else
            console.log("Il campo è vuoto!");
    };

    document.getElementById("RandomButton").onclick = function () {
        randomPokemon(turns[turnI][0]);
        //     // randomPokemon(target)
    };

    document.getElementById("Mic").onclick = function () {
        // TODO
        speech.start([turns[turnI]], allPoke[turns[turnI][0]])
        // speech.start(target, allPoke[target[0]])
    };

    document.getElementById("AttackButton").onclick = function () {
        // findPokemon(document.getElementById(target + 'UserInput').value, target);
        let val = document.getElementById('UserInput').value;
        // console.log(inCharge(turns[turnI]));
        if (val != "") {
            if (inCharge(turns[turnI]) != undefined) {
                console.log("Val.value=[" + val + "]");
                let pokemonInChargeMoves = inCharge(turns[turnI]).moves;
                let pokeMoves = [];
                for (let i = 0; i < pokemonInChargeMoves.length; i++) {
                    // fruits.push("Kiwi");
                    pokeMoves.push(pokemonInChargeMoves[i].name);
                }

                // console.log(pokemonInChargeMoves);
                let correctMove = bestMatch.bestMatch(val, pokeMoves);
                console.log(correctMove);
                // console.log(bestMatch.bestMatch( , ));
                // console.log("Attack");
                Moves().damage(correctMove, turns[turnI]);
            } else {

                notify("warning", "No pokemon!", "top-" + turns[turnI])
                console.warn("Non c'è alcun pokemon da su questo lato!");

            }
        }
        else {
            notify("warning", "Il campo è vuoto!", "top-" + turns[turnI])
            console.warn("Il campo è vuoto!");

        }
    };


    // for (let i = 0; i < elmnt.length; i++) {
    //     let indexToLoad = elmnt[i].classList[1];
    //     elmnt[i].onclick = function () {
    //         //console.log("DEVO CARICARE: " + allPoke[indexToLoad[0]][indexToLoad[1]])
    //         loadPokemonFromMiniature(indexToLoad[0], allPoke[indexToLoad[0]][indexToLoad[1]])
    //     }
    // }

    // for (let i = 0; i < 6; i++) {
    //     pokeList[target][i] = allPoke[target[0]][i].name;
    //     //console.log(allPoke[target[0]][i].name);
    // }
}

function loadTeamsNames() {
    //implementare la possibilità di riconoscere i colori nel nome della squadra per poi colorare il nome stesso
    let leftTeamName = localStorage.getItem("leftTeamName");
    let rightTeamName = localStorage.getItem("rightTeamName");

    document.getElementById("leftTeamName").innerText = leftTeamName;
    document.getElementById("rightTeamName").innerText = rightTeamName;
    color.teamsTheme(leftTeamName, "left");
    color.teamsTheme(rightTeamName, "right");
}

//--------------------loadTeamsNames---------------------------//


document.body.onload = function () {
    // turn = turns[0];
    // document.body.style.backgroundImage = "url(./img/backgrounds/background" + Math.floor(Math.random() * 30) + ".jpg)";
    loadMiniatures();
    listnersPos();
    // listnersPos("right");
    // loadBackgrounds();
    loadTeamsNames();
}

// let father = document.getElementById("settingsBar");


//--------------------loadBackgrounds---------------------------//

// function loadBackgrounds() {
//     //console.log()
//     for (let i = 0; i < howMutchBackgrounds; i++) {

//         let img = document.createElement("img");
//         img.src = "./img/backgrounds/background" + i + ".jpg"
//         img.className = "bgImage";
//         img.style.width = "95%";
//         img.style.margin = "10px";
//         img.onclick = function () {
//             document.body.style.backgroundImage = "url(" + img.src + ")";
//         };
//         father.appendChild(img);

//     }


// }

//--------------------loadBackgrounds---------------------------//


// let isSettingsBarVisible = false;


// function hideSettingsBar() {
    // father.style.display = "none";
    // isSettingsBarVisible = false;
// }

// function showSettingsBar() {
    // father.style.display = "block";
    // isSettingsBarVisible = true;
// }

// function settings() {
    // if (isSettingsBarVisible)
        // hideSettingsBar();
    // else
        // showSettingsBar();
// }

// document.getElementById("settings").onclick = function () {
    // settings();
// };



// function resetCard(pos) {
//     //document.getElementById(pos+"Card").style.visibility = "hidden";

//     document.getElementById(pos + '__card__name').innerHTML = "Pokemon name";
//     document.getElementById(pos + '_pokemon_attack').innerHTML = "???";
//     document.getElementById(pos + '-pokemon-hp').innerHTML = "???";
//     document.getElementById(pos + '_pokemon_defense').innerHTML = "???";
//     document.getElementById(pos + '_pokemon_special_attack').innerHTML = "???";
//     document.getElementById(pos + '_pokemon_special_defense').innerHTML = "???";
//     document.getElementById(pos + '_pokemon_speed').innerHTML = "???";
//     document.getElementById(pos + '_ability').innerHTML = "???";
//     document.getElementById(pos + '_hidden_ability').innerHTML = "???";
//     document.getElementById(pos + '_image').src = "img/question mark.png";
//     document.getElementById(pos + "_top").innerHTML = "???";
//     document.getElementById(pos + "__card__type").style.backgroundImage = "none";
//     document.getElementById(pos + "_top").style.backgroundImage = "none";
//     document.getElementById(pos + "Hp").style.visibility = "hidden";

//     document.getElementById(pos + "MovesDiv").style.display = "none";

//     document.getElementById(pos + "UserInput").value = "";


// }

// var srcJson = "https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json";
// var fullPokedex = "https://raw.githubusercontent.com/sindresorhus/pokemon/master/data/en.json";//TUTTI I POKEMON

//Trova il bestMatch secondo la lista contenente tutti i nomi dei pokemon
