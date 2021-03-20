
var canvas,
    ctx;

window.onload = function () {

    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');

    canvas.addEventListener('mousemove', mousemoveHandler);
    canvas.addEventListener('mousedown', mousedownHandler);
    canvas.addEventListener('mouseup', mouseupHandler);
    
populateTeam(playerUnits, PLAYER_START_UNITS, true);
populateTeam(enemyUnits, ENEMY_START_UNITS, false);
    update();
};

function update() {
    draw();
    move();
    requestAnimationFrame(update);
}


function move() {
    for(var i = 0; i < allUnits.length; i++) {
        allUnits[i].move();
    }
    removeDeadUnits();
    checkAndHandleVictory();
}

function draw() {
    rect(0, 0, canvas.width, canvas.height, 'black');

    for(var i = 0; i < allUnits.length; i++) {
        allUnits[i].draw();
    }

    for (var i = 0; i < selectedUnits.length; i++) {
        selectedUnits[i].drawSelectionBox();
    }

    if (isMouseDragging) {
        coloredOutlineRectCornerToCorner(lassoX1, lassoY1, lassoX2, lassoY2, 'yellow')
    }
}