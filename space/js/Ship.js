// tuning constants 
const SPACESPEED_DECAY_MULT = 0.99;
const THRUST_POWER = 0.15;
const TURN_RATE = 0.03;

function shipClass() {
  // variables to keep track of position 
  this.x = 75;
  this.y = 75;
  this.driftY = 0;
  this.driftX = 0;

  // keyboard hold state variables, to use keys more like buttons
  this.keyHeld_Gas = false;
  this.keyHeld_Reverse = false;
  this.keyHeld_TurnLeft = false;
  this.keyHeld_TurnRight = false;

  this.handleScreenWrap = function () {
    if (this.y > canvas.height) {
      this.y = this.y - canvas.height
    }
    if (this.y < 0) {
      this.y = this.y + canvas.height
    }
    if (this.x > canvas.width) {
      this.x = this.x - canvas.width
    }
    if (this.x < 0) {
      this.x = this.x + canvas.width
    }
  }

  // key controls used for this 
  this.setupControls = function (forwardKey, backKey, leftKey, rightKey) {
    this.controlKeyForGas = forwardKey;
    this.controlKeyForReverse = backKey;
    this.controlKeyForTurnLeft = leftKey;
    this.controlKeyForTurnRight = rightKey;
  }

  this.init = function (whichGraphic) {
    this.myBitmap = whichGraphic;
    this.reset();
  }

  this.reset = function () {
    this.ang = -0.5 * Math.PI;
    this.x = canvas.width / 2
    this.y = canvas.height / 2
    this.driftX = 0;
    this.driftY = 0;
  } // end of reset 

  this.move = function () {
    // only allow turning while it's moving 
      if (this.keyHeld_TurnLeft) {
        this.ang -= TURN_RATE * Math.PI;
      }

      if (this.keyHeld_TurnRight) {
        this.ang += TURN_RATE * Math.PI;
      }
    

    if (this.keyHeld_Gas) {
      this.driftX += THRUST_POWER * Math.cos(this.ang);
      this.driftY += THRUST_POWER * Math.sin(this.ang);
    }

    if (Math.abs(this.driftX) > 0.01) {
      this.driftX *= SPACESPEED_DECAY_MULT;
    } else {
      this.driftX = 0;
    }

    if (Math.abs(this.driftY) > 0.01) {
      this.driftY *= SPACESPEED_DECAY_MULT;
    } else { 
      this.driftY = 0;
    }

    this.handleScreenWrap();
    this.x += this.driftX;
    this.y += this.driftY;
  }

  this.draw = function () {
    

    drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x, this.y, this.ang);
  }

} // end of class 