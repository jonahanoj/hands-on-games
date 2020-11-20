const GROUNDSPEED_DECAY_MULT = 0.94,
    DRIVE_POWER = 0.5,
    REVERSE_POWER = 0.2,
    TURN_RATE = 0.03,
    MIN_TURN_SPEED = 0.5;

var carX, carY, carSpeed, carAng = 0;
var keyHeld_Gas = false;
var keyHeld_Reverse = false;
var keyHeld_TurnLeft = false;
var keyHeld_TurnRight = false;

function setKeyHoldState(thisKey, setTo) {
    if (thisKey == KEY_UP_ARROW) {
        keyHeld_Gas = setTo;
    }
    if (thisKey == KEY_DOWN_ARROW) {
        keyHeld_Reverse = setTo;
    }
    if (thisKey == KEY_LEFT_ARROW) {
        keyHeld_TurnLeft = setTo;
    }
    if (thisKey == KEY_RIGHT_ARROW) {
        keyHeld_TurnRight = setTo;
    }
}

function carInit() {
    for (var i = 0; i < trackGrid.length; i++) {
        if (trackGrid[i] == 2) {
            var tileRow = Math.floor(i / TRACK_COLS);
            var tileCol = i % TRACK_COLS;
            carX = tileCol * TRACK_W + 0.5 * TRACK_W;
            carY = tileRow * TRACK_H + 0.5 * TRACK_H;
            trackGrid[i] = TRACK_ROAD;
            break;
        }
    }

    carSpeed = 0;
    carAng = -0.5 * Math.PI;
}

function carDraw() {
    drawImage(carPic, carX, carY, carAng);
}

function carMove() {
    if (keyHeld_Gas) {
        carSpeed += DRIVE_POWER;
    }
    if (keyHeld_Reverse) {
        carSpeed -= REVERSE_POWER;
    }

    if (Math.abs(carSpeed) > MIN_TURN_SPEED) {
        if (keyHeld_TurnLeft) {
            carAng += -TURN_RATE * Math.PI;
        }
        if (keyHeld_TurnRight) {
            carAng += TURN_RATE * Math.PI;
        }
    }

    var nextX = carX + Math.cos(carAng) * carSpeed;
    var nextY = carY + Math.sin(carAng) * carSpeed;
    if (checkForTrackAtPixelCoord(nextX, nextY)) {
        carX = nextX;
        carY = nextY;
    } else {
        carSpeed *= -0.5;
    }

    if (Math.abs(carSpeed) > 0.01) {
        carSpeed *= GROUNDSPEED_DECAY_MULT;
    } else {
        carSpeed = 0;
    }
}