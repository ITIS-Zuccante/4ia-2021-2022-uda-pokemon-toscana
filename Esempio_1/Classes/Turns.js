export class Turns {
  turn = {
    left: 0, // indice variabile da 0 a 5 relativo alla giusta carta del pokemon
    right: 0,
    // actual: "",
  }

  constructor(/*whoStarts*/) {
    // if (whoStarts == undefined || whoStarts == null) console.error("Inizializzando la classe Turns devi dire chi inizia per primo!");
    // else
      // this.turn["actual"] = whoStarts; // "left" || "right"
  }

  changeTurn(side) {
    // console.log(`changeTurn + ${side}`);
    if (side == undefined || side == null) console.error("Non puoi settare il turno a null!");
    else {

      if (this.turn[side] == 5) this.turn[side] = 0; else this.turn[side] += 1;

      // console.log(`Now turn `)
      // console.log(this.turn);
    }
  }

  setSideTurn(side, index){
    // console.log(`setSideTurn - side = ${side}; index = ${index}`);
    this.turn[side] = index;
  }

  get turn() {
    return this.turn
  }; // dx o sx

}