import { SetColor } from '../../modules/colors.js';
let color = SetColor(); // assomiglia ad una new di Java

// import { canI } from '../selection.js'

var localPokemon = {};
let kappaConLaK = 0;


//let pokemonnameprova = "";

// var uniqueNumbersArray = [];
// while (uniqueNumbersArray.length < 6) {
//     var r = Math.floor(Math.random() * 100) + 1;
//     if (uniqueNumbersArray.indexOf(r) === -1) uniqueNumbersArray.push(r);
// }
// console.log(uniqueNumbersArray);

export let allPokemon = {};
allPokemon["l"] = [];
allPokemon["r"] = [];
export function InputData() {
    function inputData(pos, pokeName) {
        // pos == "left" / "right"
        // pos[0] == "r" / "l"


        // if (pos[0]=="l"){
        //     console.log(allPokemon);
        //     console.log("funziona la sinistra");

        // }else
        // if (pos[0]=="r"){
        //     console.log(allPokemon);
        //     console.log("funziona la destra");
        // }

        //console.error("Pokemon già presente");

        // console.log("inputData:");
        // console.log("pos:"+pos);
        // console.log("pokeName:"+pokeName);

        // console.error(pokeName);
        // if (pokeName == whosInCharge(pos)) {
        //     console.error("già in carica");
        //     pokeName = "";

        // }

        //console.log("INPUT")
        //console.log(pokeName+" has been invo ked at "+ pos)

        // console.log(allPokemon[pos[0]].length);

        // if (canI) {
        let xmlhttp = new XMLHttpRequest();

        pokeName = pokeName.replace(" ", "-")
        pokeName = pokeName.replace(".", "")
        pokeName = pokeName.replace("’", "")

        let url = "https://pokeapi.co/api/v2/pokemon/" + pokeName.toLowerCase();
        //console.log(url);
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                //var myArr = JSON.parse(this.responseText);
                let pokemon = JSON.parse(this.responseText);

                localPokemon.uniQueId = pokemon.name + "-" + pos;
                // console.log("uniQueId: " + localPokemon.uniQueId);

                localPokemon.id = pokemon.id;
                localPokemon.name = pokemon.name;
                localPokemon.base_attack_stats = pokemon.stats[4].base_stat;
                localPokemon.hp_modify = pokemon.stats[5].base_stat;
                localPokemon.hp = pokemon.stats[5].base_stat;
                // console.log(localPokemon.hp);
                localPokemon.base_defence = pokemon.stats[3].base_stat;
                localPokemon.special_attack = pokemon.stats[2].base_stat;
                localPokemon.special_defence = pokemon.stats[1].base_stat;
                localPokemon.speed = pokemon.stats[0].base_stat;
                localPokemon.abilities = [];
                localPokemon.abilities[0] = pokemon.abilities[0].ability.name;
                if (pokemon.abilities[1] != undefined) localPokemon.abilities[1] = pokemon.abilities[1].ability.name;
                localPokemon.types = [];
                localPokemon.types[0] = pokemon.types[0].type.name;
                if (pokemon.types[1] != undefined) localPokemon.types[1] = pokemon.types[1].type.name;
                localPokemon.moves = [];
                localPokemon.inCharge = false;

                for (let i = 0; i < pokemon.moves.length; i++) {
                    localPokemon.moves[i] = {};
                    localPokemon.moves[i].name = pokemon.moves[i].move.name; //gli id che sono assegnati all'interno dell'oggetto corrispondono a quelli di riferimento nel pokeapi.
                    localPokemon.moves[i] = pokemon.moves[i].move;
                    //localPokemon.moves[i].url = pokemon.moves[i].move.url;
                }


                document.getElementById(pos + '__card__name').innerHTML = capitalize(localPokemon.name);

                //console.log("pos: " + pos)

                /*
                pokemonnameprova = document.getElementById(pos + '__card__name').innerHTML;
                console.log(pokemonnameprova + "  è stato aggiunto");
 
                
                for (let i = 0; i < 6; i++) { //appena ho i nomi dei pokèmon li aggiungo al local storage left e right
                    leftSquad[i].name = pokemonnameprova;
                    localStorage.setItem((pos + "__card__name"), pokemonnameprova);
                    rightSquad[i].name = pokemonnameprova;
                    localStorage.setItem((pos + "__card__name"), pokemonnameprova);}*/

                //console.log(pokemon.sprites.front_default);

                localPokemon.image = pokemon.sprites.front_default;
                document.getElementById(pos + '_image').src = localPokemon.image; //NB: l'immagine non viene inclusa nell'oggetto pokemon.

                //per quelli ad un tipo
                if (localPokemon.types[1] == null) {
                    document.getElementById(pos + "_top").innerHTML = localPokemon.types[0];
                    //document.getElementById(pos + "_top2").innerHTML = "";
                } else {
                    document.getElementById(pos + "_top").innerHTML = localPokemon.types[0] + "/" + localPokemon.types[1];
                    //document.getElementById(pos + "_top2").innerHTML = localPokemon.types[1];
                }

                color.setColor(pos, localPokemon);
                //pokemonTypeEl.style.border = "localPokemon.types[1]";
                //console.log(pokemonTypeEl);
                //document.getElementById(pos + "Card").style.visibility = "visible";

                document.getElementById(pos + 'footer').style.visibility = "visible !important";

                //document.getElementById(pos + "UserInput").style.display = "visible";
                //document.getElementById(pos + "RandomButton").style.display = "visible";

                if (document.getElementById(pos + "UserInputautocomplete-list")) document.getElementById(pos + "UserInputautocomplete-list").style.display = "none";


                allPokemon[pos[0]][pos[pos.length - 1]] = Object.assign({}, localPokemon);

                //console.log(allPokemon);

                let posNoNumer = pos.substr(0, pos.length - 1);
                // console.log("Pos is:" + posNoNumer)

                notify("info", "Hai chiamato <strong>" + capitalize(localPokemon.name) + "</strong>", "top-" + posNoNumer);

            }; //fine IF

        }

        xmlhttp.open("GET", url, true);
        xmlhttp.send();


        // }
        // QUA

    }

    return {
        "inputData": inputData

    }
}

export function capitalize(str) {
    str = str.split(" ");

    for (var i = 0, x = str.length; i < x; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

    return str.join(" ");
}

function buttons(localPokemon) {
    for (let i = 0; i < 4; i++) {
        let ran;
        do {
            ran = Math.floor(Math.random() * localPokemon.moves.length);
        } while (localPokemon.moves[ran].isButton)
        localPokemon.moves[ran].isButton = true;
    }
}

function removeButtons(pokemonObj) {
    for (let i = 0; i < pokemonObj.moves.length; i++) {
        pokemonObj.moves[i].isButton = false;
    }
}