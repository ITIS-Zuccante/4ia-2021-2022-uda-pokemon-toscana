const team1Button = document.getElementById('team1');
const team2Button = document.getElementById('team2');
const rulesButton = document.getElementById('rules');
const fightButton = document.getElementById('fight');
const team1Window = document.getElementById('team1Choose');
const team2Window = document.getElementById('team2Choose');

window.addEventListener("load", function() {
    team1Window.style.display = "none";
    team2Window.style.display = "none";
});


const buttons = [team1Button, team2Button, rulesButton, fightButton];

buttons.map( button => {
    button.addEventListener('click', (text) => {
        button.style.backgroundColor = "#F93C3C";
        for (let index = 0; index < buttons.length; index++) {
            console.log(buttons[index] == button);
            if(buttons[index] == button){
                switch (index){
                    case 0: 
                        team1Window.style.display = "block";
                        break;
                    case 1:
                        team2Window.style.display = "block";
                        break; 
                    case 2: 
                        window.open('REGOLAMENTO POKEMON.pdf', 'fullscreen=yes');
                        break;
                    case 3:
                        window.location.href = "fight.html";
                }
                buttons[index].style.backgroundColor = "#F93C3C";
            } else{
                if(index == 0){
                    team1Window.style.display = "none";
                } else if(index == 1){
                    team2Window.style.display = "none";
                }
                buttons[index].style.backgroundColor = "#4998E0";
            }            
        }
    });
});