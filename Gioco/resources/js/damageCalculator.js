import {typeEffectivness} from "./data/typeEffectivness.js";
import { printDialogue } from "./printDialogue.js";

export function calculateDamage(pokemonAtk, pokemonDef, move){
    let defaultPokeLevel = 84;
    let movePower = move.info.power;
    let atkValue = pokemonAtk.attack;
    let defValue = pokemonDef.defense
    let specialAtkValue = pokemonAtk.specialAttack
    let specialDefValue = pokemonDef.specialDefense
    let targets = 1;
    let weather = 1;
    let badge = 1;
    let critical = 1;
    let random = (Math.random() * (1.00 - 0.85) + 0.85)
    let stab = 1;
    let type = calcTypeEffect(pokemonAtk, pokemonDef, move);
    let baseDamage = 0;
    if(move.info.damage_class.name == "physical"){
        baseDamage = (((((2*defaultPokeLevel)/5)+2)*movePower*(atkValue/defValue))/50)+2
    }
    else if(move.info.damage_class.name == "special"){
        baseDamage = (((((2*defaultPokeLevel)/5)+2)*movePower*(specialAtkValue/specialDefValue))/50)+2
    }

    if(type == 0){console.log("It's ineffective..")}
    else if(type == 0.25){console.log("It's not very effective..")}
    else if(type == 0.5){console.log("It's not very effective..")}
    else if(type == 2){console.log("It's effective!...")}
    else if(type == 4){console.log("It's super effective!...")}

    if(type == 0){printDialogue("It's ineffective..")}
    else if(type == 0.25){printDialogue("It's not very effective..")}
    else if(type == 0.5){printDialogue("It's not very effective..")}
    else if(type == 2){printDialogue("It's effective!...")}
    else if(type == 4){printDialogue("It's super effective!...")}

    let finalDamage = (baseDamage * targets * weather * badge * critical * random * stab * type)
    //let finalDamage = (baseDamage * targets * weather * badge * critical * random * stab * type *10000)
    return finalDamage
}



function calcTypeEffect(pokemonAtk, pokemonDef, move){
    let defTypes = pokemonDef.type;
    let moveType = move.info.type.name
    let damage1 = 1;
    let damage2 = 1;


    if(typeEffectivness[moveType][defTypes[0]]) {
        damage1 = typeEffectivness[moveType][defTypes[0]]
    }
    if(defTypes.length > 1){
        if(typeEffectivness[moveType][defTypes[1]]) {
            damage2 = typeEffectivness[moveType][defTypes[1]]
        }
    }


    return damage1 * damage2
}


export function calculateEffect(pokemonDef, pokemonAtk, move){

    let stats = {
        "attack" : "attack",
        "defense" : "defense",
        "special-attack" : "specialAttack",
        "special-defense" : "specialDefense",
        "speed" : "speed",
        "accuracy" : "accuracy"
    }
    let target = move.info.target.name

    if(move.info.stat_changes[0].stat.name != "accuracy"){
        if(target == "random-opponent" || target == "all-other-pokemon" || target == "selected-pokemon" || target == "all-opponents") {
            let defStage = pokemonDef.stages[stats[move.info.stat_changes[0].stat.name]] += move.info.stat_changes[0].change
            let multiplier
            if (defStage > 0)
                multiplier = (2 + defStage) / 2
            else
                multiplier = 2 / (2 + Math.abs(defStage))
            pokemonDef[stats[move.info.stat_changes[0].stat.name]] = Math.round(pokemonDef[stats[move.info.stat_changes[0].stat.name]] * multiplier)
        }
        else if(target == "ally" || target == "user-or-ally" || target == "user" || target == "user-and-allies" || target == "all-allies"){  //TODO DA TESTARE
            let atkStage = pokemonAtk.stages[stats[move.info.stat_changes[0].stat.name]] += move.info.stat_changes[0].change
            let multiplier
            if (atkStage > 0)
                multiplier = (2 + atkStage) / 2
            else
                multiplier = 2 / (2 + Math.abs(atkStage))
            pokemonAtk[stats[move.info.stat_changes[0].stat.name]] = Math.round(pokemonAtk[stats[move.info.stat_changes[0].stat.name]] * multiplier)
        }
    }
    else{  // TODO: CAPIRE SE L'ACCURACY SI MODIFICA DI UNA MOSSA O NO
        if(target == "random-opponent" || target == "all-other-pokemon" || target == "selected-pokemon" || target == "all-opponents") {
            let defStage = pokemonDef.stages[stats[move.info.stat_changes[0].stat.name]] += move.info.stat_changes[0].change
            let multiplier
            if (defStage > 0)
                multiplier = (3 + defStage) / 3
            else
                multiplier = 3 / (3 + Math.abs(defStage))
            pokemonDef.accuracyModifier = Math.round(pokemonDef.accuracyModifier * multiplier)
        }

        else if(target == "ally" || target == "user-or-ally" || target == "user" || target == "user-and-allies" || target == "all-allies"){  //TODO DA TESTARE
            let atkStage = pokemonAtk.stages[stats[move.info.stat_changes[0].stat.name]] += move.info.stat_changes[0].change
            let multiplier
            if (atkStage > 0)
                multiplier = (3 + atkStage) / 3
            else
                multiplier = 3 / (3 + Math.abs(atkStage))
            pokemonAtk.accuracyModifier = Math.round(pokemonAtk.accuracyModifier * multiplier)
        }
    }

}
