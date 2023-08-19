//
// scaleMe.js
//
// Created by alizard, August 19th 2023.
//
// This app lets you easily scale your avatar.
//
(function (){
    var jsMainFileName = "scaleMe.js";
    var ROOT = Script.resolvePath('').split(jsMainFileName)[0];

    var APP_NAME = "SCALEME";
    var APP_URL = ROOT + "index.html";
    var APP_ICON_ACTIVE = ROOT + "icons/active.png";
    var APP_ICON_INACTIVE = ROOT + "icons/inactive.png";
    var appStatus = false;
    var channel = "overte.application.more.zardsscaleme";
    var timestamp = 0;
    var INTERCALL_DELAY = 200; //0.3 sec

    var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");

    tablet.screenChanged.connect(onScreenChanged);

    var button = tablet.addButton({
        text: APP_NAME,
        icon: APP_ICON_INACTIVE,
        activeIcon: APP_ICON_ACTIVE
    });


    function clicked(){
        if (appStatus === true) {
            tablet.webEventReceived.disconnect(onAppWebEventReceived);
            tablet.gotoHomeScreen();
            appStatus = false;
        }else{
            //Launching the Application UI.
            tablet.gotoWebScreen(APP_URL); // <== Data can be transmitted at opening of teh UI by using GET method, through paramater in the URL. + "?parameter=value"
            tablet.webEventReceived.connect(onAppWebEventReceived);
            appStatus = true;
        }

        button.editProperties({
            isActive: appStatus
        });
    }

    button.clicked.connect(clicked);

    //This recieved the message from the UI(html) for a specific actions
    function onAppWebEventReceived(message) {
        if (typeof message === "string") {
            var d = new Date();
            var n = d.getTime();
            var instruction = JSON.parse(message);
            if (instruction.channel === channel) {
                if (instruction.action === "HUMAN_CALLED_ACTION_NAME" && (n - timestamp) > INTERCALL_DELAY) { //<== Use this for action trigger by a human (button or any ui control). The delay prevent multiple call to destabilize everything. 
                    d = new Date();
                    timestamp = d.getTime();
                    //Call a function to do something here
                } else if (instruction.action === "SCRIPT_CALLED_ACTION_NAME") { //<== Use this for action trigger the UI script processing. (whithout delay)
                    //Call a function to do something here
                } else if (instruction.action === "SELF_UNINSTALL" && (n - timestamp) > INTERCALL_DELAY) { //<== This is a good practice to add a "Uninstall this app" button for rarely used app. (toolbar has a limit in size) 
                    d = new Date();
                    timestamp = d.getTime();
                    ScriptDiscoveryService.stopScript(Script.resolvePath(''), false);
                }
            }
        }
    }

    //============ Add your application functions here ==================

    //Here an example of a function that would communicate data to the UI(html) for a specific action
/*
    function testCallingTheUItoSendData() {
        //ADD PROCESSING HERE

        var message = {
            "channel": channel,
            "action": "CALL_HTML_UI_ACTION_NAME",
            "data": "Hello World!"
        };

        tablet.emitScriptEvent(JSON.stringify(message));
    }
*/
    //==================================================================

    function onScreenChanged(type, url) {
        if (type === "Web" && url.indexOf(APP_URL) !== -1) {
            appStatus = true;
            //Here we know that the HTML UI is loaded.
            //We could communitate to it here as we know it is loaded.
            //testCallingTheUItoSendData();

        } else {
            appStatus = false;
        }
        
        button.editProperties({
            isActive: appStatus
        });
    }

    function cleanup() {

        if (appStatus) {
            tablet.gotoHomeScreen();
            tablet.webEventReceived.disconnect(onAppWebEventReceived);
        }

        tablet.screenChanged.disconnect(onScreenChanged);
        tablet.removeButton(button);
    }

    Script.scriptEnding.connect(cleanup);
}());