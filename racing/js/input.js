const KEY_UP_ARROW = 38,
    KEY_DOWN_ARROW = 40,
    KEY_LEFT_ARROW = 37,
    KEY_RIGHT_ARROW = 39;

function keyPressed(evt) {
    setKeyHoldState(evt.keyCode, true);
    evt.preventDefault();
}

function keyReleased(evt) {
    setKeyHoldState(evt.keyCode, false);
}

function initInput() {
    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyReleased);
}