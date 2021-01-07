// tuning constants 
const SHOT_SPEED = 6.0;
const SHOT_LIFE = 30;
const SHOT_DISPLAY_RADIUS = 2.0;

function shotClass() {
    // variables to keep track of position 
    this.x = 75;
    this.y = 75;
    this.driftY = 0;
    this.driftX = 0;

    // keyboard hold state variables, to use keys more like buttons

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

    this.shootFrom = function (shipFiring) {
        this.x = shipFiring.x;
        this.y = shipFiring.y;
        this.xv = Math.cos(shipFiring.ang) * SHOT_SPEED + shipFiring.driftX;
        this.yv = Math.sin(shipFiring.ang) * SHOT_SPEED + shipFiring.driftY;

        this.shotLife = SHOT_LIFE;
    }



    this.reset = function () {
        this.ang = -0.5 * Math.PI;
        this.x = canvas.width / 2
        this.y = canvas.height / 2
        this.driftX = 0;
        this.driftY = 0;
        this.shotLife = 0;
    } // end of reset 

    this.move = function () {
        if (this.shotLife > 0) {
            this.shotLife--;
        }
        this.x += this.xv;
        this.y += this.yv;
        this.handleScreenWrap();
    }

    this.draw = function () {
        if (this.shotLife > 0) {
            colorCircle(this.x, this.y, SHOT_DISPLAY_RADIUS, 'yellow');
        }
    }

} // end of class 