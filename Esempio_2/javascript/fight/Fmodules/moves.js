// import {
//     Notifications
// } from './notifications.js';
// let notifications = Notifications(); // assomiglia ad una new di Java
//  // // localStorage.clear();

let leftMove = 0;
let rightMove = 0;

import {
    whosInCharge,
    inCharge
} from "../fight.js";

// import {
//     changeTurn
// } from "../Fmodules/Fturns.js"

export function Moves() {

    //------------------------------Potenza Mossa, Tipo Mossa, Damage class Mossa------------------------------//

    //chiamata asincrona effettuata con JQuery (perché con la chiamata sincrona ritornava undefined)
    function getMoveInfo(movePokemon) {
        // strUrl is whatever URL you need to call
        let moveUrl = "https://pokeapi.co/api/v2/move/" + movePokemon;
        let move = "";
        let move_all = {};
        jQuery.ajax({
            url: moveUrl,
            success: function (html) {
                move = html;
                move_all[0] = move.power;
                move_all[1] = move.type.name;
                move_all[2] = move.damage_class.name;
            },
            async: false
        });

        return move_all;
    }

    //------------------------------Potenza Mossa, Tipo Mossa, Damage class Mossa------------------------------//





    function notTarget(target) {
        switch (target) {
            case "left":
                return "right";
            case "right":
                return "left";
            default:
                "return ERROR ON MOVES.JS - NOT TARGET";
        }
    }





    //------------------------------Numero Random------------------------------//

    function getRandomInt(min, max) {

        min = Math.ceil(min);
        max = Math.floor(max);
        return (Math.floor(Math.random() * (max - min)) + min) / 100; //Il max è escluso e il min è incluso
    } //End getRandomInt

    //------------------------------Numero Random------------------------------//



    //------------------------------Capitalize------------------------------//

    function capitalize(str) {
        str = str.split(" ");

        for (var i = 0, x = str.length; i < x; i++) {
            str[i] = str[i][0].toUpperCase() + str[i].substr(1);
        }

        return str.join(" ");
    }

    //------------------------------Req------------------------------//
    function request(url) {
        var data;
        $.ajax({
            url: url,
            success: function (result) {
                data = result;
            },
            error: function () {
                alert("Non è stato possibile soddisfare la richiesta. Ricaricare la pagina");
                console.log("error: " + Error);
            },
            async: false,
        });
        return data;
    };

    //------------------------------Type effect------------------------------//
    // fetch("https://pokeapi.co/api/v2/move/144/").then(response => response.json()).then(data => { console.log(data); });

    function getTypeEffect() {
        let TYPE = 1.0;
        // let typeurl = move.type.url;
        let typeurl = "https://pokeapi.co/api/v2/move-target/10/";
        // fetch(typeurl).then(response => response.json()).then(data => {
        let data = request(typeurl);
        console.log(data)

        // double_damage_to
        console.log('data.damage_relations:  '+data.damage_relations);
        for (let i = 0; i < data.damage_relations.double_damage_to.length; i++) {   //cos'è damage_relations?
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

        // half_damage_to
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

        // no_damage_to
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

        console.log(DAMAGE);

        if (healthAmount > 0) {
            _MOVE_TYPE = move.type.name;
            if (target == "left") {
                attackAnimation("right", parseInt(DAMAGE));
            } else {
                attackAnimation("left", parseInt(DAMAGE));
            }
        }
        // });
    }
    //------------------------------Barra hp------------------------------//


    function hpBar(damage, defender) {

        let el = document.getElementById(defender + "Hp"); //prima: let el = document.getElementById(bersaglio + "Hp");
        console.log("bersaglio:  " + defender);
        // console.log("el: " + el);
        let width = Math.floor(el.offsetWidth / el.parentElement.offsetWidth * 100); //prima:  let width = Math.floor(el.offsetWidth / el.parentElement.offsetWidth * 100);

        console.log("Actual width: " + width);
        // let variation = defender.hp - dannofin;

        if (width <= 0) {

            console.error("Pokemon Difensore morto");

        } else {

            // console.log("Variation del danno pokemon " + variation);
            // console.log("defender.hp:" + defender.hp);
            // console.log("Damage:" + damage);

            let hpLeft = Math.floor((defender.hp_modify - damage) / defender.hp * 100); //ERRORE QUI!!!!
            console.log("Hp restanti :" + hpLeft);

            var id = setInterval(frame, 20);

            function frame() {
                if (width == hpLeft) {
                    clearInterval(id);

                } else {
                    width--;
                    el.style.width = width + "%";
                    console.error("tolgo la vita a: " + bersaglio)
                    if (width == 0) {
                        console.log("Pokemon is K.O.")
                        document.getElementById(bersaglio + "__card__name").innerHTML = capitalize(defender.name) + " (K.O.)"
                        return clearInterval(id);
                    }
                    //document.getElementById(target+"-pokemon-hp").innerHTML = pokemonObj.hp;
                }
                document.getElementById(bersaglio + "-pokemon-hp").innerHTML = hpLeft; //TODO aggiungere il massimo delle vite.
            }
        }
    }

    //------------------------------DANNO------------------------------//
    let tl = 0;
    let tr = 0;
    let dannofin = "";

    function damage(move, target) {


        getTypeEffect();

        //((110*Attacco*Potenza)/250*Difesa)*2*Efficacia*STAB*Modificatori*N
        // FORMULA DEL DANNO : 
        // let numeratoreParentesi = 110 * ATTACCO * POTENZA
        // let denominatoreParentesi = 250 * DIFESA
        // let esterno = EFFICACIA * STAB * MODIFICATORI * N

        // STAB: moltiplicatore che varia a seconda della corrispondenza fra il tipo della mossa usata e il pokemon attaccante
        // MODIFICATORI: TUTTI I VARI MODIFICATORI POSSIBILI
        // N = NUMERO CASUALE TRA 0.85 E 1

        console.log("DAMAGE FUNCTION CALLED");
        console.log("damage(target):" + target);

        let attacker = inCharge(target);
        let defender = inCharge(notTarget(target));

        console.log("attacker\n|");
        console.log(attacker);
        console.log("|");

        console.log("defender\n|");
        console.log(defender);
        console.log("|");

        let ATTACCO = attacker.base_attack_stats;
        console.log("ATTACCO (base_attack_stats): " + ATTACCO);

        let POTENZA = getMoveInfo(move)[0];
        console.log("POTENZA: " + POTENZA);

        // console.log("move: " + move)
        // console.log("move.type: " + move.type)
        // console.log("move.type.name: " + move.type.name)
        let TIPO_MOSSA = getMoveInfo(move)[1];

        let numeratoreParentesi = 110 * ATTACCO * POTENZA

        let DIFESA = defender.base_defence; //Difesa o la Difesa Speciale del Pokémon attaccato. OK! let DIFESA = defender.base_defence
        console.log("DIFESA: " + DIFESA);

        let denominatoreParentesi = DIFESA * 250

        let parentesi = (numeratoreParentesi / denominatoreParentesi) * 2

        //USATE VARIABILI SOTTO AL POSTO DI QUESTE
        let EFFICACIA //efficacia della mossa sul Pokémon attaccato. OK!
        let STAB //moltiplicatore che varia a seconda della corrispondenza fra il tipo della mossa usata e il tipo del pokémon attaccante. OK!
        let MODIFICATORI //altri modificatori che possono essere presenti durante l'attacco (esempio: brutto colpo). Per un elenco più completo di questi modificatori e del loro effetto. OK!

        let N = getRandomInt(85, 100); //è un numero casuale generato per ogni attacco compreso tra 0.85 e 1. OK!
        console.log("Il numero random scelto per il tuo turno è: " + N);

        let esterno = EFFICACIA * STAB * MODIFICATORI * N
        //console.log("la mossa scelta:" + move);
        // tr,tl --> Turnleft, Turnright, indica se il pokemon (target) ha già scelto la mossa
        //Se tr == 0, il pokemon non ha la mossa, se tl == 1, il pokemon ha la mossa caricata
        //Questo permette di far attacccare i 2 pokemon solamente quando entrambi hanno la mossa caricata (da sistemare)!

        // let damage = 0;
        // let level = 100;

        // let modifier = 0;
        // let A = ATTACCO;
        // let B = DIFESA;
        // console.log("B = DIFESA prima:  " + B);
        //Controllo chi attacca e chi difende
        // if (!(getMoveInfo(move)[2] == 'physical')) {
        //     A = attacker.special_attack;
        //     B = defender.special_attack;
        // }
        // console.log("prova danno in damage [A] == " + A);
        // console.log("prova danno in damage [B] == " + B);
        // if (!(getMoveInfo(move)[2] == 'physical')) {
        //     A = attacker.special_attack;
        //     B = defender.special_defence;
        // }

        //console.log("Prova modificatori: " + A + " " + B);
        // console.log("POTENZA: " + POTENZA);
        // damage = ((level * POTENZA * A) / (250 * B)) + 2; //danno base senza modificatori
        //console.log("damage intermedio: " + damage);
        // console.log("level:  " + level);
        // console.log("POTENZA:  " + POTENZA);
        // console.log("A:  " + A);
        // console.log("B:  " + B);
        // console.log("damage senza modificatori:  " + damage);

        // Modificatori del danno
        let efficency = 0;
        var e1 = 0;
        var e2 = 0;
        var movetype = "";
        let stab = 1;

        //I tipi dei pokemon
        var TYPES = ["normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel"];

        //Efficacia delle mosse a seconda dei tipi
        var TYPE_CHART = {
            normal: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0, 1, 1, 0.5],
            fire: [1, 0.5, 0.5, 1, 2, 2, 1, 1, 1, 1, 1, 2, 0.5, 1, 0.5, 1, 2],
            water: [1, 2, 0.5, 1, 0.5, 1, 1, 1, 2, 1, 1, 1, 2, 1, 0.5, 1, 1],
            electric: [1, 1, 2, 0.5, 0.5, 1, 1, 1, 0, 2, 1, 1, 1, 1, 0.5, 1, 1],
            grass: [1, 0.5, 2, 1, 0.5, 1, 1, 0.5, 2, 0.5, 1, 0.5, 2, 1, 0.5, 1, 0.5],
            ice: [1, 0.5, 0.5, 1, 2, 0.5, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, 0.5],
            fighting: [2, 1, 1, 1, 1, 2, 1, 0.5, 1, 0.5, 0.5, 0.5, 2, 0, 1, 2, 2],
            poison: [1, 1, 1, 1, 2, 1, 1, 0.5, 0.5, 1, 1, 1, 0.5, 0.5, 1, 1, 0],
            ground: [1, 2, 1, 2, 0.5, 1, 1, 2, 1, 0, 1, 0.5, 2, 1, 1, 1, 2],
            flying: [1, 1, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 0.5],
            psychic: [1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 0.5, 1, 1, 1, 1, 0, 0.5],
            bug: [1, 0.5, 1, 1, 2, 1, 0.5, 0.5, 1, 0.5, 2, 1, 1, 0.5, 1, 2, 0.5],
            rock: [1, 2, 1, 1, 1, 2, 0.5, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 0.5],
            ghost: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 0.5],
            dragon: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0.5],
            dark: [1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 0.5],
            steel: [1, 0.5, 0.5, 0.5, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0.5]
        };


        //tipo mossa del pokemon che attacca(attacker)
        // movetype = getMoveInfo(move)[1]; //move[1] per il tipo della mossa


        //tipo del pokemon che subisce la mossa(defender)

        movetype = getMoveInfo(move)[1];
        if (attacker.types[1] == null) {
            for (let j = 0; j < TYPES.length; j++) {
                if (TYPES[j] == attacker.types[0]) {
                    efficency = TYPE_CHART[movetype][j];
                    if (TYPES[j] == TYPE_CHART[movetype]) {
                        stab = 1.5;
                    }
                }
            }
        } else {
            for (let k = 0; k < TYPES.length; k++) {
                if (TYPES[k] == attacker.types[0]) {
                    e1 = TYPE_CHART[movetype][k];
                }
                if (TYPES[k] == attacker.types[1]) {
                    //console.log(k);
                    e2 = TYPE_CHART[movetype][k];
                }
            }

            if (e1 >= e2) {
                efficency = e2;
            } else {
                efficency = e1;
            }

        }
        console.log("efficency after eff_func: " + efficency)
        damage = damage * efficency * stab; //Danno finale con modificatori
        console.log("damage:  " + damage);
        console.log("efficency:  " + efficency);
        console.log("stab:  " + stab);
        dannofin = damage;
        console.log("damage finale: " + damage);

        hpBar(damage, defender);
    }

    return {
        "damage": damage,
        "getMoveInfo": getMoveInfo
    }
}