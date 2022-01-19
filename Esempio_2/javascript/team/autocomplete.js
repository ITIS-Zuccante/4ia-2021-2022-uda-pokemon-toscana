import { InputData } from './modules/inputData.js';
let inputData = InputData(); // assomiglia ad una new di Java

import { BestMatch } from './modules/bestMatch.js';
let bestMatch = BestMatch(); // assomiglia ad una new di Java

import { pokedex } from './modules/pokedex.js';
//let listona = pokedex; // assomiglia ad una new di Java


function autocomplete(ump) {
    let arr = pokedex;
    let inp = document.getElementById(ump + "UserInput");
    
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) {
            return false;
        }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        
        //console.log("NextSibling: "+this.parentNode.nextSibling);
        document.getElementById(ump+"Div").parentNode.appendChild(a);
        //this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("pointerover",function (e) {
                    //console.log("autocomplete : this "+this)
                    let autocompletePokeName = this.getElementsByTagName("input")[0].value;
                    document.getElementById(ump+"UserInput").value = autocompletePokeName; 
                    //console.log(autocompletePokeName);
                })
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                    inputData.inputData(ump , bestMatch.bestMatch(document.getElementById(ump+"UserInput").value));
                });
                a.appendChild(b);
            }
        }
    });

    
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/

            

            //document.getElementById(ump+"UserInput").innerHTML = x[currentFocus];
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {//ENTER
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
            //alert(ump);
           if(document.getElementById(ump+"UserInput").value !="") inputData.inputData(ump , bestMatch.bestMatch(document.getElementById(ump+"UserInput").value));
        }
    });

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
        //console.log("Autocomolete : addActive : x[currentFocus] : " + document.getElementById("leftUserInputautocomplete-list").getElementsByTagName("input")[currentFocus].value)
        document.getElementById(ump+"UserInput").value = document.getElementById(ump+"UserInputautocomplete-list").getElementsByTagName("input")[currentFocus].value;
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
        document.getElementById(ump+"UserInput").value = "";
    }

    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
 
}


/*initiate the autocomplete function on the "right" and "left" elements, and pass along the pokemon array as possible autocomplete values:*/
autocomplete("right");
autocomplete("left");
