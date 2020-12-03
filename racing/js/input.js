const KEY_UP_ARROW = 38,
    KEY_DOWN_ARROW = 40,
    KEY_LEFT_ARROW = 37,
    KEY_RIGHT_ARROW = 39,
    KEY_LETTER_W = 87;
    KEY_LETTER_A = 65,
    KEY_LETTER_S = 83,
    KEY_LETTER_D = 68;

function setKeyHoldState(thisKey, thisCar, setTo) {
    if (thisKey == thisCar.controlKeyForGas) {
        thisCar.keyHeld_Gas = setTo;
    }
    if (thisKey == thisCar.controlKeyForReverse) {
        thisCar.keyHeld_Reverse = setTo;
    }
    if (thisKey == thisCar.controlKeyForTurnLeft) {
        thisCar.keyHeld_TurnLeft = setTo;
    }
    if (thisKey == thisCar.controlKeyForTurnRight) {
        thisCar.keyHeld_TurnRight = setTo;
    }
}

function keyPressed(evt) {
    // document.getElementById("debugText").innerHTML = "KeyCode Released: " +	evt.keyCode;
    setKeyHoldState(evt.keyCode, p1, true);
    setKeyHoldState(evt.keyCode, p2, true);
    evt.preventDefault();
}

function keyReleased(evt) {
    setKeyHoldState(evt.keyCode, p1, false);
    setKeyHoldState(evt.keyCode, p2, false);
}

function initInput() {
    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyReleased);
    p1.setupControls(KEY_UP_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW, KEY_RIGHT_ARROW);
    p2.setupControls(KEY_LETTER_W, KEY_LETTER_S, KEY_LETTER_A, KEY_LETTER_D);
}