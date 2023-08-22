function keyPressEvent(event) {
    if ((event.text.toUpperCase() === "V") &&
            !event.isMeta &&
            !event.isControl &&
            !event.isAlt &&
            !HMD.active) {
                toggleNoclip();
            }
}

Controller.keyPressEvent.connect(keyPressEvent);

function toggleNoclip(){
    MyAvatar.setCollisionsEnabled(!MyAvatar.getCollisionsEnabled());
    MyAvatar.isFlying = !MyAvatar.isFlying;
}