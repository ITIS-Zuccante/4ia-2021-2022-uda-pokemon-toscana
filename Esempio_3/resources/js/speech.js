import { _BATTLE } from "./battle.js";

let recognition = new webkitSpeechRecognition();
let recognizing = false;
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-GB";

let targetmic;

/**
* Questa funziona viene utilizzata per avviare o disattivare la registrazione
* della voce.
* La variabile target viene utilizzata per modificare
*/

export function recording() {
  if (recognizing) {
    recognition.stop();
    recognizing = false;
    return;
  }
  recognizing = true;
  recognition.start();
}

recognition.onstart = () => {
  document.getElementById('mic').src = 'resources/img/mic-animate.gif';
}

recognition.onend = async function () {
  //let automaton = await Automaton();
  document.getElementById('mic').src = 'resources/img/mic.gif';
  if (window.localStorage.getItem("round") == "true") {
    _BATTLE.actions.teamAlfa = document.getElementById('form-selector-speech-input').value;
    $("#form-selector").animate({ left: "69%" }, 2500);
    window.localStorage.setItem("round", "false");
  } else {
    _BATTLE.actions.teamBeta = document.getElementById('form-selector-speech-input').value;
    $("#form-selector").animate({ left: "44.5%" }, 1250);
    window.localStorage.setItem("round", "true");
  }
  document.getElementById('form-selector-speech-input').value = "";
}

recognition.onresult = (event) => {
  document.getElementById('form-selector-speech-input').value = event.results[0][0].transcript;
}