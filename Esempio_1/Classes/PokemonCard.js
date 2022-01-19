export class PokemonCard {
  container;
  constructor(container){
    this.container = $(container);
  }

  get card() {
    return this.container.find(".pokemonCard");
  }

  get sprite(){
    return this.container.find('img');
  }

  get title() {
    return this.container.find(".card-title");
  }

  get type() {
    return this.container.find(".card_type");
  }

}