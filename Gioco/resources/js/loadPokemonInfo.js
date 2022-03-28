import {getMove, movesList} from "./data/pokedex.js";

export async function loadInfo(pokemon) {
    const level = 84
    const effortValue = 15
    const movedId = ["???","???","???","???"]
    
    let types = [];
    for (let type of pokemon.types) {
        types.push(type.type.name)
    }

    let i = 0;
    let moves = []
    
    while(i < 4){
        let rnd = Math.round(Math.random() * (pokemon.moves.length-1))
        if(pokemon.moves[rnd].version_group_details[0].move_learn_method.name == "level-up" || pokemon.moves[rnd].version_group_details[0].move_learn_method.name == "tutor" || pokemon.moves[rnd].version_group_details[0].move_learn_method.name == "form-change" || pokemon.moves[rnd].version_group_details[0].move_learn_method.name == "egg"){
            let move = await getMove(pokemon.moves[rnd].move.name)
            if(!(movedId.includes(move.id)) && movesList.includes(move.names[7].name)){
                movedId[i++] = move.id
                moves.push(move)
            }
        }
    }

    let hp = Math.floor((2 * pokemon.stats[0].base_stat + Math.floor(Math.random() * 32) + effortValue) * level/100) + level + 10

    const [,attack, defense, specialAttack, specialDefense, speed] = pokemon.stats;
    return {
        name: pokemon.name[0].toUpperCase() + pokemon.name.substring(1).replace("-", " "),
        id: pokemon.id,
        stages: {
            "attack" : 0,
            "defense" : 0,
            "specialAttack" : 0,
            "specialDefese" : 0,
            "speed" : 0
        },
        accuracyModifier: 1,
        type: types,
        startHP: hp,
        hp: hp,
        sprites:{
            front_default: pokemon.sprites["front_default"],
            back_default: pokemon.sprites["back_default"]
        },
        attack: Math.floor(Math.floor((2*attack.base_stat+Math.floor(Math.random() * (32))+effortValue)*level/100+5)),
        defense: Math.floor(Math.floor((2*defense.base_stat+Math.floor(Math.random() * (32))+effortValue)*level/100+5)),
        specialAttack: Math.floor(Math.floor((2*specialAttack.base_stat+Math.floor(Math.random() * (32))+effortValue)*level/100+5)),
        specialDefense: Math.floor(Math.floor((2*specialDefense.base_stat+Math.floor(Math.random() * (32))+effortValue)*level/100+5)),
        speed: Math.floor(Math.floor((2*speed.base_stat+Math.floor(Math.random() * (32))+effortValue)*level/100+5)),
        moves:[
            {
                name: moves[0].names[7].name,
                info: moves[0],
                currentPP: moves[0].pp
            },
            {
                name: moves[1].names[7].name,
                info: moves[1],
                currentPP: moves[1].pp
            },
            {
                name: moves[2].names[7].name,
                info: moves[2],
                currentPP: moves[2].pp
            },
            {
                name: moves[3].names[7].name,
                info: moves[3],
                currentPP: moves[3].pp
            }
        ]
    }
}
