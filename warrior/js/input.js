const KEY_UP_ARROW = 38,
    KEY_DOWN_ARROW = 40,
    KEY_LEFT_ARROW = 37,
    KEY_RIGHT_ARROW = 39;

function setKeyHoldState(thisKey, thisPlayer, setTo) {
    if (thisKey == thisPlayer.controlKeyForNorth) {
        thisPlayer.keyHeld_North = setTo;
    }
    if (thisKey == thisPlayer.controlKeyForEast) {
        thisPlayer.keyHeld_East = setTo;
    }
    if (thisKey == thisPlayer.controlKeyForSouth) {
        thisPlayer.keyHeld_South = setTo;
    }
    if (thisKey == thisPlayer.controlKeyForWest) {
        thisPlayer.keyHeld_West = setTo;
    }
}

function keyPressed(evt) {
    // document.getElementById("debugText").innerHTML = "KeyCode Released: " +	evt.keyCode;
    setKeyHoldState(evt.keyCode, p1, true);
    evt.preventDefault();
}

function keyReleased(evt) {
    setKeyHoldState(evt.keyCode, p1, false);
}

function initInput() {
    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyReleased);
    p1.setupControls(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW);
}