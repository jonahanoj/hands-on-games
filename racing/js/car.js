const GROUNDSPEED_DECAY_MULT = 0.94,
    DRIVE_POWER = 0.5,
    REVERSE_POWER = 0.2,
    TURN_RATE = 0.03,
    MIN_TURN_SPEED = 0.5;

function carClass() {
    this.carX = 75;
    this.carY = 75;
    this.carSpeed = 0;
    this.carAng = -0.5 * Math.PI;
    this.keyHeld_Gas = false;
    this.keyHeld_Reverse = false;
    this.keyHeld_TurnLeft = false;
    this.keyHeld_TurnRight = false;

    this.setupControls = function(forwardKey, backKey, leftKey, rightKey) {
        this.controlKeyForGas = forwardKey;
        this.controlKeyForReverse = backKey;
        this.controlKeyForTurnLeft = leftKey;
        this.controlKeyForTurnRight = rightKey;
    }

    this.carInit = function(whichGraphic, whichName, playerNum) {
        this.myBitmap = whichGraphic;
        this.myName = whichName;
        this.playerNum = playerNum;
        this.carReset();
    }

    this.carReset = function() {
        this.carSpeed = 0;
        var carsFound = 0;
        for (var i = 0; i < curTrack.length; i++) {
            if (typeof curTrack[i] == 'string') {
                if(carsFound == this.playerNum) {
                    var carAng = 0;
                    switch (curTrack[i]) {
                        case 'U':
                            carAng = -0.5
                            break;
                        case 'D':
                            carAng = 0.5
                            break;
                        case 'L':
                            carAng = 1
                            break;
                        case 'R':
                            carAng = 0
                            break;
                        default:
                            break;
                    }
                    this.carAng = carAng * Math.PI;
                    var tileRow = Math.floor(i / TRACK_COLS);
                    var tileCol = i % TRACK_COLS;
                    this.homeX = tileCol * TRACK_W + 0.5 * TRACK_W;
                    this.homeY = tileRow * TRACK_H + 0.5 * TRACK_H;
                    break;
                }
                carsFound++;
            }
        }
        this.carX = this.homeX;
        this.carY = this.homeY;
    }

    this.carDraw = function() {
        drawImage(this.myBitmap, this.carX, this.carY, this.carAng);
    }

    this.carMove = function() {
        if (this.keyHeld_Gas) {
            this.carSpeed += DRIVE_POWER;
        }
        if (this.keyHeld_Reverse) {
            this.carSpeed -= REVERSE_POWER;
        }

        if (Math.abs(this.carSpeed) > MIN_TURN_SPEED) {
            if (this.keyHeld_TurnLeft) {
                this.carAng += -TURN_RATE * Math.PI;
            }
            if (this.keyHeld_TurnRight) {
                this.carAng += TURN_RATE * Math.PI;
            }
        }

        var nextX = this.carX + Math.cos(this.carAng) * this.carSpeed;
        var nextY = this.carY + Math.sin(this.carAng) * this.carSpeed;

        var drivingIntoTileType = getTrackAtPixelCoord(nextX, nextY);

        if(drivingIntoTileType == TRACK_ROAD) {
            this.carX = nextX;
            this.carY = nextY;
        } else if(drivingIntoTileType == TRACK_GOAL) {
            document.getElementById('debugText').innerHTML = this.myName + ' won the race!';
            curlvl++;
            if(curlvl >= trackGrids.length) {
                curlvl = 0;
            }
            curTrack = trackGrids[curlvl]
            p1.carReset();
            p2.carReset();
        } else {
            this.carSpeed *= -0.5;
        }
    
        if (Math.abs(this.carSpeed) > 0.01) {
            this.carSpeed *= GROUNDSPEED_DECAY_MULT;
        } else {
            this.carSpeed = 0;
        }
    }
}