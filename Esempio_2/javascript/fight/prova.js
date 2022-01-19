import {
  Automaton
} from '../modules/automaton.js';
let automaton = Automaton();
let _TEAMS;
let _MOVE_TYPE;
let finish = true;

let leftMoveType = "";
let rightMoveType = "";
export function modifyleftMoveType(value) { leftMoveType = value; };
export function modifyrightMoveType(value) { rightMoveType = value; };

export let _BATTLE = {
  round: 0,
  actions: {
    teamAlfa: "",
    teamBeta: ""
  }
};

export function inCharge(side) {
  console.log(inCharge);
  let s = side.toString().charAt(0);
  for (let i = 0; i < 6; i++) {
    // console.log(allPoke[s][i].name +" is "+allPoke[s][i].inCharge);
    if (allPoke[s][i].inCharge)
      return allPoke[s][i];
  }
}

export function whosInCharge(target) {
}

(() => {
  window.localStorage.setItem("round", "true");

  _TEAMS = {
    teamAlfa: {
      teamName: JSON.parse(window.localStorage.getItem('leftTeamName')).teamAlfa,
      pokemons: JSON.parse(window.localStorage.getItem(JSON.parse(window.localStorage.getItem('leftTeamName')).teamAlfa)).pokemons,
      normal: 3,
      super: 2,
      hyper: 1
    },
    teamBeta: {
      teamName: JSON.parse(window.localStorage.getItem('rightTeamName')).teamBeta,
      pokemons: JSON.parse(window.localStorage.getItem(JSON.parse(window.localStorage.getItem('rightTeamName')).teamBeta)).pokemons,
      normal: 3,
      super: 2,
      hyper: 1
    }
  };


  for (let i = 0; i < _TEAMS.teamAlfa.pokemons.length; i++) {
    fetch("https://pokeapi.co/api/v2/pokemon/" + _TEAMS.teamAlfa.pokemons[i].name).then(response => response.json()).then(data => {
      _TEAMS.teamAlfa.pokemons[i].stats = {
        id: data.id,
        health: data.stats[0].base_stat,
        moves: data.moves,
        stats: data.stats,
        types: data.types,
        weight: data.weight
      };
      //console.log(_TEAMS.teamAlfa);
      setSprite("left", _TEAMS.teamAlfa.pokemons[i].stats.id, _TEAMS.teamAlfa.pokemons[i].shiny, _TEAMS.teamAlfa.pokemons[i].gender, i);
    });
  }

  for (let i = 0; i < _TEAMS.teamBeta.pokemons.length; i++) {
    fetch("https://pokeapi.co/api/v2/pokemon/" + _TEAMS.teamBeta.pokemons[i].name).then(response => response.json()).then(data => {
      _TEAMS.teamBeta.pokemons[i].stats = {
        id: data.id,
        health: data.stats[0].base_stat,
        moves: data.moves,
        stats: data.stats,
        types: data.types,
        weight: data.weight,
      };
      //console.log(_TEAMS.teamBeta);
      setSprite("right", _TEAMS.teamBeta.pokemons[i].stats.id, _TEAMS.teamBeta.pokemons[i].shiny, _TEAMS.teamBeta.pokemons[i].gender, i);
      window.localStorage.setItem("_TEAMS", JSON.stringify(_TEAMS));
    });
  }

  let pos;
  let leftSideNames = document.querySelectorAll('.left-side-pokemon-name');
  let rightSideNames = document.querySelectorAll('.right-side-pokemon-name');
  document.querySelector("#team-alfa-name").innerHTML = _TEAMS.teamAlfa.teamName;
  document.querySelector("#team-beta-name").innerHTML = _TEAMS.teamBeta.teamName;
  for (let i = 0; i < 6; i++) {
    if (_TEAMS.teamAlfa.pokemons[i].name.includes('-')) {
      pos = _TEAMS.teamAlfa.pokemons[i].name.indexOf('-');
      leftSideNames[i].innerHTML = _TEAMS.teamAlfa.pokemons[i].name.substring(0, pos);
    } else {
      leftSideNames[i].innerHTML = _TEAMS.teamAlfa.pokemons[i].name;
    }
    if (_TEAMS.teamBeta.pokemons[i].name.includes('-')) {
      pos = _TEAMS.teamBeta.pokemons[i].name.indexOf('-');
      rightSideNames[i].innerHTML = _TEAMS.teamBeta.pokemons[i].name.substring(0, pos);
    } else {
      rightSideNames[i].innerHTML = _TEAMS.teamBeta.pokemons[i].name;
    }
  }

  let leftLength = document.getElementById('left-side-images').offsetWidth;
  let rightLength = document.getElementById('right-side-images').offsetWidth;
  if (leftLength != rightLength) {
    if (leftLength < rightLength) {
      document.getElementById('left-side-images').setAttribute("style", "width:" + rightLength + "px");
    } else {
      document.getElementById('right-side-images').setAttribute("style", "width:" + leftLength + "px");
    }
  }

  let sideColor = document.getElementsByClassName('side-images-bg-color');
  let j = 6;
  for (let i = 0; i < sideColor.length; i++) {
    sideColor[i].addEventListener('mouseover', function () {
      if (i < 6) {
        setColor(_TEAMS.teamAlfa.pokemons[i].stats.types, sideColor[i]);
      } else {
        setColor(_TEAMS.teamBeta.pokemons[i - j].stats.types, sideColor[i]);
      }
    });

    sideColor[i].addEventListener('mouseout', function () {
      clearColor(sideColor[i]);
    })
  }
})();

/*document.getElementById("death").addEventListener("click", function () {
  let sideColor = document.getElementsByClassName('side-images-bg-color');
  for (let i = 0; i < 6; i++) {
    sideColor[i + 6].setAttribute('death', true);
  }
  winningTeam("right");
});*/

function pad_with_zeroes(number, length) {
  var my_string = '' + number;
  while (my_string.length < length) {
    my_string = '0' + my_string;
  }
  return my_string;
}

function setSprite(target, id, hasShiny, initgender, index) {
  if (initgender == "fd") {
    document.getElementById(target + '-side-image-' + index).src = "https://projectpokemon.org/images/sprites-models/homeimg/poke_capture_" + pad_with_zeroes(id, 4) + "_" + "000" + "_" + "fd" + "_" + "n" + "_" + "00000000" + "_f_" + hasShiny + ".png"; //forme sesso formaattuale formaboh shiny
  } else if (initgender == "md") {
    document.getElementById(target + '-side-image-' + index).src = "https://projectpokemon.org/images/sprites-models/homeimg/poke_capture_" + pad_with_zeroes(id, 4) + "_" + "000" + "_" + "md" + "_" + "n" + "_" + "00000000" + "_f_" + hasShiny + ".png"; //forme sesso formaattuale formaboh shiny
  } else if (initgender == "uk") {
    document.getElementById(target + '-side-image-' + index).src = "https://projectpokemon.org/images/sprites-models/homeimg/poke_capture_" + pad_with_zeroes(id, 4) + "_" + "000" + "_" + "uk" + "_" + "n" + "_" + "00000000" + "_f_" + hasShiny + ".png"; //forme sesso formaattuale formaboh shiny
  } else if (initgender == "mo") {
    document.getElementById(target + '-side-image-' + index).src = "https://projectpokemon.org/images/sprites-models/homeimg/poke_capture_" + pad_with_zeroes(id, 4) + "_" + "000" + "_" + "mo" + "_" + "n" + "_" + "00000000" + "_f_" + hasShiny + ".png"; //forme sesso formaattuale formaboh shiny
  } else if (initgender == "fo") {
    document.getElementById(target + '-side-image-' + index).src = "https://projectpokemon.org/images/sprites-models/homeimg/poke_capture_" + pad_with_zeroes(id, 4) + "_" + "000" + "_" + "fo" + "_" + "n" + "_" + "00000000" + "_f_" + hasShiny + ".png"; //forme sesso formaattuale formaboh shiny
  } else if (initgender == "fd") {
    document.getElementById(target + '-side-image-' + index).src = "https://projectpokemon.org/images/sprites-models/homeimg/poke_capture_" + pad_with_zeroes(id, 4) + "_" + "000" + "_" + "fd" + "_" + "n" + "_" + "00000000" + "_f_" + hasShiny + ".png"; //torchic dava problemi // TODO
  } else {
    document.getElementById(target + '-side-image-' + index).src = "https://projectpokemon.org/images/sprites-models/homeimg/poke_capture_" + pad_with_zeroes(id, 4) + "_" + "000" + "_" + "mf" + "_" + "n" + "_" + "00000000" + "_f_" + hasShiny + ".png"; //forme sesso formaattuale formaboh shiny
  }
}

function setColor(typesPokemon, sideCard) {
  let random = getRandomIntInclusive(10, 200);
  let rgba;
  let rgba1;
  if (typesPokemon.length == 2) {
    rgba = hexToRgb(typesColor.types[typesPokemon[1].type.name].color_type);
    rgba1 = hexToRgb(typesColor.types[typesPokemon[0].type.name].color_type)
    sideCard.setAttribute("style", '');
    sideCard.setAttribute('style', sideCard.getAttribute('style') + 'background: linear-gradient(' + random + 'deg, ' + 'rgba(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + '),' + 'rgba(' + rgba1.r + ',' + rgba1.g + ',' + rgba1.b + ',' + rgba1.a + '));');
  } else {
    rgba = hexToRgb(typesColor.types[typesPokemon[0].type.name].card_linear_gradient[0]);
    rgba1 = hexToRgb(typesColor.types[typesPokemon[0].type.name].card_linear_gradient[1]);
    sideCard.setAttribute("style", '');
    sideCard.setAttribute('style', sideCard.getAttribute('style') + 'background: linear-gradient(' + random + 'deg, ' + 'rgba(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + '), ' + 'rgba(' + rgba1.r + ',' + rgba1.g + ',' + rgba1.b + ',' + rgba1.a + '));');
  }
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
    a: (0.6)
  } : null;
}

function clearColor(sideCard) {
  sideCard.setAttribute("style", '');
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.getElementById("left-potion").addEventListener("mousedown", function () {
  let sidePokemon = $(".left-side-animation");
  sidePokemon.css("visibility", "hidden");
  let random = getRandomIntInclusive(10, 200);
  let leftJson = JSON.parse(window.localStorage.getItem(("_TEAMS"))).teamAlfa;
  let sideColor = document.getElementsByClassName('left-side-images-bg-color');
  for (let i = 0; i < sideColor.length; i++) {
    var old_element = sideColor[i];
    var new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
  }

  document.getElementById("left-potion-0").innerHTML = "Normal: " + leftJson.normal;
  document.getElementById("left-potion-1").innerHTML = "Super: " + leftJson.super;
  document.getElementById("left-potion-2").innerHTML = "Hyper: " + leftJson.hyper;
  document.getElementById("left-side-image-0").src = "resources/img/normal-potion.png";
  document.getElementById("left-side-image-1").src = "resources/img/super-potion.png";
  document.getElementById("left-side-image-2").src = "resources/img/hyper-potion.png";
  document.getElementById("left-normal-potion").setAttribute("style", '');
  document.getElementById("left-normal-potion").setAttribute('style', document.getElementById("left-normal-potion").getAttribute('style') + 'background: linear-gradient(' + random + 'deg, ' + 'rgba(247,57,239,0.6), ' + 'rgba(132,70,221,0.6));');
  document.getElementById("left-super-potion").setAttribute("style", '');
  document.getElementById("left-super-potion").setAttribute('style', document.getElementById("left-super-potion").getAttribute('style') + 'background: linear-gradient(' + random + 'deg, ' + 'rgba(254,226,71,0.6), ' + 'rgba(245,72,31,0.6));');
  document.getElementById("left-hyper-potion").setAttribute("style", '');
  document.getElementById("left-hyper-potion").setAttribute('style', document.getElementById("left-hyper-potion").getAttribute('style') + 'background: linear-gradient(' + random + 'deg, ' + 'rgba(242,209,201,0.6), ' + 'rgba(236,118,163,0.6));');


  /*sidePokemon.animate({ "transform": "scale(0)" }, 1000, "linear", () => { sidePokemon.css("visibility", "hidden"); });*/
});

document.getElementById("left-potion").addEventListener("mouseup", function () {
  document.getElementById("left-normal-potion").setAttribute("style", '');
  document.getElementById("left-super-potion").setAttribute("style", '');
  document.getElementById("left-hyper-potion").setAttribute("style", '');
  let sidePokemon = $(".left-side-animation");
  sidePokemon.css("visibility", "visible");
  for (let i = 0; i < _TEAMS.teamAlfa.pokemons.length; i++) {
    setSprite("left", _TEAMS.teamAlfa.pokemons[i].stats.id, _TEAMS.teamAlfa.pokemons[i].shiny, _TEAMS.teamAlfa.pokemons[i].gender, i);
    let sideColor = document.getElementsByClassName('side-images-bg-color');
    let j = 6;
    for (let i = 0; i < sideColor.length; i++) {
      if (!sideColor[i].getAttribute("death")) {
        sideColor[i].addEventListener('mouseover', function () {
          if (i < 6) {
            setColor(_TEAMS.teamAlfa.pokemons[i].stats.types, sideColor[i]);
          } else {
            setColor(_TEAMS.teamBeta.pokemons[i - j].stats.types, sideColor[i]);
          }
        });

        sideColor[i].addEventListener('mouseout', function () {
          clearColor(sideColor[i]);
        })
      } else {
        sideColor[i].setAttribute('style', 'background: #D84654 !important;');
      }
    }
  }

  let pos;
  let leftSideNames = document.querySelectorAll('.left-side-pokemon-name');

  for (let i = 0; i < 6; i++) {
    if (_TEAMS.teamAlfa.pokemons[i].name.includes('-')) {
      pos = _TEAMS.teamAlfa.pokemons[i].name.indexOf('-');
      leftSideNames[i].innerHTML = _TEAMS.teamAlfa.pokemons[i].name.substring(0, pos);
    } else {
      leftSideNames[i].innerHTML = _TEAMS.teamAlfa.pokemons[i].name;
    }
  }

  /*sidePokemon.animate({ "transform": "scale(0)" }, 1000, "linear", () => { sidePokemon.css("visibility", "hidden"); });*/
});

document.getElementById("right-potion").addEventListener("mousedown", function () {
  let sidePokemon = $(".right-side-animation");
  sidePokemon.css("visibility", "hidden");
  let random = getRandomIntInclusive(10, 200);
  let rightJson = JSON.parse(window.localStorage.getItem(("_TEAMS"))).teamBeta;
  let sideColor = document.getElementsByClassName('right-side-images-bg-color');
  for (let i = 0; i < sideColor.length; i++) {
    var old_element = sideColor[i];
    var new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
  }

  document.getElementById("right-potion-0").innerHTML = "Normal: " + rightJson.normal;
  document.getElementById("right-potion-1").innerHTML = "Super: " + rightJson.super;
  document.getElementById("right-potion-2").innerHTML = "Hyper: " + rightJson.hyper;
  document.getElementById("right-side-image-0").src = "resources/img/normal-potion.png";
  document.getElementById("right-side-image-1").src = "resources/img/super-potion.png";
  document.getElementById("right-side-image-2").src = "resources/img/hyper-potion.png";
  document.getElementById("right-normal-potion").setAttribute("style", '');
  document.getElementById("right-normal-potion").setAttribute('style', document.getElementById("right-normal-potion").getAttribute('style') + 'background: linear-gradient(' + random + 'deg, ' + 'rgba(247,57,239,0.6), ' + 'rgba(132,70,221,0.6));');
  document.getElementById("right-super-potion").setAttribute("style", '');
  document.getElementById("right-super-potion").setAttribute('style', document.getElementById("right-super-potion").getAttribute('style') + 'background: linear-gradient(' + random + 'deg, ' + 'rgba(254,226,71,0.6), ' + 'rgba(245,72,31,0.6));');
  document.getElementById("right-hyper-potion").setAttribute("style", '');
  document.getElementById("right-hyper-potion").setAttribute('style', document.getElementById("right-hyper-potion").getAttribute('style') + 'background: linear-gradient(' + random + 'deg, ' + 'rgba(242,209,201,0.6), ' + 'rgba(236,118,163,0.6));');


  /*sidePokemon.animate({ left: sidePokemon.width(), width: "0px" }, 1000, "linear", () => { sidePokemon.css("visibility", "hidden"); });*/
});

document.getElementById("right-potion").addEventListener("mouseup", function () {
  document.getElementById("right-normal-potion").setAttribute("style", '');
  document.getElementById("right-super-potion").setAttribute("style", '');
  document.getElementById("right-hyper-potion").setAttribute("style", '');
  let sidePokemon = $(".right-side-animation");
  sidePokemon.css("visibility", "visible");
  for (let i = 0; i < _TEAMS.teamBeta.pokemons.length; i++) {
    setSprite("right", _TEAMS.teamBeta.pokemons[i].stats.id, _TEAMS.teamBeta.pokemons[i].shiny, _TEAMS.teamBeta.pokemons[i].gender, i);
    let sideColor = document.getElementsByClassName('side-images-bg-color');
    let j = 6;
    for (let i = 0; i < sideColor.length; i++) {
      if (!sideColor[i].getAttribute("death")) {
        sideColor[i].addEventListener('mouseover', function () {
          if (i < 6) {
            setColor(_TEAMS.teamAlfa.pokemons[i].stats.types, sideColor[i]);
          } else {
            setColor(_TEAMS.teamBeta.pokemons[i - j].stats.types, sideColor[i]);
          }
        });

        sideColor[i].addEventListener('mouseout', function () {
          clearColor(sideColor[i]);
        })
      } else {
        sideColor[i].setAttribute('style', 'background: #D84654 !important;');
      }
    }
  }
  let pos;
  let rightSideNames = document.querySelectorAll('.right-side-pokemon-name');

  for (let i = 0; i < 6; i++) {
    if (_TEAMS.teamBeta.pokemons[i].name.includes('-')) {
      pos = _TEAMS.teamBeta.pokemons[i].name.indexOf('-');
      rightSideNames[i].innerHTML = _TEAMS.teamBeta.pokemons[i].name.substring(0, pos);
    } else {
      rightSideNames[i].innerHTML = _TEAMS.teamBeta.pokemons[i].name;
    }
  }
  /*sidePokemon.animate({ "transform": "scale(0)" }, 1000, "linear", () => { sidePokemon.css("visibility", "hidden"); });*/
});



document.getElementById("submit").addEventListener("click", async function () {
  let leftAutomaton = await Automaton("left");
  let rightAutomaton = await Automaton("right");
  let jsonTeam = JSON.parse(window.localStorage.getItem("_TEAMS"));
  let leftHealth;
  let rightHealth;
  let waiting = 0;
  leftAutomaton.run(_BATTLE.actions.teamAlfa);
  rightAutomaton.run(_BATTLE.actions.teamBeta);
  let leftName = await leftAutomaton.getPokemon();
  let rightName = await rightAutomaton.getPokemon();
  if (leftMoveType == "pokemonchange") {
    for (let i = 0; i < jsonTeam.teamAlfa.pokemons.length; i++) {
      if (jsonTeam.teamAlfa.pokemons[i].name == leftName) {
        leftHealth = jsonTeam.teamAlfa.pokemons[i].stats.health;
      }
    }
    if (leftHealth > 0) {
      waiting = 1700;
      $('#left-card').playKeyframe({
        name: "scale-up-center",
        duration: "1.5s",
        timingFunction: 'cubic-bezier(0.680, -0.550, 0.265, 1.550)', /*cubic-bezier(0.680, -0.550, 0.265, 1.550)*/
        delay: '0s',
        iterationCount: '1',
        direction: 'reverse',
        fillMode: 'none',
        complete: function () {
          getPokemon("left", leftName);
        }
      });
    }
  }
  if (rightMoveType == "pokemonchange") {
    for (let i = 0; i < jsonTeam.teamBeta.pokemons.length; i++) {
      if (jsonTeam.teamBeta.pokemons[i].name == rightName) {
        rightHealth = jsonTeam.teamBeta.pokemons[i].stats.health;
      }
    }
    if (rightHealth > 0) {
      waiting = 1700;
      $('#right-card').playKeyframe({
        name: "scale-up-center",
        duration: "1.5s",
        timingFunction: 'cubic-bezier(0.680, -0.550, 0.265, 1.550)',
        delay: '0s',
        iterationCount: '1',
        direction: 'reverse',
        fillMode: 'none',
        complete: function () {
          getPokemon("right", rightName);
        }
      });
    }
  }
  setTimeout(async function () {
    if (leftMoveType == "pokemonpotion") {
      healFromPotion("left", await leftAutomaton.getPotion());
    }
    if (rightMoveType == "pokemonpotion") {
      healFromPotion("right", await rightAutomaton.getPotion());
    }
    if (leftMoveType == "pokemondynamax") {
      getGigantaMax("left", await leftAutomaton.getPokemon());
    }
    if (rightMoveType == "pokemondynamax") {
      getGigantaMax("right", await rightAutomaton.getPokemon());
    }
    if (leftMoveType == "pokemonmove" && rightMoveType == "pokemonmove") {
      if (finish) {
        finish = false;
      } else {
        finish = true;
      }
      let leftPokemonSpeed;
      let rightPokemonSpeed;
      let leftMove = await leftAutomaton.getMove();
      let rightMove = await rightAutomaton.getMove();

      for (let i = 0; i < _TEAMS.teamAlfa.pokemons.length; i++) {
        if (_TEAMS.teamAlfa.pokemons[i].name == await leftAutomaton.getPokemon()) {
          leftPokemonSpeed = _TEAMS.teamAlfa.pokemons[i].stats.stats[5].base_stat;
        }
      }
      for (let i = 0; i < _TEAMS.teamBeta.pokemons.length; i++) {
        if (_TEAMS.teamBeta.pokemons[i].name == await rightAutomaton.getPokemon()) {
          rightPokemonSpeed = _TEAMS.teamBeta.pokemons[i].stats.stats[5].base_stat;
        }

      }
      if (leftPokemonSpeed > rightPokemonSpeed) {
        damageCalculator("left", $("#left-card-name").clone().children().remove().end().text().charAt(0).toLowerCase() + $("#left-card-name").clone().children().remove().end().text().slice(1), $("#right-card-name").clone().children().remove().end().text().charAt(0).toLowerCase() + $("#right-card-name").clone().children().remove().end().text().slice(1), leftMove);
        setTimeout(function () {
          damageCalculator("right", $("#right-card-name").clone().children().remove().end().text().charAt(0).toLowerCase() + $("#right-card-name").clone().children().remove().end().text().slice(1), $("#left-card-name").clone().children().remove().end().text().charAt(0).toLowerCase() + $("#left-card-name").clone().children().remove().end().text().slice(1), rightMove);
        }, 4500);
      } else if (leftPokemonSpeed < rightPokemonSpeed) {
        damageCalculator("right", $("#right-card-name").clone().children().remove().end().text().charAt(0).toLowerCase() + $("#right-card-name").clone().children().remove().end().text().slice(1), $("#left-card-name").clone().children().remove().end().text().charAt(0).toLowerCase() + $("#left-card-name").clone().children().remove().end().text().slice(1), rightMove);
        setTimeout(function () {
          damageCalculator("left", $("#left-card-name").clone().children().remove().end().text().charAt(0).toLowerCase() + $("#left-card-name").clone().children().remove().end().text().slice(1), $("#right-card-name").clone().children().remove().end().text().charAt(0).toLowerCase() + $("#right-card-name").clone().children().remove().end().text().slice(1), leftMove);
        }, 4500);
      } else {
        let rand = getRandomIntInclusive(0, 1);
        if (rand == 0) {
          damageCalculator("right", $("#right-card-name").clone().children().remove().end().text().charAt(0).toLowerCase() + $("#right-card-name").clone().children().remove().end().text().slice(1), $("#left-card-name").clone().children().remove().end().text().charAt(0).toLowerCase() + $("#left-card-name").clone().children().remove().end().text().slice(1), rightMove);
          setTimeout(function () {
            damageCalculator("left", $("#left-card-name").clone().children().remove().end().text().charAt(0).toLowerCase() + $("#left-card-name").clone().children().remove().end().text().slice(1), $("#right-card-name").clone().children().remove().end().text().charAt(0).toLowerCase() + $("#right-card-name").clone().children().remove().end().text().slice(1), leftMove);
          }, 4500);
        } else {
          damageCalculator("left", $("#left-card-name").clone().children().remove().end().text().charAt(0).toLowerCase() + $("#left-card-name").clone().children().remove().end().text().slice(1), $("#right-card-name").clone().children().remove().end().text().charAt(0).toLowerCase() + $("#right-card-name").clone().children().remove().end().text().slice(1), leftMove);
          setTimeout(function () {
            damageCalculator("right", $("#right-card-name").clone().children().remove().end().text().charAt(0).toLowerCase() + $("#right-card-name").clone().children().remove().end().text().slice(1), $("#left-card-name").clone().children().remove().end().text().charAt(0).toLowerCase() + $("#left-card-name").clone().children().remove().end().text().slice(1), rightMove);
          }, 4500);
        }
      }
      $("#form-selector").animate({ left: "20%" }, 1250);
      return;
    }
    if (leftMoveType == "pokemonmove") {
      let leftMove = await leftAutomaton.getMove();
      damageCalculator("left", $("#left-card-name").clone().children().remove().end().text().charAt(0).toLowerCase() + $("#left-card-name").clone().children().remove().end().text().slice(1), $("#right-card-name").clone().children().remove().end().text().charAt(0).toLowerCase() + $("#right-card-name").clone().children().remove().end().text().slice(1), leftMove);
    }
    if (rightMoveType == "pokemonmove") {
      let rightMove = await rightAutomaton.getMove();
      damageCalculator("right", $("#right-card-name").clone().children().remove().end().text().charAt(0).toLowerCase() + $("#right-card-name").clone().children().remove().end().text().slice(1), $("#left-card-name").clone().children().remove().end().text().charAt(0).toLowerCase() + $("#left-card-name").clone().children().remove().end().text().slice(1), rightMove);
    }
    $("#form-selector").animate({ left: "20%" }, 1250);
  }, waiting)
});


async function damageCalculator(target, attacker, defender, move) { //target = chi fa la mossa
  let pokemonAttacker;
  let pokemonDefender;
  console.log(attacker, defender);
  let healthAmount = document.getElementById(target + '-healthbar-health').getAttribute('health');


  if (target == "left") {
    for (let i = 0; i < JSON.parse(window.localStorage.getItem("_TEAMS")).teamAlfa.pokemons.length; i++) {
      if (JSON.parse(window.localStorage.getItem("_TEAMS")).teamAlfa.pokemons[i].name == attacker) {
        pokemonAttacker = JSON.parse(window.localStorage.getItem("_TEAMS")).teamAlfa.pokemons[i];
      }
      if (JSON.parse(window.localStorage.getItem("_TEAMS")).teamBeta.pokemons[i].name == defender) {
        pokemonDefender = JSON.parse(window.localStorage.getItem("_TEAMS")).teamBeta.pokemons[i];
      }
    }
  } else {
    for (let i = 0; i < JSON.parse(window.localStorage.getItem("_TEAMS")).teamBeta.pokemons.length; i++) {
      if (JSON.parse(window.localStorage.getItem("_TEAMS")).teamBeta.pokemons[i].name == attacker) {
        pokemonAttacker = JSON.parse(window.localStorage.getItem("_TEAMS")).teamBeta.pokemons[i];
      }
      if (JSON.parse(window.localStorage.getItem("_TEAMS")).teamAlfa.pokemons[i].name == defender) {
        pokemonDefender = JSON.parse(window.localStorage.getItem("_TEAMS")).teamAlfa.pokemons[i];
      }
    }
  }

  /**********************************************************LIVELLO***************************************************************************/

  let LEVEL = 25; //non avendo i livelli, poiché le statistiche sono quelle di base, abbiamo stabilito un livello medio per tutti i pokémon in maniera tale che tutti i pokémon siano alla pari.

  /*VERIFICATO*/

  /**********************************************************POTENZA***************************************************************************/

  let POWER = move.power; //potenza della mossa

  /*VERIFICATO*/

  /*****************************************************ATTACCO & DIFESA***********************************************************************/

  let ATTACK;
  let DEFENSE;
  if (move.damage_class.name == "special") {
    ATTACK = pokemonAttacker.stats.stats[3].base_stat;
    DEFENSE = pokemonDefender.stats.stats[4].base_stat;
  } else {
    ATTACK = pokemonAttacker.stats.stats[1].base_stat;
    DEFENSE = pokemonDefender.stats.stats[2].base_stat;
  }


  /*VERIFICATO*/

  /***********************************************************STAB*****************************************************************************/

  let STAB = 1.0;
  if (pokemonAttacker.stats.types.length == 2) {
    if (pokemonAttacker.stats.types[0].type.name == move.type.name || pokemonAttacker.stats.types[1].type.name == move.type.name) {
      STAB = 1.5;
    }
  } else {
    if (pokemonAttacker.stats.types[0].type.name == move.type.name) {
      STAB = 1.5;
    }
  }

  /*VERIFICATO*/

  /**********************************************************TARGETS***************************************************************************/

  let TARGETS = 1;

  /*VERIFICATO*/

  /**********************************************************WEATHER***************************************************************************/

  let WEATHER = 1;

  /*CONSULTARSI CON RIZZO*/

  /**********************************************************BADGE*****************************************************************************/

  let BADGE = 1;

  /*VERIFICATO*/

  /*********************************************************CRITICAL****************************************************************************/

  let CRITICAL = 1;
  let r = getRandomIntInclusive(0, 255);
  let t = (pokemonAttacker.stats.stats[5].base_stat) / 2;
  if (r < t) {
    CRITICAL = 1.5;
    console.log("Critical!");
  }


  /*VERIFICATO*/

  /**********************************************************RANDOM*****************************************************************************/

  let RANDOM = Math.random() * (1 - 0.85) + 0.85;

  /*VERIFICATO*/

  /***********************************************************TYPE******************************************************************************/

  let TYPE = 1.0;
  let typeurl = move.type.url;
  fetch(typeurl).then(response => response.json()).then(data => {
    for (let i = 0; i < data.damage_relations.double_damage_to.length; i++) {
      if (pokemonDefender.stats.types.length == 2) {
        if (data.damage_relations.double_damage_to[i].name == pokemonDefender.stats.types[0].type.name || data.damage_relations.double_damage_to[i].name == pokemonDefender.stats.types[1].type.name) {
          TYPE = TYPE * 2.0;
        }
      } else {
        if (data.damage_relations.double_damage_to[i].name == pokemonDefender.stats.types[0].type.name) {
          TYPE = 2.0;
        }
      }
    }
    for (let i = 0; i < data.damage_relations.half_damage_to.length; i++) {
      if (pokemonDefender.stats.types.length == 2) {
        if (data.damage_relations.half_damage_to[i].name == pokemonDefender.stats.types[0].type.name || data.damage_relations.half_damage_to[i].name == pokemonDefender.stats.types[1].type.name) {
          TYPE = TYPE * 0.5;
        }
      } else {
        if (data.damage_relations.half_damage_to[i].name == pokemonDefender.stats.types[0].type.name) {
          TYPE = 0.5;
        }
      }
    }
    for (let i = 0; i < data.damage_relations.no_damage_to.length; i++) {
      if (pokemonDefender.stats.types.length == 2) {
        if (data.damage_relations.no_damage_to[i].name == pokemonDefender.stats.types[0].type.name || data.damage_relations.no_damage_to[i].name == pokemonDefender.stats.types[1].type.name) {
          TYPE = 0.0;
        }
      } else {
        if (data.damage_relations.no_damage_to[i].name == pokemonDefender.stats.types[0].type.name) {
          TYPE = 0.0;
        }
      }
    }

    /*VERIFICATO*/

    /***********************************************************BURN******************************************************************************/ //d'or in poi il calcolo delle varie componenti che costituiscono il danno inflitto verranno scritte all'interno della funzione fetch() in quanto essendo una richiesta asincrona potrebbe creare problemi nella sincronia con il resto del programma facendo risultare TYPE == undefined

    let BURN = 1; // non avendo diversi stati pe i pokemon (es. paralyzed, burn, ecc.) non siamo in grado di sapere se il pokemon è bruciato o meno

    /*VERIFICATO*/

    /***********************************************************OTHER*****************************************************************************/

    let OTHER = 1; // parametro che varia a seconda di determinate caratteristiche delle mosse fatte durante il game. Non salvando la mossa fatta dal giocatore durante il game non possiamo stabilire un valore diverso ler other. In ogni caso, anche nel gioco principale, la maggior parte delle volte il suo valore è di 1.


    let DAMAGE = ((((((2 * LEVEL) / 5) + 2) * POWER * (ATTACK / DEFENSE)) / 50) + 2) * TARGETS * STAB * WEATHER * BADGE * CRITICAL * RANDOM * TYPE * BURN * OTHER; /*VERIFICATO*/

    console.log("damage:  " + DAMAGE);

    if (healthAmount > 0) {
      _MOVE_TYPE = move.type.name;
      if (target == "left") {
        attackAnimation("right", parseInt(DAMAGE));
      } else {
        attackAnimation("left", parseInt(DAMAGE));
      }
    }
  });
}

/********************************ANIMATIONS **********************************/
/*
  dewgong I choose you
  rapidash I choose you
  dewgong use surf now
  rapidash use inferno now
  dewgong take normal potion
  venusaur I choose you
*/
$.keyframe.define([{
  name: 'scale-up-center',
  '0%': { 'transform': 'scale(0.7)' },
  '100%': { 'transform': 'scale(1)' }
}]);

$.keyframe.define([{
  name: 'moveRightAttack',
  '0%': { "right": "65%", "top": "17%" },
  '10%': { "right": "65%", "top": "12%" },
  '20%': { "transform": "rotate(25deg)" },
  '50%': { "z-index": "9999", "right": "17%;" },
  '80%': { "transform": "rotate(25deg)" },
  '90%': { "right": "65%", "top": "12%", "transform": "rotate(3deg)" },
  '100%': { "top": "17%" }
}]);

$.keyframe.define([{
  name: 'moveLeftAttack',
  '0%': { "left": "65%", "top": "17%" },
  '10%': { "left": "65%", "top": "12%" },
  '20%': { "transform": "rotate(-25deg)" },
  '50%': { "z-index": "9999", "left": "17%;" },
  '80%': { "transform": "rotate(-25deg)" },
  '90%': { "left": "65%", "top": "12%", "transform": "rotate(1deg)" },
  '100%': { "top": "17%" }
}]);

$.keyframe.define([{
  name: 'shake',
  "0%": { "transform": "translate(2px, 1px)", "transform": "rotate(0deg)" },
  "10%": { "transform": "translate(-1px, -2px)", "transform": "rotate(-1deg)" },
  "20%": { "transform": "translate(-3px, 0px)", "transform": "rotate(1deg)" },
  "30%": { "transform": "translate(0px, 2px)", "transform": "rotate(0deg)" },
  "40%": { "transform": "translate(1px, -1px)", "transform": "rotate(1deg)" },
  "50%": { "transform": "translate(-1px, 1px)", "transform": "rotate(-1deg)" },
  "60%": { "transform": "translate(-3px, -2px)", "transform": "rotate(0deg)" },
  "70%": { "transform": "translate(2px, 1px)", "transform": "rotate(-1deg)" },
  "80%": { "transform": "translate(-1px, -2px)", "transform": "rotate(1deg)" },
  "90%": { "transform": "translate(2px, -1px)", "transform": "rotate(0deg)" },
  "100%": { "transform": "translate(1px, -2px)", "transform": "rotate(-1deg)" }
}]);

$.keyframe.define([{
  name: 'changeLeftPokemon',
  "0%": { "transform": "scale(1)" },
  "100%": { "transform": "scale(0)" }
}]);

$.keyframe.define([{
  name: 'changeRightPokemon',
  "0%": { "transform": "scale(1)" },
  "100%": { "transform": "scale(0)" }
}]);

/****************************************************************************/

/**
 * Funzione che assegna le classi alla card per generare l'animazione.
 * 
 * @param {*} target 
 */
function attackAnimation(target, damage) { //target = chi subisce il danno
  const $card = $('#' + target + '-card');
  let $cardOpponent;
  let animationType;

  if (target == 'left') {
    $cardOpponent = $('#right-card');
    animationType = 'moveLeftAttack';
  } else {
    $cardOpponent = $('#left-card');
    animationType = 'moveRightAttack';
  }

  $cardOpponent.playKeyframe({
    name: animationType,
    duration: "2.5s",
    timingFunction: 'linear',
    delay: '0s',
    iterationCount: '1',
    direction: 'normal',
    fillMode: 'none',
    complete: function () {
      $card.playKeyframe({
        name: 'shake',
        duration: "0.4s",
        timingFunction: 'linear',
        delay: '0s',
        iterationCount: '1',
        direction: 'normal',
        fillMode: 'none',
        complete: function () {
          updateHealthBar(target, damage);
          $('#' + target + '-text-damage').text(damage * -1);
          $('#' + target + '-gradient-stop1').attr('style', 'stop-color: ' + typesColor.types[_MOVE_TYPE].card_linear_gradient[0] + '; stop-opacity: 0.95;');
          $('#' + target + '-gradient-stop2').attr('style', 'stop-color: ' + typesColor.types[_MOVE_TYPE].card_linear_gradient[1] + '; stop-opacity: 0.95;');
          $('#' + target + '-svg-damage').attr('style', 'visibility: visible;');
          setTimeout(function () {
            $('#' + target + '-svg-damage').attr('style', 'visibility: hidden;');
          }, 1500);
        }
      });
    }
  });
}

export function updateHealthBar(target, damage) { //target = chi subisce il danno
  //TODO: animazione barra vita
  //TODO: picchiare valentin perchè non ha fatto nulla 
  let healthAmount = document.getElementById(target + '-healthbar-health').getAttribute('health') - damage;
  let targetName = document.getElementById(target + '-card').getAttribute('pokemonname');
  let teamNames = document.querySelectorAll('.' + target + '-side-pokemon-name');
  let sideColor = document.getElementsByClassName('side-images-bg-color');

  let healthPercentage = ((100 * healthAmount) / parseInt(document.getElementById(target + '-healthbar-health').getAttribute('initial-health'))); //100:MAX_HP = X:HP_ATTUALI X=(100*HP_ATTUALI)/MAX_HP
  if (healthPercentage > 100) healthPercentage = 100;
  document.getElementById(target + '-healthbar-health').setAttribute('style', 'width:' + healthPercentage + '%; background-color:' + getHealtColor(healthPercentage) + ';');
  document.getElementById(target + '-healthbar-health').setAttribute('health', healthAmount);

  let jsonTeam = JSON.parse(window.localStorage.getItem("_TEAMS"));
  if (target == "left") {
    for (let i = 0; i < jsonTeam.teamAlfa.pokemons.length; i++) {
      if (jsonTeam.teamAlfa.pokemons[i].name == targetName) {
        jsonTeam.teamAlfa.pokemons[i].stats.health = healthAmount;
      }
    }
  } else {
    for (let i = 0; i < jsonTeam.teamBeta.pokemons.length; i++) {
      if (jsonTeam.teamBeta.pokemons[i].name == targetName) {
        jsonTeam.teamBeta.pokemons[i].stats.health = healthAmount;
      }
    }
  }

  window.localStorage.setItem("_TEAMS", JSON.stringify(jsonTeam));

  if (healthAmount < 0) {
    $('#' + target + '-deathx').css('visibility', 'visible');
    for (let i = 0; i < teamNames.length; i++) {
      if (targetName == teamNames[i].innerHTML) {
        if (target == 'left') {
          sideColor[i].setAttribute('death', true);
          sideColor[i].setAttribute('style', 'background: #D84654 !important;');
          var old_element = sideColor[i];
          var new_element = old_element.cloneNode(true);
          old_element.parentNode.replaceChild(new_element, old_element);
          winningTeam("left");
        } else {
          sideColor[i + 6].setAttribute('death', true);
          sideColor[i + 6].setAttribute('style', 'background: #D84654 !important;');
          var old_element = sideColor[i + 6];
          var new_element = old_element.cloneNode(true);
          old_element.parentNode.replaceChild(new_element, old_element);
          winningTeam("right");
        }
      }
    }
    //TODO: reset card
  }
  //target è colui che riceve il danno!
  //TODO: animazione morte, update sidebar con bg rosso, clear card
}

export function healFromPotion(target, potion) {
  let initialHealth = parseInt(document.getElementById(target + '-healthbar-health').getAttribute('health'));
  let healthAmount = parseInt(document.getElementById(target + '-healthbar-health').getAttribute('health'));
  let pokemonMaxHP = parseInt(document.getElementById(target + '-healthbar-health').getAttribute('initial-health'));

  if (healthAmount > 0) {
    if (target == 'left') {
      let leftJson = JSON.parse(window.localStorage.getItem(("_TEAMS")));
      if (potion == 'normal' && leftJson.teamAlfa.normal > 0) {
        healthAmount = healthAmount + 20.0;
        leftJson.teamAlfa.normal -= 1;
      } else if (potion == 'super' && leftJson.teamAlfa.super > 0) {
        healthAmount = healthAmount + 60.0;
        leftJson.teamAlfa.super -= 1;
      } else if (potion == 'hyper' && leftJson.teamAlfa.hyper > 0) {
        healthAmount = healthAmount + 200.0;
        leftJson.teamAlfa.hyper -= 1;
      } else {
        alert("You don't have any kind of that potion left!");
      }
      window.localStorage.setItem("_TEAMS", JSON.stringify(leftJson));
    } else {
      let rightJson = JSON.parse(window.localStorage.getItem(("_TEAMS")));
      if (potion == 'normal' && rightJson.teamBeta.normal > 0) {
        healthAmount = healthAmount + 20.0;
        rightJson.teamBeta.normal -= 1;
      } else if (potion == 'super' && rightJson.teamBeta.super > 0) {
        healthAmount = healthAmount + 60.0;
        rightJson.teamBeta.super -= 1;
      } else if (potion == 'hyper' && rightJson.teamBeta.hyper > 0) {
        healthAmount = healthAmount + 200.0;
        rightJson.teamBeta.hyper -= 1;
      } else {
        alert("You don't have any kind of that potion left!");
      }
      window.localStorage.setItem("_TEAMS", JSON.stringify(rightJson));
    }
  } else {
    alert('Your Pokémon is deceased');
  }

  if (healthAmount > pokemonMaxHP) {
    healthAmount = pokemonMaxHP;
  }

  updateHealthBar(target, -1.0 * (healthAmount - initialHealth));
}

function getHealtColor(healthPercentage) {
  if (healthPercentage < 20) return '#e33328';
  else if ((healthPercentage > 20) && (healthPercentage < 41)) return '#fcba03';
  else return '#3ce328';
}


function winningTeam(target) { //target = chi subisce il danno
  let sideColor = document.getElementsByClassName('side-images-bg-color');
  let winner = true;
  for (let i = 0; i < 6; i++) {
    if (target == "left") {
      if (sideColor[i].getAttribute("death") == false || sideColor[i].getAttribute("death") == null) {
        winner = false;
      }
    } else {
      if (sideColor[i + 6].getAttribute("death") == false || sideColor[i + 6].getAttribute("death") == null) {
        winner = false;
      }
    }
  }

  if (winner) {
    if (target == "left") {
      winningAnimation("right");
    } else {
      winningAnimation("left");
    }
  }
}

function winningAnimation(target) { //target = vincitore
  let audio = new Audio('resources/audio/winning-music.mp3');
  audio.loop = true;
  audio.volume = 0.25;
  audio.play();

  $('#battle-page').css('display', 'none');
  $('#side-images-container').css('display', 'none');
  let teamName;
  let jsonObject = JSON.parse(window.localStorage.getItem("_TEAMS"));
  if (target == "left") {
    teamName = jsonObject.teamAlfa.teamName.toUpperCase();
    for (let i = 0; i < jsonObject.teamAlfa.pokemons.length; i++) {
      let poke = jsonObject.teamAlfa.pokemons[i];
      setWinnerSprites(poke.name, poke.stats.id, poke.shiny, poke.gender, (i + 1));
    }
  } else {
    teamName = jsonObject.teamBeta.teamName.toUpperCase();
    for (let i = 0; i < jsonObject.teamBeta.pokemons.length; i++) {
      let poke = jsonObject.teamBeta.pokemons[i];
      setWinnerSprites(poke.name, poke.stats.id, poke.shiny, poke.gender, (i + 1));
    }
  }

  $('#won-team').text(teamName);
  if (target == 'left')
    $('#won-team').css('color', '#ff1500');
  else
    $('#won-team').css('color', '#0055ff');

  window.addEventListener("resize", resizeCanvas, false);
  onLoad();
}

function setWinnerSprites(name, id, hasShiny, initgender, index) {
  if (initgender == "fd") {
    document.getElementById('winning-team-image-' + index).src = "https://projectpokemon.org/images/sprites-models/homeimg/poke_capture_" + pad_with_zeroes(id, 4) + "_" + "000" + "_" + "fd" + "_" + "n" + "_" + "00000000" + "_f_" + hasShiny + ".png"; //forme sesso formaattuale formaboh shiny
  } else if (initgender == "md") {
    document.getElementById('winning-team-image-' + index).src = "https://projectpokemon.org/images/sprites-models/homeimg/poke_capture_" + pad_with_zeroes(id, 4) + "_" + "000" + "_" + "md" + "_" + "n" + "_" + "00000000" + "_f_" + hasShiny + ".png"; //forme sesso formaattuale formaboh shiny
  } else if (initgender == "uk") {
    document.getElementById('winning-team-image-' + index).src = "https://projectpokemon.org/images/sprites-models/homeimg/poke_capture_" + pad_with_zeroes(id, 4) + "_" + "000" + "_" + "uk" + "_" + "n" + "_" + "00000000" + "_f_" + hasShiny + ".png"; //forme sesso formaattuale formaboh shiny
  } else if (initgender == "mo") {
    document.getElementById('winning-team-image-' + index).src = "https://projectpokemon.org/images/sprites-models/homeimg/poke_capture_" + pad_with_zeroes(id, 4) + "_" + "000" + "_" + "mo" + "_" + "n" + "_" + "00000000" + "_f_" + hasShiny + ".png"; //forme sesso formaattuale formaboh shiny
  } else if (initgender == "fo") {
    document.getElementById('winning-team-image-' + index).src = "https://projectpokemon.org/images/sprites-models/homeimg/poke_capture_" + pad_with_zeroes(id, 4) + "_" + "000" + "_" + "fo" + "_" + "n" + "_" + "00000000" + "_f_" + hasShiny + ".png"; //forme sesso formaattuale formaboh shiny
  } else if (initgender == "fd") {
    document.getElementById('winning-team-image-' + index).src = "https://projectpokemon.org/images/sprites-models/homeimg/poke_capture_" + pad_with_zeroes(id, 4) + "_" + "000" + "_" + "fd" + "_" + "n" + "_" + "00000000" + "_f_" + hasShiny + ".png"; //torchic dava problemi // TODO
  } else {
    document.getElementById('winning-team-image-' + index).src = "https://projectpokemon.org/images/sprites-models/homeimg/poke_capture_" + pad_with_zeroes(id, 4) + "_" + "000" + "_" + "mf" + "_" + "n" + "_" + "00000000" + "_f_" + hasShiny + ".png"; //forme sesso formaattuale formaboh shiny
  }

  document.getElementById('winning-team-image-' + index).title = name.split('')[0].toUpperCase() + name.slice(1);
}

//winningAnimation();

const _COLORS = ["rgb(255, 0, 0)", "rgb(0, 255, 0)", "rgb(0, 0, 255)"];

window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };

var canvas, ctx, w, h, particles = [], probability = 1,
  xPoint, yPoint;

function onLoad() {
  $('#end-battle').css('visibility', 'visible');
  $('#winning-team-images').css('visibility', 'visible');
  canvas = document.getElementById("end-battle-canvas");
  ctx = canvas.getContext("2d");
  resizeCanvas();

  window.requestAnimationFrame(updateWorld);
}

function resizeCanvas() {
  if (!!canvas) {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
}

function updateWorld() {
  update();
  paint();
  window.requestAnimationFrame(updateWorld);
}

function update() {
  if (particles.length < 400 && Math.random() < probability) {
    createFirework();
  }
  var alive = [];
  for (var i = 0; i < particles.length; i++) {
    if (particles[i].move()) {
      alive.push(particles[i]);
    }
  }
  particles = alive;
}

function paint() {
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = "rgba(113, 205, 244, 0.25)";
  ctx.fillRect(0, 0, w, h);
  ctx.globalCompositeOperation = 'lighter';
  for (var i = 0; i < particles.length; i++) {
    particles[i].draw(ctx);
  }
}

function createFirework() {
  xPoint = Math.random() * (w - 200) + 100;
  yPoint = Math.random() * (h - 200) + 100;
  var nFire = Math.random() * 50 + 100;
  let rand = getRandomIntInclusive(0, _COLORS.length);
  var c = _COLORS[rand];
  for (var i = 0; i < nFire; i++) {
    var particle = new Particle();
    particle.color = c;
    var vy = Math.sqrt(25 - particle.vx * particle.vx);
    if (Math.abs(particle.vy) > vy) {
      particle.vy = particle.vy > 0 ? vy : -vy;
    }
    particles.push(particle);
  }
}

function Particle() {
  this.w = this.h = Math.random() * 4 + 1;

  this.x = xPoint - this.w / 2;
  this.y = yPoint - this.h / 2;

  this.vx = (Math.random() - 0.5) * 10;
  this.vy = (Math.random() - 0.5) * 10;

  this.alpha = Math.random() * .5 + .5;


  this.color;
}

Particle.prototype = {
  gravity: 0.05,
  move: function () {
    this.x += this.vx;
    this.vy += this.gravity;
    this.y += this.vy;
    this.alpha -= 0.01;
    if (this.x <= -this.w || this.x >= screen.width ||
      this.y >= screen.height ||
      this.alpha <= 0) {
      return false;
    }
    return true;
  },
  draw: function (c) {
    c.save();
    c.beginPath();

    c.translate(this.x + this.w / 2, this.y + this.h / 2);
    c.arc(0, 0, this.w, 0, Math.PI * 2);
    c.fillStyle = this.color;
    c.globalAlpha = this.alpha;

    c.closePath();
    c.fill();
    c.restore();
  }
}

document.getElementById("continue").addEventListener("click", function () {
  window.location.href = "chooseTeams.html";
});

