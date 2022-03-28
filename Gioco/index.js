const openModalButton = document.getElementById("helpButton")
const closeModalButton = document.getElementById("closeButton")
const nextPageButton = document.getElementById("nextPage")
const previousPageButton = document.getElementById("previousPage")
const text = document.getElementById("modalContainer")
const modal = document.getElementById("modal");
const button = document.querySelector('button')


let currentPage = 1;
let maxPages = 3;

openModalButton.addEventListener('click', () =>{
    modal.style.display = "block";
    button.disabled = true;
})

closeModalButton.addEventListener('click', () =>{
    modal.style.display = "none"
    button.disabled = false;
})

nextPageButton.addEventListener('click', () =>{
    if(currentPage < maxPages) {
        currentPage++;
        displayPage();
    }
})

previousPageButton.addEventListener('click', () =>{
    if(currentPage > 1){
        currentPage--
        displayPage()
    }
})

function displayPage(){
    text.style.backgroundImage = `url('/images/writings/rules/rules_${currentPage}.png')`;
}