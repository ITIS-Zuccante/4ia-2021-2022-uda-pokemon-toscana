import { Automaton } from "./automaton.js";
const inputFieldTeam1 = document.getElementById("input1");
const inputFieldTeam2 = document.getElementById("input2");
const inputField = [inputFieldTeam1, inputFieldTeam2];

let automaton = Automaton();

export function WebSpeech(currentTeam) {
    let recognizer = new webkitSpeechRecognition()
        || new Speechrecognition()
        || null;

    let final_transcript = "";
    let interim_transcript = "";

    if (recognizer != null) {
        recognizer.continuous = true;
        recognizer.interimResults = true;
        recognizer.active = false;
        recognizer.ignore_onend = false;
        recognizer.final_transcript = '';
        recognizer.interim_transcript = '';
        recognizer.lang = 'it-IT';


        recognizer.onstart = () => {
            this.active = true;
        };

        recognizer.onerror = (event) => {
            console.log(event.error);
            this.ignore_onend = true;
        };

        recognizer.onend = () => {
            this.active = false;
            if (!this.ignore_onend) {
                console.log(this.final_transcript);
            }
            this.stop();
        };

        recognizer.onresult = (event) => {
            console.log(typeof (event.results));
            console.log(event.results);
            if (typeof (event.results) == 'undefined') {
                this.onend = null;
                this.stop();
            } else {
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    if (event.results[i].isFinal) {
                        inputField[currentTeam].value += event.results[i][0].transcript;
                        final_transcript += event.results[i][0].transcript;
                        automaton.run(final_transcript);
                    } else {
                        interim_transcript += event.results[i][0].transcript;
                    }
                }
            }
        };
        let start = () => {
            try {
                recognizer.start();
            } catch (ex) {
                console.log("Browser does not support web speech API.");
            }
        };

        return {
            "start" : start(),
            //"stop"  :  this.stop,
            "getText": () => { return final_transcript; }
        }
    } else {
        return null;
    }
}