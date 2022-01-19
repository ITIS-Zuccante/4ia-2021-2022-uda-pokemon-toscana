import { bestMatch } from './bestMatch.js';

(() => {
  let $cards = document.getElementsByClassName('card');

  for (let i = 0; i < 6; i++) {
    let deg = getRandomIntInclusive(-1, 2);
    $cards[i].setAttribute('style', 'transform: rotate(' + deg + 'deg)');
    $cards[i].setAttribute('deg', deg);
  }

  let deletebuttons = document.querySelectorAll(".deletebutton");
  for (let i = 0; i < deletebuttons.length; i++) {
    deletebuttons[i].addEventListener('click', function (event) {
      event.path[3].getElementsByClassName('card-image')[0].setAttribute('src', 'resources/img/question-mark.png');
      event.path[3].getElementsByClassName('card-image')[0].setAttribute('title', '???');
      event.path[4].setAttribute('pokemon', '???');
      event.path[4].getElementsByClassName('card-title')[0].innerHTML = '???';
      event.path[4].getElementsByClassName('card-type')[0].innerHTML = '???';
      event.path[4].getElementsByClassName('card-type-1')[0].setAttribute('style', 'visibility: hidden');
      event.path[4].getElementsByClassName('card-type')[0].setAttribute('style', '');
      event.path[4].getElementsByClassName('shinystars')[0].setAttribute('style', 'visibility: hidden');
      $cards[i].removeAttribute('type-1');
      $cards[i].setAttribute('style', 'transform: rotate(' + $cards[i].getAttribute('deg') + 'deg)');
    });
  }

  console.log(allStorage());
})();

function allStorage() {

  var values = [],
    keys = Object.keys(localStorage),
    i = keys.length;

  while (i--) {
    values.push(localStorage.getItem(keys[i]));
  }

  return values;
}

document.querySelector("#button-addteam").addEventListener("click", () => {
  if (document.querySelector('#fname').value == 'teamChose' || document.querySelector('#fname').value == ('_TEAMS') || document.querySelector('#fname').value == ('round')) {
    alert('You have to change the name of your team.');
    return;
  }

  let $cards = document.querySelectorAll('.card');
  let pokemons = [];

  for (let i = 0; i < $cards.length; i++) {
    console.log($cards[i].getAttribute('gender'));
    if ($cards[i].getAttribute('pokemon') != '???') {
      pokemons.push({
        name: $cards[i].getAttribute('pokemon'),
        shiny: $cards[i].getAttribute('shiny'),
        gender: $cards[i].getAttribute('gender')
      });
    } else {
      alert('The team is NOT completed! Please complete it before continuing.');
      return;
    }
  }

  if (document.querySelector('#fname').value) {
    window.localStorage.setItem(document.querySelector('#fname').value, JSON.stringify({
      teamName: document.querySelector('#fname').value,
      pokemons: pokemons
    }));
  } else {
    alert('Please insert a name for the team!');
    return;
  }
  location.reload();
});

/**
* TODO: è già presente in main.js 
*/
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getGender(pokemonName) {
  for (var i = 0; i < gender.length; i++) {
    if (pokemonName === gender[i][0]) {
      return gender[i][1];
    }
  }
}

function pad_with_zeroes(number, length) {
  var my_string = '' + number;
  while (my_string.length < length) {
    my_string = '0' + my_string;
  }
  return my_string;
}

document.getElementById("input-pokemon").addEventListener("keyup", async function (event) {
  if (event.keyCode === 13) {
    if (!(document.getElementById("input-pokemon").value == "" || document.getElementById("input-pokemon").value == undefined) && (document.getElementById("input-pokemon").value.length >= 3)) {
      for (let i = 0; i < $('.card').length; i++) {
        if (await bestMatch(document.getElementById("input-pokemon").value) == $('.card')[i].getAttribute('pokemon')) {
          alert('You can\'t choose a pokémon that is already in your team! Try to choose another pokémon');
          return;
        }
      }
      await getPokemonForTeam(document.getElementById("input-pokemon").value);
      document.getElementById('input-pokemon').value = '';
    } else {
      alert('You can\'t choose a name that is shorter than three letters. Try to choose another name!');
    }
  }
});

document.querySelector("#submit").addEventListener("click", function () {
  if (document.querySelectorAll(".select-styled")[0].innerHTML == "" && document.querySelectorAll(".select-styled")[1].innerHTML == 0) {
    alert('One or more team hasn\'t been chosen!');
  } else {
    window.localStorage.setItem('teamsChose', JSON.stringify({
      teamAlfa: document.querySelectorAll(".select-styled")[0].innerHTML,
      teamBeta: document.querySelectorAll(".select-styled")[1].innerHTML
    }));
    window.location.href = "battle.html";
  }
});

async function getPokemonForTeam(pokemonName) {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let jsonObject = JSON.parse(this.responseText);
      let $cards = document.getElementsByClassName('card');

      for (let i = 0; i < 6; i++) {
        if ($cards[i].getAttribute('pokemon') == '???') {
          $cards[i].setAttribute('pokemon', jsonObject.name);
          let hasShiny = getRandomIntInclusive(1, 20); //1, 20
          let shiny = "n";
          if (hasShiny == 17) {
            shiny = "r";
          }
          let genderfigure = "";

          if (jsonObject.forms[0].name.includes("-mega-x")) {
            $cards[i].querySelector('.card-image').src = "https://projectpokemon.org/images/sprites-models/homeimg/poke_capture_" + pad_with_zeroes((jsonObject.species.url.split("/")[6]), 4) + "_" + "001" + "_" + "uk" + "_" + "n" + "_" + "00000000" + "_f_" + shiny + ".png";
          } else if (jsonObject.forms[0].name.includes("-mega-y")) {
            $cards[i].querySelector('.card-image').src = "https://projectpokemon.org/images/sprites-models/homeimg/poke_capture_" + pad_with_zeroes((jsonObject.species.url.split("/")[6]), 4) + "_" + "002" + "_" + "mf" + "_" + "n" + "_" + "00000000" + "_f_" + shiny + ".png";
          } else if (jsonObject.forms[0].name.includes("-mega")) {
            $cards[i].querySelector('.card-image').src = "https://projectpokemon.org/images/sprites-models/homeimg/poke_capture_" + pad_with_zeroes((jsonObject.species.url.split("/")[6]), 4) + "_" + "001" + "_" + "mf" + "_" + "n" + "_" + "00000000" + "_f_" + shiny + ".png";
          } else if (jsonObject.forms[0].name.includes("-giga")) {
            $cards[i].querySelector('.card-image').src = "https://projectpokemon.org/images/sprites-models/homeimg/poke_capture_" + pad_with_zeroes(jsonObject.id, 4) + "_" + "000" + "_" + "mf" + "_" + "g" + "_" + "00000000" + "_f_" + shiny + ".png";
          } else if (getGender(jsonObject.forms[0].name) == "fm") {
            let gender = ["fd", "md"];
            let pokemongender = gender[getRandomIntInclusive(0, 1)];
            if (pokemongender == "fd") {
              genderfigure = "<img class='gender_images' src='resources/img/female-image.png' draggable='false' title='Female'>";
            } else {
              genderfigure = "<img class='gender_images' src='resources/img/male-image.png' draggable='false' title='Male'>";
            }
            $cards[i].setAttribute('gender', pokemongender);
            $cards[i].querySelector('.card-image').src = "https://projectpokemon.org/images/sprites-models/homeimg/poke_capture_" + pad_with_zeroes(jsonObject.id, 4) + "_" + "000" + "_" + pokemongender + "_" + "n" + "_" + "00000000" + "_f_" + shiny + ".png"; //forme sesso formaattuale formaboh shiny
          } else if (getGender(jsonObject.forms[0].name) == "uk") {
            $cards[i].setAttribute('gender', "uk");
            $cards[i].querySelector('.card-image').src = "https://projectpokemon.org/images/sprites-models/homeimg/poke_capture_" + pad_with_zeroes(jsonObject.id, 4) + "_" + "000" + "_" + "uk" + "_" + "n" + "_" + "00000000" + "_f_" + shiny + ".png"; //forme sesso formaattuale formaboh shiny
          } else if (getGender(jsonObject.forms[0].name) == "mo") {
            $cards[i].setAttribute('gender', "mo");
            genderfigure = "<img class='gender_images' src='resources/img/male-image.png' draggable='false' title='Male'>";
            $cards[i].querySelector('.card-image').src = "https://projectpokemon.org/images/sprites-models/homeimg/poke_capture_" + pad_with_zeroes(jsonObject.id, 4) + "_" + "000" + "_" + "mo" + "_" + "n" + "_" + "00000000" + "_f_" + shiny + ".png"; //forme sesso formaattuale formaboh shiny
          } else if (getGender(jsonObject.forms[0].name) == "fo") {
            $cards[i].setAttribute('gender', "fo");
            genderfigure = "<img class='gender_images' src='resources/img/female-image.png' draggable='false' title='Female'>";
            $cards[i].querySelector('.card-image').src = "https://projectpokemon.org/images/sprites-models/homeimg/poke_capture_" + pad_with_zeroes(jsonObject.id, 4) + "_" + "000" + "_" + "fo" + "_" + "n" + "_" + "00000000" + "_f_" + shiny + ".png"; //forme sesso formaattuale formaboh shiny
          } else if (getGender(jsonObject.forms[0].name) == "fd") {
            $cards[i].setAttribute('gender', "fd");
            genderfigure = "<img class='gender_images' src='resources/img/female-image.png' draggable='false' title='Female'>";
            $cards[i].querySelector('.card-image').src = "https://projectpokemon.org/images/sprites-models/homeimg/poke_capture_" + pad_with_zeroes(jsonObject.id, 4) + "_" + "000" + "_" + "fd" + "_" + "n" + "_" + "00000000" + "_f_" + shiny + ".png"; //torchic dava problemi // TODO
          } else {
            $cards[i].setAttribute('gender', "mf");
            $cards[i].querySelector('.card-image').src = "https://projectpokemon.org/images/sprites-models/homeimg/poke_capture_" + pad_with_zeroes(jsonObject.id, 4) + "_" + "000" + "_" + "mf" + "_" + "n" + "_" + "00000000" + "_f_" + shiny + ".png"; //forme sesso formaattuale formaboh shiny
          }
          $cards[i].querySelector('.card-title').innerHTML = jsonObject.name.charAt(0).toUpperCase() + jsonObject.name.substring(1) + genderfigure;

          if (jsonObject.types.length == 1) {
            $cards[i].setAttribute('type', jsonObject.types[0].type.name);
            $cards[i].querySelector('.card-type-1').setAttribute("style", "visibility: hidden;");
            $cards[i].querySelector('.card-type').innerHTML = jsonObject.types[0].type.name;
            $cards[i].querySelector('.card-type').setAttribute("style", "background-color: " + typesColor.types[jsonObject.types[0].type.name].color_type);
          } else {
            $cards[i].setAttribute('type', jsonObject.types[1].type.name);
            $cards[i].setAttribute('type-1', jsonObject.types[0].type.name);
            $cards[i].querySelector('.card-type').innerHTML = jsonObject.types[1].type.name;
            $cards[i].querySelector('.card-type-1').innerHTML = jsonObject.types[0].type.name;
            $cards[i].querySelector('.card-type-1').setAttribute("style", "visibility: visible;");
            $cards[i].querySelector('.card-type').setAttribute("style", "background-color: " + typesColor.types[jsonObject.types[1].type.name].color_type);
            $cards[i].querySelector('.card-type-1').setAttribute("style", "background-color: " + typesColor.types[jsonObject.types[0].type.name].color_type);
          }

          if (shiny == "r") {
            $cards[i].setAttribute('shiny', "r");
            document.getElementById('shinystar-' + i).setAttribute("style", "visibility: visible");
          } else {
            $cards[i].setAttribute('shiny', "n");
            document.getElementById('shinystar-' + i).setAttribute("style", "visibility: hidden");
          }

          $cards[i].classList.add('card-animation');
          $cards[i].addEventListener('animationend', () => {
            $cards[i].classList.remove('card-animation');
          });

          let random = getRandomIntInclusive(10, 200);
          if ($cards[i].getAttribute('type-1') != null) {//2 tipi
            $cards[i].setAttribute('style', $cards[i].getAttribute('style') + '; background: linear-gradient(' + random + 'deg, ' + typesColor.types[$cards[i].getAttribute('type')].color_type + ' 0%, ' + typesColor.types[$cards[i].getAttribute('type-1')].color_type + ' 100%);');
          } else {//1 tipo
            $cards[i].setAttribute('style', $cards[i].getAttribute('style') + '; background: linear-gradient(' + random + 'deg, ' + typesColor.types[$cards[i].getAttribute('type')].card_linear_gradient[0] + ' 0%, ' + typesColor.types[$cards[i].getAttribute('type')].card_linear_gradient[1] + ' 100%);');
          }

          return;
        }
      }
    }
  };
  xhttp.open("GET", "https://pokeapi.co/api/v2/pokemon/" + await bestMatch(pokemonName), true);
  xhttp.send();
}

var grass = $("#Grass").get(0);
var timeline = new TimelineMax();
timeline.add("delay", 1);
timeline.from(grass, 2, { ease: Power4.easeOut, y: 100 });

$(window).on("load", function () {
  $("#loading").fadeOut();
  $("#battle-page").fadeIn("slow", function () {
    document.getElementById('battle-page').setAttribute('style', '');
  });
});

/*JS INPUT TEAM*/
$('input').on('focusin', function () {
  $(this).parent().find('label').addClass('active');
});

$('input').on('focusout', function () {
  if (!this.value) {
    $(this).parent().find('label').removeClass('active');
  }
});

$('select').each(function () {
  var $this = $(this), numberOfOptions = allStorage().length;
  $this.addClass('select-hidden');
  $this.wrap('<div class="select"></div>');
  $this.after('<div class="select-styled"></div>');

  var $styledSelect = $this.next('div.select-styled');
  $styledSelect.text($this.children('option').eq(0).text());

  var $list = $('<ul />', {
    'class': 'select-options'
  }).insertAfter($styledSelect);

  for (var i = 0; i < numberOfOptions; i++) {
    if (JSON.parse(allStorage()[i])["teamName"] != null) {
      $('<li />', {
        text: JSON.parse(allStorage()[i])["teamName"],
        rel: $this.children('option').eq(i).val()
      }).appendTo($list);
    }
  }

  var $listItems = $list.children('li');

  $styledSelect.click(function (e) {
    e.stopPropagation();
    $('div.select-styled.active').not(this).each(function () {
      $(this).removeClass('active').next('ul.select-options').hide();
    });
    $(this).toggleClass('active').next('ul.select-options').toggle();
  });

  $listItems.click(function (e) {
    e.stopPropagation();
    $styledSelect.text($(this).text()).removeClass('active');
    $this.val($(this).attr('rel'));
    $list.hide();
    //console.log($this.val());
  });

  $(document).click(function () {
    $styledSelect.removeClass('active');
    $list.hide();
  });

});