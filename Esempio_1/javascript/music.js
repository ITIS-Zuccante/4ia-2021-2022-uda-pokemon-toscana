let mainTheme = new Audio("misc/sound.mp3");

function music() {
    mainTheme.loop = true;
    mainTheme.volume = 0.4;
    mainTheme.play();
}

function music_stop() {

    mainTheme.pause();
    mainTheme.currentTime = 0;
}

function onoff() { //music button
    currentvalue = document.getElementById('onoff').value;
    if (currentvalue == "Off") {
        music_stop();
        document.getElementById("onoff").value = "On";
        document.getElementById("onoff").innerHTML = "Sound ON";
        alert("Music turned off");

    } else {
        music();
        document.getElementById("onoff").value = "Off";
        document.getElementById("onoff").innerHTML = "Sound OFF";
        alert("Currently playing Route 209 (day)");
    }
}