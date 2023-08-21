var nocliping = false;

function keyPressEvent(event) {
    if ((event.text.toUpperCase() === "V") &&
            !event.isMeta &&
            !event.isControl &&
            !event.isAlt &&
            !HMD.active) {
                if (!nocliping){
                    startNoclip();
                } 
                else {
                    endNoclip();
                }
            }
}

Controller.keyPressEvent.connect(keyPressEvent);

function startNoclip(){
    MyAvatar.setCollisionsEnabled(false);
    MyAvatar.setFlyingEnabled(true);
    nocliping = true;
}

function endNoclip(){
    MyAvatar.setCollisionsEnabled(true);
    MyAvatar.setFlyingEnabled(false);
    nocliping = false;
}
