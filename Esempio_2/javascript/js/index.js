
// danger, warning, info, success
function notify(type, text, side) {
    // if (side != "")
    //     side = "-" + side

    // console.log("Notifiche TODO " + text)
    $().message({
        type: type, //'success'
        html: text,
        position: side,
    });
}