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
    nocliping = true;
    MyAvatar.isFlying = true;
}

function endNoclip(){
    MyAvatar.setCollisionsEnabled(true);
    nocliping = false;
    MyAvatar.isFlying = false;
}
