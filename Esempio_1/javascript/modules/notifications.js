
export function Notifications() {
    function notify(target, msg) {

        console.log("Msg " + msg)
        let notEl = document.getElementById(target + "Notification");
        if(notEl)notEl.style.display = "block"
        document.getElementById(target + "NotificationSpan").innerHTML = (msg);

        //notEl.classList = "notification disappear";
        //notEl.classList = "notification";
        /*
        let id = setInterval(disappear, 50);
    
        let i = 100;
        function disappear() {
            notEl.style.opacity = i / 100;
            if (i == 0) {
                clearInterval(id);
            }
            i--;
        }*/
    }
    return {
        "notify": notify
    }
}
