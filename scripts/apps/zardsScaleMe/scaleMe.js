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

    // make button in tablet
    var button = tablet.addButton({
        text: APP_NAME,
        icon: APP_ICON_INACTIVE,
        activeIcon: APP_ICON_ACTIVE
    });

    // function to call when tablet button is clicked
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

    //This receives the webEvents from the Application UI.
    function onAppWebEventReceived(message){
        if (typeof message === "string"){
            var d = new Date();
        }
    }
})