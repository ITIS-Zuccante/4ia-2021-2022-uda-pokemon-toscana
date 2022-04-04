const team1Button = document.getElementById('team1');
const team2Button = document.getElementById('team2');
const rulesButton = document.getElementById('rules');
const fightButton = document.getElementById('fight');

const buttons = [team1Button, team2Button, rulesButton, fightButton];

buttons.map( button => {
    button.addEventListener('click', (text) => {
        button.style.backgroundColor = "#F93C3C";
        for (let index = 0; index < buttons.length; index++) {
            console.log(buttons[index] == button);
            if(buttons[index] == button){
                if(index == 2){
                    window.open('REGOLAMENTO POKEMON.pdf', 'fullscreen=yes'); 
                }
                if(index == 3){
                    window.location.href = "fight.html";
                }
                buttons[index].style.backgroundColor = "#F93C3C";
            } else{
                buttons[index].style.backgroundColor = "#4998E0";
            }            
        }
    });
});