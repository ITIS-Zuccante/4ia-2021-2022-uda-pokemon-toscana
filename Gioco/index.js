const team1Button = document.getElementById('team1');
const team2Button = document.getElementById('team2');
const rulesButton = document.getElementById('rules');
const fightButton = document.getElementById('fight');
const team1Window = document.getElementById('team1Choose');
const team2Window = document.getElementById('team2Choose');
const defaultView = document.getElementById('default');
const rulesWindow = document.getElementById('rulesPDF');
const logoButton  = document.getElementById('logoButton');
const next1Button = document.getElementById('next1');
const next2Button = document.getElementById('next2');

window.addEventListener("load", function() {
    team1Window.style.display = "none";
    team2Window.style.display = "none";
    rulesWindow.style.display = "none";
});

const buttons = [logoButton, team1Button, team2Button, rulesButton, fightButton];

buttons.map( button => {
    button.addEventListener('click', (text) => {
        defaultView.style.display = "none";
        //button.style.backgroundColor = "#F93C3C";
        for (let index = 0; index < buttons.length; index++) {
            if(buttons[index] == button){
                switch (index){//ROSSO
                    /*case 0:
                        defaultView.style.display = "block";
                        continue;*/
                    case 1: 
                        team1Window.style.display = "block";
                        break;
                    case 2:
                        team2Window.style.display = "block";
                        break;
                    case 3: 
                        rulesWindow.style.display = "block";
                        break;
                    case 4:
                        window.location.href = "fight.html";
                }
                buttons[index].style.backgroundColor = "#F93C3C";
            } else {//BLU
                if(index == 0){
                    defaultView.style.display = "none";
                    continue;
                } else if(index == 1){
                    team1Window.style.display = "none";
                } else if(index == 2){
                    team2Window.style.display = "none";
                } else if(index == 3){
                    rulesWindow.style.display = "none";
                }
                buttons[index].style.backgroundColor = "#4998E0";
            }            
        }
    });
});

next1Button.addEventListener("click",() => {
    team1Window.style.display = "none";
    team2Window.style.display = "block";
    buttons[1].style.backgroundColor = "#4998E0";
    buttons[2].style.backgroundColor = "#F93C3C";
})

next2Button.addEventListener("click",() => {
    team2Window.style.display = "none";
    rulesWindow.style.display = "block";
    buttons[2].style.backgroundColor = "#4998E0";
    buttons[3].style.backgroundColor = "#F93C3C";
})

