export class Pokemon {

  //fields of the object
  abilities;
  id;
  moves;
  name;
  sprites;
  stats;
  types;

  constructor(pokemon) {
    console.log(pokemon)
    this.abilities = pokemon.abilities; // array
    this.id = pokemon.id; // int
    this.moves = pokemon.moves; // array di hash
    this.name = pokemon.name; // string
    this.sprites = pokemon.sprites.front_default; // link (string)
    this.stats = pokemon.stats; // Array di hash
    this.types = pokemon.types; // array
    

    console.log("OldPoke");
    console.log(pokemon);

    console.log("new Poke")
    console.log(this);
  }


  toString() {
    return this.toString();
  }
}