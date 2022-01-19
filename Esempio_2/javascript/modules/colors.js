export let typesColor = {
    "types": {
        "normal": {
            "color_type": "#A8A77A",
            "card_linear_gradient": {
                "0": "#cbcaaf",
                "1": "#656449"
            }
        },
        "water": {
            "color_type": "#6390F0",
            "card_linear_gradient": {
                "0": "#a1bcf6",
                "1": "#3b5690"
            }
        },
        "electric": {
            "color_type": "#F7D02C",
            "card_linear_gradient": {
                "0": "#fae380",
                "1": "#947d1a"
            }
        },
        "fire": {
            "color_type": "#EE8130",
            "card_linear_gradient": {
                "0": "#f5b383",
                "1": "#8f4d1d"
            }
        },
        "psychic": {
            "color_type": "#F95587",
            "card_linear_gradient": {
                "0": "#fb99b7",
                "1": "#ff2cc3",
                "2": "#ffe3a7"
            }
        },
        "dark": {
            "color_type": "#705848",
            "card_linear_gradient": {
                "0": "#A29288",
                "1": "#49392F",
            }
        },
        "bug": {
            "color_type": "#6e7f0e",
            "card_linear_gradient": {
                "0": "#c4da3d",
                "1": "#6e7f0e",
                "2": "#275009"
            }
        },
        "ice": {
            "color_type": "#1BE3E3",
            "card_linear_gradient": {
                "0": "#ffffff",
                "1": "#1be3e3"
            }
        },
        "fairy": {
            "color_type": "#ff8a95",
            "card_linear_gradient": {
                "0": "#ffe6f0",
                "1": "#ffc5e0",
                "2": "#ffa6b9",
                "3": "#ff8a95"
            }
        },
        "grass": {
            "color_type": "#78C850",
            "card_linear_gradient": {
                "0": "#9dff62",
                "1": "#348007"
            }
        },
        "poison": {
            "color_type": "#a33ea1",
            "card_linear_gradient": {
                "0": "#c88bc7",
                "1": "#622561"
            }
        },
        "dragon": {
            "color_type": "#6F35FC",
            "card_linear_gradient": {
                "0": "#a986fd",
                "1": "#7d49fc",
                "2": "#6430e3",
                "3": "#432097"
            }
        },
        "ghost": {
            "color_type": "#735797",
            "card_linear_gradient": {
                "0": "#ab9ac1",
                "1": "#45345b"
            }
        },
        "fighting": {
            "color_type": "#C22E28",
            "card_linear_gradient": {
                "0": "#da827e",
                "1": "#741c18"
            }
        },
        "flying": {
            "color_type": "#A98FF3",
            "card_linear_gradient": {
                "0": "#cbbcf8",
                "1": "#655692"
            }
        },
        "ground": {
            "color_type": "#E2BF65",
            "card_linear_gradient": {
                "0": "#eed9a3",
                "1": "#88733d"
            }
        },
        "rock": {
            "color_type": "#B6A136",
            "card_linear_gradient": {
                "0": "#d3c786",
                "1": "#6d6120"
            }
        },
        "steel": {
            "color_type": "#B7B7CE",
            "card_linear_gradient": {
                "0": "#d4d4e2",
                "1": "#6e6e7c"
            }
        }
    }
};

let colors = [
    ["red", "rosso"],
    ["blue", "blu"],
    ["green", "verde"],
    ["black", "nero"],
    ["orange", "arancione"],
    ["brown", "marrone"],
    ["yellow", "giallo"],
    ["grey", "grigio"]
];

export function SetColor() {
    let typeZero, pokemonEl, typeZeroZero, typeOne, typeOneZero, pokemonTypeEl, color, ran, notification;

    function setColor(target, localPokemon) {
        // SELECTION:
        // pokemonEl = document.getElementById(target + "__card__type");
        // INDEX:
        pokemonEl = document.getElementById(target + "Pokemon"); // left0Pokemon
        pokemonTypeEl = document.getElementById(target + "_top");
        setColorByObject(pokemonEl, localPokemon);
        setColorByObject(pokemonTypeEl, localPokemon);
        pokemonTypeEl.style.border = "thick solid colorBorder";
        //style="filter: brightness(75%);"
        //notification = document.getElementById(target + "Notification");
        /*for (let i = 0; i < 4; i++) {
            let button = document.getElementById(target + i + "ButtonMoves");
        }*/
    }

    function setColorByObject(HTMLObject, localPokemon) {
        let colorBorder;
        let colorBorder1;
        ran = Math.floor(Math.random() * 181);
        typeZero = localPokemon.types[0];
        typeZeroZero = typesColor.types[typeZero].card_linear_gradient[0];
        if (localPokemon.types[1] != null) {
            typeOne = localPokemon.types[1];
            typeOneZero = typesColor.types[typeOne].card_linear_gradient[0];
        }

        //console.log(target + "\nTypeZero: " + typeZero + "\nTypeOne: " + typeOne);

        if (typeOne != undefined) {
            color = "linear-gradient(" + ran + "deg ," + typeZeroZero + "," + typeOneZero + ")";
            colorBorder = color.replace(typeZeroZero, typesColor.types[typeZero].card_linear_gradient[1]);
            colorBorder1=typesColor.types[typeZero].card_linear_gradient[1];
        } else {
            let typeZeroOne = typesColor.types[typeZero].card_linear_gradient[1];
            color = "linear-gradient(" + ran + "deg ," + typeZeroZero + "," + typeZeroOne + ")";
            colorBorder = color.replace(typeZeroZero, typesColor.types[typeZero].card_linear_gradient[0]);
            colorBorder1=typesColor.types[typeZero].card_linear_gradient[0];
        }

        HTMLObject.style.backgroundImage = color;
        let borderColor = "1px solid "+colorBorder1; 
        HTMLObject.style.border = borderColor;
        // function movesColor(pokemonObj) {
        //     if (pokemonObj.types[1] == null)
        //         document.getElementById("infoMoves").style.backgroundImage = "linear-gradient(" +
        //             typesColor.types[pokemonObj.types[0]].card_linear_gradient[0] + "," + typesColor.types[pokemonObj.types[0]].card_linear_gradient[1] + ")";
        //     else
        //         document.getElementById("infoMoves").style.backgroundImage = "linear-gradient(" +
        //             typesColor.types[pokemonObj.types[0]].card_linear_gradient[0] + "," + typesColor.types[pokemonObj.types[1]].card_linear_gradient[0] + ")";

    }

    function teamsTheme(teamName, target) {
        // console.log(teamName + " "+target);
        let index = 0;
        let nameArray = teamName.split(" ");
        // console.log(nameArray);
        for (let i = 0; i < colors.length; i++) {
            for (let j = 0; j < colors[i].length; j++) {
                for (let el = 0; el < nameArray.length; el++) {
                    // console.log(nameArray[el].toLowerCase());
                    if (nameArray[el].toLowerCase() == colors[i][j]) {

                        //COLORARE I BOTTONI E TUTTA L'AREA DEL COLORE RICHIESTO
                        colorButtons(colors[i][0], target);
                        //TODO implementare la possibilità di avere due colori nel nome e di conseguenza adeguare lo script in maniera che risponda in maniera adeguata
                    }

                }

                //  console.log(colors[i][j]);

            }
        }
        // console.log(teamName + " is the name of " + target)
    }

    function colorButtons(color, target) {
        console.warn(target + " deve diventare " + color);
        document.getElementById(target + "UserInput").style.backgroundColor = color;
        document.getElementById(target + "ResetButton").style.backgroundColor = color;
        document.getElementById(target + "Mic").style.backgroundColor = color;
        document.getElementById(target + "RandomButton").style.backgroundColor = color;
        document.getElementById(target + "SubmitButton").style.backgroundColor = color;


    }
    return {
        "setColor": setColor,
        "setColorByObject": setColorByObject,
        // "movesColor": movesColor,
        "teamsTheme": teamsTheme,
        "colorButtons": colorButtons
    }
}