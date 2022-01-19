/*
* This method is used to make the Pokédex which consists of an array containing all the names
* of the pokenons with different languages.
*/
export async function getPokedex() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=999999999'); //TODO: DA RIVEDERE (SOLO 1000?!?!?1)
    if (response.ok) {
        return await response.json();
    } else {
        console.log('Error: pokedex error');
    }
}