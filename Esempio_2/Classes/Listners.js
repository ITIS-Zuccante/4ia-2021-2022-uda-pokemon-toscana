import {
  SelectPokemon
} from './SelectPokemon.js';
import {
  Pokemon
} from './Pokemon.js';
import {
  Turns
} from './Turns.js';
import {
  pokedex
} from './datas/pokedex.js';
import {
  GetData
} from './GetData.js';
import {
  PokemonCard
} from './PokemonCard.js';
import {
  Notify
} from './Notify.js';
import {
  Colors
} from './Colors.js';

class Listners {
  // Elements
  side;
  container;
  iChooseYouBtn;
  randomBtn;

  // Classes
  _turns;
  _selectPokemon;
  _getData;
  _pokemonCard;
  _notify;
  _colors;

  constructor(side) {
    this.side = side;
    this.container = $('.' + side + '-side-container');
    this.setUpListners();
    this._turns = new Turns();
    this._notify = new Notify();
    this._colors = new Colors();
    this._getData = new GetData();
    this._pokemonCard = new PokemonCard("." + side + "-side-cards");
    this._selectPokemon = new SelectPokemon();
  }

  _capitalize(string){
    return string.charAt(0).toUpperCase() + string.substring(1, string.length)
  }

  setUpListners() {
    this.container.find(".iChooseYouButton").on("click", () => {
      this.iChooseYouClicked();
    });

    this.container.find("input[type=text]").keydown((e) => {
      e.keyCode == 13 ? this.iChooseYouClicked() : null
    })

    this.container.find(".randomButton").on("click", () => {
      this.randomButtonClicked()
    });
  }

  get input() {
    return this.container.find('input[type=text]');
  }

  get pokemonCard() {
    return this.container.find('.pokemonCard');
  }

  loadPokemonToHtmlObject(pokemon) {
    let actualTurn = this._turns.turn[this.side];
    let pokemonCardSprite = $(this._pokemonCard.sprite.toArray()[actualTurn]);
    let pokemonCardTitle = $(this._pokemonCard.title.toArray()[actualTurn]);
    let pokemonCardType = $(this._pokemonCard.type.toArray()[actualTurn]);

    pokemonCardTitle.text(this._capitalize(pokemon.name));
    pokemonCardSprite.attr("src", pokemon.sprites);

    let types = pokemon.types[1] == undefined ? pokemon.types[0].type.name : (pokemon.types[0].type.name + "-" + pokemon.types[1].type.name);
    pokemonCardType.text(types);

    // el.text("Pokemon");
    this._turns.changeTurn(this.side);
    this._notify.success(`<strong> ${pokemon.name.toUpperCase()}</strong> scelgo te!`, `${this.side}`)
    this._colors.color($(this._pokemonCard.type.toArray()[actualTurn]), pokemon.types, true);
    this._colors.color($(this._pokemonCard.card.toArray()[actualTurn]), pokemon.types);
    
  }

  getDataAndSetPokemon(pokeNameOrID) {
    let pokemon = this._getData.getPokemonFromPokeApi(pokeNameOrID);
    if (pokemon != undefined && pokemon.name != undefined && pokemon.name != "") {
      let newPokemon = new Pokemon(pokemon);
      this.loadPokemonToHtmlObject(newPokemon);
    } else {
      this._notify.error("Errore nel caricamento del pokemon", `${this.side}`)
    }
  }

  iChooseYouClicked() {
    if(this.input.val().replaceAll(" ", "") != "" && this.input.val() != undefined)
    this.getDataAndSetPokemon(this._selectPokemon.bestMatch(this.input.val(), pokedex).toLowerCase());
    this.input.val("");
  }

  randomButtonClicked() {
    this.getDataAndSetPokemon(pokedex[Math.floor(Math.random() * pokedex.length)].toString().toLowerCase());
  }
}


new Listners("left");
new Listners("right");