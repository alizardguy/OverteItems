var crouching = false;
var capsule = MyAvatar.getCollisionCapsule();

var crouchAnim = Script.resolvePath("./Animations/CrouchingIdle.fbx");

function keyPressEvent(event) {
    if ((event.text.toUpperCase() === "C") &&
            !event.isMeta &&
            !event.isControl &&
            !event.isAlt &&
            !HMD.active) {
                if (!crouching){
                    startCrouch();
                }
            }
}

function keyReleaseEvent(event){
    if (event.text.toUpperCase() === "C") {
                if (crouching){
                    endCrouch();
                }
            }
}


Controller.keyReleaseEvent.connect(keyReleaseEvent);
Controller.keyPressEvent.connect(keyPressEvent);

function startCrouch(){
    crouching = true;
    MyAvatar.overrideAnimation(crouchAnim, 30, true, 0, 1);
}

function endCrouch(){
    crouching = false;
    MyAvatar.restoreAnimation();
}