'use strict';

$(document).ready(function () {
    // var inputValue = $("#leftNotificationText");
    var message6, $leftNotificationTest = $('#leftNotification');
    $('#leftNotification').click(function () {
        message6 = $().message({
            type: 'success',
            html: "inputValue.val()",
            position: 'bottom-left',
        });
    });
});