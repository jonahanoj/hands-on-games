// tuning constants 
const SPACESPEED_DECAY_MULT = 0.99;
const THRUST_POWER = 0.15;
const TURN_RATE = 0.03;

shipClass.prototype = new movingWrapPositionClass();

function shipClass() {
  // variables to keep track of position 
  this.x = 75;
  this.y = 75;
  this.yv = 0;
  this.xv = 0;

  // keyboard hold state variables, to use keys more like buttons
  this.keyHeld_Gas = false;
  this.keyHeld_Reverse = false;
  this.keyHeld_TurnLeft = false;
  this.keyHeld_TurnRight = false;


  // key controls used for this 
  this.setupControls = function (forwardKey, backKey, leftKey, rightKey, shotKey) {
    this.controlKeyForGas = forwardKey;
    this.controlKeyForReverse = backKey;
    this.controlKeyForTurnLeft = leftKey;
    this.controlKeyForTurnRight = rightKey;
    this.controlKeyForShotFire = shotKey;
  }

  this.init = function (whichGraphic) {
    this.myBitmap = whichGraphic;
    this.myShot = new shotClass();
    this.reset();
  }

  this.superclassReset = this.reset;
  this.reset = function () {
    this.ang = -0.5 * Math.PI;
    this.superclassReset();
    this.myShot.reset();
  } // end of reset

  this.superclassMove	=	this.move;
  this.move = function () {
    // only allow turning while it's moving 
      if (this.keyHeld_TurnLeft) {
        this.ang -= TURN_RATE * Math.PI;
      }

      if (this.keyHeld_TurnRight) {
        this.ang += TURN_RATE * Math.PI;
      }
    

    if (this.keyHeld_Gas) {
      this.xv += THRUST_POWER * Math.cos(this.ang);
      this.yv += THRUST_POWER * Math.sin(this.ang);
    }

    this.superclassMove();

    if (Math.abs(this.xv) > 0.01) {
      this.xv *= SPACESPEED_DECAY_MULT;
    } else {
      this.xv = 0;
    }

    if (Math.abs(this.yv) > 0.01) {
      this.yv *= SPACESPEED_DECAY_MULT;
    } else { 
      this.yv = 0;
    }

    this.myShot.move();
  };

  this.draw = function () {
    this.myShot.draw();
    drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x, this.y, this.ang);
  };

  this.cannonFire = function() {
    if(this.myShot.isShotReady()){
      this.myShot.shootFrom(this);
    }
  };


  this.checkMyShipAndShotCollisionAgainst = function(thisEnemy) {
    if(thisEnemy.isOverlappingPoint(this.x, this.y) ) {
      this.reset();
      document.getElementById("debugText").innerHTML = "Player Crashed!"
    }
    if(this.myShot.hitTest(thisEnemy) ) {
      thisEnemy.reset();
      this.myShot.reset();
      document.getElementById("debugText").innerHTML = "Enemy Blasted!";
    }
  }
} // end of class 