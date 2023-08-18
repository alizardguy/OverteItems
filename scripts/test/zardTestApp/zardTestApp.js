"use strict";

//
// ZardTestApp.js
// Test application for Zard
//

(function () { // BEGIN LOCAL_SCOPE
var AppUi = Script.require('appUi');

var ui;


function onMoreAppWebEventReceived(message) {
    console.log("lol");
}

function startup() {
    ui = new AppUi({
        buttonName: "ZARD-TEST", // The name of your app
        home: Script.resolvePath("zardTestApp.html"), // The path to your app's UI
        graphicsDirectory: Script.resolvePath("./") // The path to your button icons
    });

    MyAvatar.setAvatarScale(1);
}
startup();
}()); // END LOCAL_SCOPE