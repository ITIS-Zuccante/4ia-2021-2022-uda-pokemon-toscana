import {typesColor} from "./data/typescolor.js";

export function getDiagonalGradient(pokemonType){
    let gradients = typesColor[pokemonType].card_linear_gradient;
    let str = `linear-gradient(to bottom right`
    for(let i = Object.keys(gradients).length; i > 0; i--){
        str += `,${gradients[i-1]}`
    }
    str += ")"
    return str;
}

export function getVerticalGradient(pokemonType){
    let gradients = typesColor[pokemonType].card_linear_gradient;
    let str = `linear-gradient(${gradients[0]}, #DCDCDC)`
    return str;
}

export function getHorizontalGradient(pokemonType){
    let gradients = typesColor[pokemonType].card_linear_gradient;
    let str = `linear-gradient(to right, ${gradients[0]}, ${gradients[1]})`
    return str;
}