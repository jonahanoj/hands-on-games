
function movingWrapPositionClass() {
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


    this.reset = function () {
        this.xv	= this.yv = 0.0;
        this.x = canvas.width / 2
        this.y = canvas.height / 2
    } // end of reset 

    this.move = function () {
        this.x += this.xv;
        this.y += this.yv;
        this.handleScreenWrap();
    }

} // end of class 