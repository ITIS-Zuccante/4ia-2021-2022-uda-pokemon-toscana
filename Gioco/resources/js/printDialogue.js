const textBox = document.getElementById("dialogue")
const box = document.getElementsByClassName("dialogueBox")

export async function printDialogue(str){
    box[0].style.visibility = "visible"
    box[0].style.bottom = "8%"
    let output = ""
    for(let i = 0; i < str.length; i++) {
        output = output.concat(str[i]);
        textBox.innerHTML = output
        await sleep(40)
    }
    await sleep(1000)
}

export function closeDialogue(){
    box[0].style.bottom = "0%"
    box[0].style.visibility = "hidden"
    textBox.innerHTML = ""
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}