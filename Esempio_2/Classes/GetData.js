
export class GetData {
  pokemon;
  
  constructor() {}

  /* 
    TODO IMPLEMENTARE LA FUNZIONE CHE TROVI I POKEMON CON CARATTERI SPECIALI
  */
  getPokemonFromPokeApi(idOrName) {
    this.pokemon = {};
    // se name != undefined OPPURE id != undefined
    if (idOrName != "" && idOrName != undefined && idOrName != null) {
      console.info("getPokemonFromPokeApi");
      // console.log(idOrName);
      // Ajax call
      $.ajax({
        async: false,
        url: `https://pokeapi.co/api/v2/pokemon/${idOrName}`,
        type: "GET",
        dataType: 'json',

        success: (data) => {
          this.pokemon = data;
        },

        error: function (e) {
          // pokemonJson = "ERROR";
          this.pokemon = {};
          console.error("Ajax call erorr")
          console.error(e);
        }
      })

    } else {
      console.error(`GetPokemonFromPokeApi Error: ID and Name are undefined or null!`);
    }
    return this.pokemon;
  }
}