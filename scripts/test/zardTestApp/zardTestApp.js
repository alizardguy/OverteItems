"use strict";

//
// ZardTestApp.js
// Test application for Zard
//

(function () { // BEGIN LOCAL_SCOPE
var AppUi = Script.require('appUi');

var ui;
var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");

function onWebEventReceived(event) {
    console.log("lol")
}

tablet.webEventReceived.connect(onWebEventReceived);


function startup() {
    ui = new AppUi({
        buttonName: "ZARD-TEST", // The name of your app
        home: Script.resolvePath("zardTestApp.html"), // The path to your app's UI
        graphicsDirectory: Script.resolvePath("./") // The path to your button icons
    });

    console.log("setup complete");

}
startup();
}()); // END LOCAL_SCOPE
