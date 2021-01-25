// tuning constants 
const SHOT_SPEED = 6.0;
const SHOT_LIFE = 30;
const SHOT_DISPLAY_RADIUS = 2.0;

shotClass.prototype = new movingWrapPositionClass();

function shotClass() {
    // variables to keep track of position 
    this.x = 75;
    this.y = 75;
    this.yv = 0;
    this.xv = 0;


    this.isShotReady = function() {
        return(this.shotLife <= 0);


    }

    this.shootFrom = function (shipFiring) {
        this.x = shipFiring.x;
        this.y = shipFiring.y;
        this.xv = Math.cos(shipFiring.ang) * SHOT_SPEED + shipFiring.xv;
        this.yv = Math.sin(shipFiring.ang) * SHOT_SPEED + shipFiring.yv;

        this.shotLife = SHOT_LIFE;
    }


    this.superclassReset = this.reset;
    this.reset = function () {
        this.ang = -0.5 * Math.PI;
        this.shotLife = 0;
        this.superclassReset();
    } // end of reset 

    this.superclassMove	= this.move;
    this.move = function () {
        if (this.shotLife > 0) {
            this.shotLife--;
            this.superclassMove();
        }
    }

    this.draw = function () {
        if (this.shotLife > 0) {
            colorCircle(this.x, this.y, SHOT_DISPLAY_RADIUS, 'yellow');
        }
    }

} // end of class 