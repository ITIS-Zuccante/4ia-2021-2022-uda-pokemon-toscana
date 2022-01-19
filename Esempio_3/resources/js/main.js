import { recording } from "./speech.js";
import { bestMatch } from './bestMatch.js';
import { updateHealthBar } from "./battle.js";

/**
* Questo metodo, il quale viene invocato quando la pagina index è caricata,
* imposta un placeholder dinamico ai due input presenti.
*/
(() => {
  let pokemons = JSON.parse(window.localStorage.getItem("_TEAMS")).teamAlfa.pokemons.concat(JSON.parse(window.localStorage.getItem("_TEAMS")).teamBeta.pokemons)
  document.getElementById('form-selector-speech-input').setAttribute('placeholder', 'Choose a pokèmon! Ex: ' + pokemons[Math.floor((pokemons.length) * Math.random())].name);
})();

/**
 * 
 * @param {*} target 
 * @param {*} pokemonName 
 */
export async function getPokemon(target, pokemonName) { //per pokedex
  if (pokemonName == null) {
    resetCard(target);
    pokemonName = document.getElementById('form-selector-speech-input').value.toLowerCase();
    pokemonName = await bestMatch(pokemonName);
  } else {
    resetCard(target);
  }

  let jsonObject;
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = async function () {
    if (this.readyState == 4 && this.status == 404) { //pokemon not found
      let xmlHttp = new XMLHttpRequest();
      xmlHttp.open("GET", "https://pokeapi.co/api/v2/pokemon/" + pokemonName, true);
      xmlHttp.send();
      xmlHttp.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
          jsonObject = JSON.parse(this.responseText);
          changeHtml(target, jsonObject, false);
        } else {
          window.alert("Pokemon not found, try again!");
        }
      }
    } else if (this.readyState == 4 && this.status == 200) {
      jsonObject = JSON.parse(this.responseText);
      changeHtml(target, jsonObject, false);
    }
  };
  xhttp.open("GET", "https://pokeapi.co/api/v2/pokemon/" + pokemonName, true);
  xhttp.send();
}

export async function getGigantaMax(target, name) {
  let pokemonName;
  if (name == null) {
    pokemonName = document.getElementById('form-selector-speech-input').value.toLowerCase();
    pokemonName = await bestMatch(pokemonName);
  } else {
    pokemonName = name;
  }
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonName);
  if (response.ok) {
    let jsonmega = await response.json();
    changeHtml(target, jsonmega, true);
  } else {
    console.log('Error: giga error');
  }
}

async function getJsonObject(url) {
  const response = await fetch(url);
  if (response.ok) {
    let jsonObject = await response.json();
    return jsonObject;
  } else {
    console.log('Error: jsonObject error');
  }
}

function pad_with_zeroes(number, length) {
  var my_string = '' + number;
  while (my_string.length < length) {
    my_string = '0' + my_string;
  }
  return my_string;
}

function hasGigantaMax(pokemonName) {
  for (var i = 0; i < evolutions.length; i++) {
    if (pokemonName === evolutions[i][0]) {
      if (evolutions[i].length == 2) {
        return evolutions[i][1];
      } else {
        return evolutions[i][1] + "," + evolutions[i][2];
      }
    }
  }
  return "hasGigantaMax";
}

function getGender(pokemonName) {
  for (var i = 0; i < gender.length; i++) {
    if (pokemonName === gender[i][0]) {
      return gender[i][1];
    }
  }
}

function getPokedexGender(pokemonName) {
  for (var i = 0; i < gender.length; i++) {
    if (pokemonName === gender[i][0]) {
      if (gender[i][1] === "fm") {
        let genres = ["md", "fd"];
        return genres[getRandomIntInclusive(0, 1)];
      } else {
        return gender[i][1];
      }
    }
  }
  return "mf";
}

function changeHtml(target, jsonObject, giga) {
  document.getElementById(target + '-card').setAttribute('pokemonName', jsonObject.forms[0].name);

  let evoluzioni = hasGigantaMax(jsonObject.forms[0].name);
  document.getElementById(target + '-button-giga').setAttribute('style', 'visibility: hidden;');
  if (evoluzioni.split(",").length === 1) {
    if (evoluzioni !== undefined && evoluzioni.split(",")[0] === "me") {
      document.getElementById(target + '-button-giga').setAttribute('style', 'visibility: hidden;');
    } else if (evoluzioni.split(",")[0] === "gm") {
      document.getElementById(target + '-button-giga').setAttribute('style', 'visibility: visible; margin-left:40px;');

    }
  } else if (evoluzioni.split(",").length === 2) {
    document.getElementById(target + '-button-giga').setAttribute('style', 'visibility: visible; margin-left:40px;');
  }

  let shiny;
  let jsonTeam = JSON.parse(window.localStorage.getItem("_TEAMS"));

  if (target == "left") {
    for (let i = 0; i < jsonTeam.teamAlfa.pokemons.length; i++) {
      if (jsonTeam.teamAlfa.pokemons[i].name == jsonObject.forms[0].name) {
        shiny = jsonTeam.teamAlfa.pokemons[i].shiny;
      }
    }
  } else {
    for (let i = 0; i < jsonTeam.teamBeta.pokemons.length; i++) {
      if (jsonTeam.teamBeta.pokemons[i].name == jsonObject.forms[0].name) {
        shiny = jsonTeam.teamBeta.pokemons[i].shiny;
      }
    }
  }
  let genderfigure = "";

  if (giga) {
    document.getElementById(target + '-card-img').src = "https://projectpokemon.org/images/sprites-models/homeimg/poke_capture_" + pad_with_zeroes(jsonObject.id, 4) + "_" + "000" + "_" + "mf" + "_" + "g" + "_" + "00000000" + "_f_" + shiny + ".png";
    if (getGender(jsonObject.forms[0].name) == "fm") {
      let gender = ["fd", "md"];
      let pokemongender = gender[getRandomIntInclusive(0, 1)];
      if (pokemongender == "fd") {
        genderfigure = "<img class='gender_images' src='resources/img/female-image.png' draggable='false' title='Female'>";
      } else {
        genderfigure = "<img class='gender_images' src='resources/img/male-image.png' draggable='false' title='Male'>";
      }
    } else if (getGender(jsonObject.forms[0].name) == "mo") {
      genderfigure = "<img class='gender_images' src='resources/img/male-image.png' draggable='false' title='Male'>";
    } else if (getGender(jsonObject.forms[0].name) == "fo") {
      genderfigure = "<img class='gender_images' src='resources/img/female-image.png' draggable='false' title='Female'>";
    } else if (getGender(jsonObject.forms[0].name) == "fd") {
      genderfigure = "<img class='gender_images' src='resources/img/female-image.png' draggable='false' title='Female'>";
    }
  } else if (getGender(jsonObject.forms[0].name) == "fm") {
    let gender = ["fd", "md"];
    let pokemongender = gender[getRandomIntInclusive(0, 1)];
    if (pokemongender == "fd") {
      genderfigure = "<img class='gender_images' src='resources/img/female-image.png' draggable='false' title='Female'>";
    } else {
      genderfigure = "<img class='gender_images' src='resources/img/male-image.png' draggable='false' title='Male'>";
    }
    document.getElementById(target + '-card-img').src = "https://projectpokemon.org/images/sprites-models/homeimg/poke_capture_" + pad_with_zeroes(jsonObject.id, 4) + "_" + "000" + "_" + pokemongender + "_" + "n" + "_" + "00000000" + "_f_" + shiny + ".png"; //forme sesso formaattuale formaboh shiny
  } else if (getGender(jsonObject.forms[0].name) == "uk") {
    document.getElementById(target + '-card-img').src = "https://projectpokemon.org/images/sprites-models/homeimg/poke_capture_" + pad_with_zeroes(jsonObject.id, 4) + "_" + "000" + "_" + "uk" + "_" + "n" + "_" + "00000000" + "_f_" + shiny + ".png"; //forme sesso formaattuale formaboh shiny
  } else if (getGender(jsonObject.forms[0].name) == "mo") {
    genderfigure = "<img class='gender_images' src='resources/img/male-image.png' draggable='false' title='Male'>";
    document.getElementById(target + '-card-img').src = "https://projectpokemon.org/images/sprites-models/homeimg/poke_capture_" + pad_with_zeroes(jsonObject.id, 4) + "_" + "000" + "_" + "mo" + "_" + "n" + "_" + "00000000" + "_f_" + shiny + ".png"; //forme sesso formaattuale formaboh shiny
  } else if (getGender(jsonObject.forms[0].name) == "fo") {
    genderfigure = "<img class='gender_images' src='resources/img/female-image.png' draggable='false' title='Female'>";
    document.getElementById(target + '-card-img').src = "https://projectpokemon.org/images/sprites-models/homeimg/poke_capture_" + pad_with_zeroes(jsonObject.id, 4) + "_" + "000" + "_" + "fo" + "_" + "n" + "_" + "00000000" + "_f_" + shiny + ".png"; //forme sesso formaattuale formaboh shiny
  } else if (getGender(jsonObject.forms[0].name) == "fd") {
    genderfigure = "<img class='gender_images' src='resources/img/female-image.png' draggable='false' title='Female'>";
    document.getElementById(target + '-card-img').src = "https://projectpokemon.org/images/sprites-models/homeimg/poke_capture_" + pad_with_zeroes(jsonObject.id, 4) + "_" + "000" + "_" + "fd" + "_" + "n" + "_" + "00000000" + "_f_" + shiny + ".png"; //torchic dava problemi // TODO
  } else {
    document.getElementById(target + '-card-img').src = "https://projectpokemon.org/images/sprites-models/homeimg/poke_capture_" + pad_with_zeroes(jsonObject.id, 4) + "_" + "000" + "_" + "mf" + "_" + "n" + "_" + "00000000" + "_f_" + shiny + ".png"; //forme sesso formaattuale formaboh shiny
  }

  document.getElementById(target + '-card-img').alt = jsonObject.forms[0].name;
  document.getElementById(target + '-card-img').title = jsonObject.forms[0].name.charAt(0).toUpperCase() + jsonObject.forms[0].name.slice(1);
  document.getElementById(target + '-card-img').height = "150";
  document.getElementById(target + '-card-img').width = "150";
  document.getElementById(target + '-card-img').setAttribute('style', 'padding-bottom: 15px;');

  if (jsonObject.types.length == 1) {
    document.getElementById(target + '-top').innerHTML = jsonObject.types[0].type.name;
    document.getElementById(target + '-card').setAttribute('first-type', jsonObject.types[0].type.name);
    document.getElementById(target + '-top').setAttribute("first-type", jsonObject.types[0].type.name);
  } else {
    document.getElementById(target + '-top').innerHTML = "<span id='" + target + "-left-type'>" + jsonObject.types[1].type.name + "</span> <span id='" + target + "-right-type'>" + jsonObject.types[0].type.name + "</span>";
    document.getElementById(target + '-card').setAttribute('first-type', jsonObject.types[1].type.name);
    document.getElementById(target + '-top').setAttribute("first-type", jsonObject.types[1].type.name);
    document.getElementById(target + '-card').setAttribute('second-type', jsonObject.types[0].type.name);
    document.getElementById(target + '-top').setAttribute("second-type", jsonObject.types[0].type.name);
  }

  if (shiny == "r") {
    document.getElementById(target + '-shinystar').setAttribute("style", "visibility: visible");
  } else {
    document.getElementById(target + '-shinystar').setAttribute("style", "visibility: hidden");
  }
  /**/
  document.getElementById(target + '-card-name').innerHTML = jsonObject.forms[0].name.charAt(0).toUpperCase() + jsonObject.forms[0].name.slice(1) + genderfigure;
  document.getElementById(target + '-pokemon-attack').innerHTML = jsonObject.stats[1].base_stat;
  document.getElementById(target + '-pokemon-hp').innerHTML = jsonObject.stats[0].base_stat;

  document.getElementById(target + '-healthbar-health').setAttribute('initial-health', jsonObject.stats[0].base_stat);
  document.getElementById(target + '-healthbar-health').setAttribute('health', jsonObject.stats[0].base_stat);

  if (target == "left") {
    for (let i = 0; i < jsonTeam.teamAlfa.pokemons.length; i++) {
      if (jsonTeam.teamAlfa.pokemons[i].name == jsonObject.forms[0].name) {
        updateHealthBar(target, jsonObject.stats[0].base_stat - jsonTeam.teamAlfa.pokemons[i].stats.health);
      }
    }
  } else {
    for (let i = 0; i < jsonTeam.teamBeta.pokemons.length; i++) {
      if (jsonTeam.teamBeta.pokemons[i].name == jsonObject.forms[0].name) {
        updateHealthBar(target, jsonObject.stats[0].base_stat - jsonTeam.teamBeta.pokemons[i].stats.health);
      }
    }
  }

  document.getElementById(target + '-pokemon-defense').innerHTML = jsonObject.stats[2].base_stat;
  document.getElementById(target + '-pokemon-special-attack').innerHTML = jsonObject.stats[3].base_stat;
  document.getElementById(target + '-pokemon-special-defense').innerHTML = jsonObject.stats[4].base_stat;
  document.getElementById(target + '-pokemon-speed').innerHTML = jsonObject.stats[5].base_stat;
  if (jsonObject.abilities.length == 2) {
    document.getElementById(target + '-card-label-hidden').style = "visibility:visible";
    document.getElementById(target + '-hidden-ability').style = "visibility:visible";
    document.getElementById(target + '-hidden-ability').innerHTML = jsonObject.abilities[0].ability.name.charAt(0).toUpperCase() + jsonObject.abilities[0].ability.name.slice(1).replace("-", " ");
    document.getElementById(target + '-ability').innerHTML = jsonObject.abilities[1].ability.name.charAt(0).toUpperCase() + jsonObject.abilities[1].ability.name.slice(1).replace("-", " ");
  } else {
    document.getElementById(target + '-card-label-hidden').setAttribute('style', 'visibility:hidden');
    document.getElementById(target + '-hidden-ability').setAttribute('style', 'visibility:hidden');
    document.getElementById(target + '-ability').innerHTML = jsonObject.abilities[0].ability.name.charAt(0).toUpperCase() + jsonObject.abilities[0].ability.name.slice(1).replace("-", " ");
  }

  //impost l'animazione alla carta
  document.getElementById(target + '-card-img').setAttribute('class', 'card-image bounceIn');
  //imposto le mosse del pokemon
  let buttons = document.getElementsByClassName(target + '-move-button');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].innerHTML = jsonObject.moves[i].move.name;
  }
  //rendo visibile la seconda pagina, le frecce e i pallini
  let slides = document.getElementsByClassName(target + '-slide');
  for (var i = 0; i < slides.length; i++) {
    slides[i].setAttribute('style', '');
  }
  setColor(target);
}

/**
* Questa funzione viene invocata quando viene caricato un nuovo pokemon ed ha il compito
* di impostare i colori della carta.
*/
function setColor(target) {
  let random = getRandomIntInclusive(10, 200);
  if (document.getElementById(target + '-top').getAttribute('second-type') != "") {
    document.getElementById(target + '-left-type').setAttribute('style', 'background-color: ' + typesColor.types[document.getElementById(target + '-top').getAttribute('first-type')].color_type);
    document.getElementById(target + '-right-type').setAttribute('style', 'background-color: ' + typesColor.types[document.getElementById(target + '-top').getAttribute('second-type')].color_type);
    document.getElementById(target + '-top').setAttribute("style", '');
    document.getElementById(target + '-card').setAttribute('style', 'background: linear-gradient(' + random + 'deg, ' + typesColor.types[document.getElementById(target + '-top').getAttribute('first-type')].color_type + ' 0%, ' + typesColor.types[document.getElementById(target + '-top').getAttribute('second-type')].color_type + ' 100%);');
  } else {
    //1 tipo
    document.getElementById(target + '-top').setAttribute("style", '');
    document.getElementById(target + '-top').setAttribute('style', 'background-color: ' + typesColor.types[document.getElementById(target + '-top').getAttribute('first-type')].color_type + "; padding: 4px;");
    document.getElementById(target + '-card').setAttribute('style', 'background: linear-gradient(' + random + 'deg, ' + typesColor.types[document.getElementById(target + '-top').getAttribute('first-type')].card_linear_gradient[0] + ' 0%, ' + typesColor.types[document.getElementById(target + '-top').getAttribute('first-type')].card_linear_gradient[1] + ' 100%);');
  }
}

/**
* Questo metodo viene utilizzato per riprisinare la card selezionata.
*/
function resetCard(target) {
  //reset basic informations
  $('#' + target + '-deathx').css("visibility", "hidden");
  document.getElementById(target + '-card-name').innerHTML = '???';
  document.getElementById(target + '-pokemon-attack').innerHTML = '?';
  document.getElementById(target + '-pokemon-hp').innerHTML = '?';
  document.getElementById(target + '-pokemon-defense').innerHTML = '?';
  document.getElementById(target + '-pokemon-special-attack').innerHTML = '?';
  document.getElementById(target + '-pokemon-special-defense').innerHTML = '?';
  document.getElementById(target + '-pokemon-speed').innerHTML = '?';
  document.getElementById(target + '-top').innerHTML = '???';
  document.getElementById(target + '-hidden-ability').innerHTML = '???';
  document.getElementById(target + '-ability').innerHTML = '???';
  //reset image
  document.getElementById(target + '-card-img').alt = '???';
  document.getElementById(target + '-card-img').title = '???';
  document.getElementById(target + '-card-img').src = "../resources/img/question-mark.png";
  document.getElementById(target + '-card-img').height = "130";
  document.getElementById(target + '-card-img').width = "130";
  document.getElementById(target + '-card-img').setAttribute('style', 'padding-bottom: 20px;');
  document.getElementById(target + '-card-label-hidden').style = "visibility:visible";
  document.getElementById(target + '-hidden-ability').style = "visibility:visible";
  //reset colors and types
  document.getElementById(target + '-card').setAttribute('first-type', '');
  document.getElementById(target + '-card').setAttribute('second-type', '');
  document.getElementById(target + '-top').setAttribute("first-type", '');
  document.getElementById(target + '-top').setAttribute("second-type", '');
  document.getElementById(target + '-top').setAttribute("style", 'padding: 4px; background-color: #ddd;');

  document.getElementById(target + '-card-img').setAttribute('class', 'card-image');
  document.getElementById('form-selector-speech-input').value = null;
  document.getElementById(target + '-healthbar-health').style.display = "none";

}


/**
 * 
 */
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


/************************** EVENT LISTENERS **************************/
document.querySelector("body").addEventListener("load", function () { loadInputText(); });
document.querySelector("#left-button-giga").addEventListener("click", function () { getGigantaMax("left"); });
//document.querySelector("#left-button-mega").addEventListener("click", function () { getMega("left"); });
document.querySelector("#right-button-giga").addEventListener("click", function () { getGigantaMax("right"); });
//document.querySelector("#right-button-mega").addEventListener("click", function () { getMega("right"); });

document.querySelector("#form-speech-input-mic").addEventListener("click", function () { recording(); });


/**
 * Funzione che implementa il caricamento del pokemon a sinistra quando viene premuto il tasto invio nel form di scrittura
 */
document.getElementById("form-selector-speech-input").addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    getPokemon("left");
    getPokemon("right")
  }
});