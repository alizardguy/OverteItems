// Version: 0.1
// myProfile.js
(function() {
    var jsMainFileName = "myProfile.js"; // <=== REPLACE VALUE (File name of this current .js file)
    var ROOT = Script.resolvePath('').split(jsMainFileName)[0];
    
    var APP_NAME = "MYPROFILE";
    var APP_URL = ROOT + "index.html";
    var APP_ICON_INACTIVE = ROOT + "icons/inactive.png";
    var APP_ICON_ACTIVE = ROOT + "icons/active.png";
    var appStatus = false;
    var channel = "overte.application.more.zardsmyprofile"; 
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

        sendInfoToUI();
    }

    button.clicked.connect(clicked);

    //============ application functions ==================


    function sendInfoToUI() {

        var message = {
            "channel": channel,
            "action": "GIVE_USER_INFO",
            "username": "username"
        };

        tablet.emitScriptEvent(JSON.stringify(message));
    }


    function onAppWebEventReceived(data) {
        // test
    }

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