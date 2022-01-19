import {
    BestMatch
} from '../modules/bestMatch.js';
let bestMatch = BestMatch();

import {
    InputData,
    capitalize
} from './Tmodules/inputData.js';
let inputData = InputData();

import {
    allPokemon
} from './Tmodules/inputData.js';

import {
    pokedex
} from './Tmodules/pokedex.js';

import {
    SetColor
} from '../modules/colors.js';
let setColor = SetColor();


// $(document).ready(function () {
// var inputValue = $("#leftNotificationText");
// var message6, $update6 = $('#leftNotification');
// $('#leftNotification').click(function () {
// message6 = $().message({
// $().message({
//     type: 'success',
//     html: "inputValue.val()",
//     position: 'bottom-left',
// });
// });
// });



//import { Load } from './Tmodules/pokedex.js'

//export let pokedex;
/* function Load() {
    function loadPokedex() {
        console.log("loadPokedex richiamato.")
        let xmlhttp = new XMLHttpRequest();
        let url = "https://raw.githubusercontent.com/sindresorhus/pokemon/master/data/en.json";
        xmlhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                pokedex = JSON.parse(this.responseText);
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }
    return {
        "loadPokedex": loadPokedex
    }
} */

// export var canI = true;


// function callRandomPokemonJustToTest(side) {
//     console.log("Calling random pokemon to test.");
//     for (let i = 0; i < 6; i++) {
//         randomPokemon(side, i);
//     }
// }

function removeAllAnimations(side) {
    for (let i = 0; i < 6; i++) {
        document.getElementById(side + i + "Pokemon").classList.remove("animated");
        // document.getElementById("right" + i + "Pokemon").classList.remove("animated");
    }
}

function animation(target, i) {
    removeAllAnimations(target);
    document.getElementById(target + i + "Pokemon").classList.add("animated");
}

let counterL = 0;
let counterR = 0;

let canI = true;

function can(pos, pokeName, isItRandom) {
    canI = true;
    allPokemon[pos[0]].forEach(pokemon => {
        // console.log("pokemon.name: "+pokemon.name)
        if (pokeName.toLowerCase() == pokemon.name.toLowerCase()) {
            console.error("Questo pokemon è già presente!");
            if (!isItRandom) {
                notify("warning", "<strong>OPS</strong>, hai chiamato un pokemon già presente!", "top-" + pos)
                if (pos == "left") {
                    if (counterL > 0)
                        counterL -= 1;
                    else
                        counterL = 5;
                    animation(pos, counterL)
                } else {
                    if (counterR > 0)
                        counterR -= 1;
                    else
                        counterR = 5;
                    animation(pos, counterR)
                }
            }

            canI = false;
        }
    });
    return canI;
}

document.body.onload = function () {
    // document.body.style.backgroundImage = "url(./img/backgrounds/background" + Math.floor(Math.random() * 30) + ".jpg)";

    document.getElementById('leftUserInput2').focus();
    listnersPos("left");
    listnersPos("right");

    function listnersPos(target) {
        // callRandomPokemonJustToTest(target);
        animation(target, 0);

        // document.getElementById(target + "TeamName").value = capitalize(target) + " team";
        for (let i = 0; i < 6; i++) {
            document.getElementById(target + i + "Pokemon").onclick = function () {
                // removeAllAnimations(target);
                // document.getElementById(target + i + "Pokemon").classList.add("animated");
                animation(target, i);
                console.log(target + i);
                if (target == "left")
                    counterL = i;
                if (target == "right")
                    counterR = i;
                document.getElementById(target + 'UserInput2').focus();
            };

            //inputData(target + i, "bulbasaur")
            //inputData(target + i, pokedex[Math.floor(Math.random() * pokedex.length + 1)]);
        }

        function submit(target) {



            if (target == "left") {
                let bm = bestMatch.bestMatch(document.getElementById(target + 'UserInput2').value, pokedex, target);
                if (can(target, bm, false))
                    inputData.inputData(target + counterL, bm);

            } else if (target == "right") {
                let bm = bestMatch.bestMatch(document.getElementById(target + 'UserInput2').value, pokedex, target);
                if (can(target, bm, false))
                    inputData.inputData(target + counterR, bm);
            }

            document.getElementById(target + 'UserInput2').value = "";


            if (target == "left") {
                if (counterL == 5) {
                    counterL = 0;
                    animation(target, counterL);
                } else {
                    counterL = counterL + 1;
                    animation(target, counterL);
                }
            }
            if (target == "right") {
                if (counterR == 5) {
                    counterR = 0;
                    animation(target, counterR);
                } else {
                    counterR++;
                    animation(target, counterR);
                }
            }
            //console.log("NOW TURN IS:" + target + counter)
        }
        document.getElementById(target + "SubmitButton2").onclick = function () {
            submit(target)
        };

        document.getElementById(target + 'UserInput2').addEventListener('keydown', (e) => {
            if (e.key == "Enter")
                submit(target);
        });

        // function sleep(microseconds) {
        //     var request = new XMLHttpRequest();
        //     request.open("GET", "sleep.php?time=" + microseconds, false);
        //     request.send();
        // }


        // document.getElementById(target + "RandomButton6").onclick = function () {
        //     for (let i = 0; i < 6; i++) {
        //         setTimeout(randomPokemon(target), 2000);
        //     }
        // }
        // for (let i = 0; i < 6; i++) {
        //     if (target == "left") {
        //         randomPokemon(target, counterL);

        //     }
        //     if (target == "right") {
        //         randomPokemon(target, counterR);

        //     }

        //     // Incrementa l'index
        //     if (target == "left") {
        //         if (counterL == 5) {
        //             counterL = 0;

        //         } else {
        //             counterL = counterL + 1;
        //         }
        //         animation(target, counterL);
        //     }
        //     if (target == "right") {
        //         if (counterR == 5) {
        //             counterR = 0;

        //         } else {
        //             counterR++;
        //         }
        //         animation(target, counterR);
        //     }
        // }


        document.getElementById(target + "RandomButton").onclick = function () {
            randomPokemon(target);
        };

        document.getElementById(target + "Pronto").onclick = function () {
            console.log(target + "Pronto!");
            if (target == "left")

                for (let i = 0; i < 6; i++) {

                    document.getElementById(target + i + '__card__name').innerHTML = "Pronto";
                    document.getElementById(target + i + '_top').innerHTML = "?";
                    document.getElementById(target + i + '_top').style = "";
                    document.getElementById(target + i + '_image').src = "img/question mark.png";
                    document.getElementById(target + i + '__card__type').style = "";

                }


            if (target == "right")

                for (let i = 0; i < 6; i++) {
                    document.getElementById(target + i + '__card__name').innerHTML = "Pronto";
                    document.getElementById(target + i + '_top').innerHTML = "?";
                    document.getElementById(target + i + '_top').style = "";
                    document.getElementById(target + i + '_image').src = "img/question mark.png";
                    document.getElementById(target + i + '__card__type').style = "";
                }
        };

    }
    document.getElementById("fightButton").onclick = function () {
        console.log("FightButtonClicked!");
        let control = [true, true];
        for (let i = 0; i < 5; i++) {
            if (allPokemon["r"][i] == undefined) control[0] = false;
            if (allPokemon["l"][i] == undefined) control[1] = false;
        }
        if (control[0] && control[1]) {
            // console.log("Tutte le squadre sono piene")
            // console.log(allPokemon)
            //localStorage.setItem('myCat', 'Tom');
            localStorage.setItem("leftTeamName", document.getElementById("leftTeamName").value);
            localStorage.setItem("rightTeamName", document.getElementById("rightTeamName").value);
            localStorage.setItem("allPokemon", JSON.stringify(allPokemon));
            window.open("fight.html", "_self");
        } else {
            if (!control[0])
                notify("danger", "La squadra non è al completo.", "top-right")
            if (!control[1])
                notify("danger", "La squadra non è al completo.", "top-left")
            console.error("Niente da fare, non ci siamo ancora amici.")
        }
    }


}

//-------------------Get Pokemon--------------------------//

// export function getPokemon(target) {

//     for (var i = 0; i < 6; i++) {
//         switch (target) {

//             case 'left':
//                 leftSquad[i].name = localStorage.getItem(((target + i) + "__card__name"));
//                 console.log(leftSquad[i].name);
//                 break

//             case 'right':
//                 rightSquad[i].name = localStorage.getItem(((target + i) + "__card__name"));
//                 console.log(rightSquad[i].name);
//                 break;
//         }
//     }
// }

//-------------------Get Pokemon--------------------------//

//-------------------Random Pokemon--------------------------//

function randomN(max) {
    return pokedex[Math.floor(Math.random() * max + 1)];

}
function randomPokemon(target) {

    let counter;

    if (target == "left") {
        counter = counterL;
        if (counterL == 5) {
            counterL = 0;

        } else {
            counterL = counterL + 1;
        }
        animation(target, counterL);
    } else
        if (target == "right") {
            counter = counterR;
            if (counterR == 5) {
                counterR = 0;

            } else {
                counterR++;
            }
            animation(target, counterR);
        }
    //console.log("NOW TURN IS:" + target + counter)


    let bm = randomN(pokedex.length);
    // let bm = randomN(8);
    let i = 0;
    while (!can(target, bm, true)) {
        // console.log(i)
        bm = randomN(8);

        // PER EVITARE LOOP INFINITI:
        i++;
        if (i == 100)
            break;
    }
    inputData.inputData(target + counter, bm);
}