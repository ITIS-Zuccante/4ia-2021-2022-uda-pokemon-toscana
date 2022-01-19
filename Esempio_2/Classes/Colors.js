import {
  colors
} from './datas/colors.js';

export class Colors {
  constructor() {}

  _randomNumber0To100(){
  return Math.floor(Math.random() * 100);
  }

  _newLinearGradient(color0, color1){
    return `linear-gradient(${this._randomNumber0To100()}deg, ${color0}, ${color1})`;
  }

  color(htmlElement, types, border = false) {
    // console.log(types);
    let types2 = types
    // console.warn(colors.types);
    // console.warn(colors.types[types2[0].type.name]);
    let newColors = [];
    if (types[1] == undefined) {
      newColors[0] = colors.types[types2[0].type.name].card_linear_gradient[0];
      newColors[1] = colors.types[types2[0].type.name].card_linear_gradient[1]
    } else {
      newColors[0] = colors.types[types2[0].type.name].color_type;
      newColors[1] = colors.types[types2[1].type.name].color_type;
    }

    let linear_gradient_template = this._newLinearGradient(newColors[0],newColors[1]);
    $(htmlElement).css('background', linear_gradient_template);
    if(border){
      $(htmlElement).css('border', linear_gradient_template);

    }

  }

}