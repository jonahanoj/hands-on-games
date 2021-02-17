
var canvas,
    ctx;
const PLAYER_START_UNITS = 20;
var playerUnits = [];

const ENEMY_START_UNITS = 15;
var enemyUnits = [];

window.onload = function () {

    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');

    canvas.addEventListener('mousemove', mousemoveHandler);
    canvas.addEventListener('mousedown', mousedownHandler);
    canvas.addEventListener('mouseup', mouseupHandler);
    
    for (var i = 0; i < PLAYER_START_UNITS; i++) {
        var spawnUnit = new unitClass();
        spawnUnit.resetAndSetPlayerTeam(true);
        playerUnits.push(spawnUnit);
    }

    for (var i = 0; i < ENEMY_START_UNITS; i++) {
        var spawnUnit = new unitClass();
        spawnUnit.resetAndSetPlayerTeam(false);
        enemyUnits.push(spawnUnit);
    }
    update();
};

function update() {
    draw();
    move();
    requestAnimationFrame(update);
}


function move() {
    for (var i = 0; i < playerUnits.length; i++) {
        playerUnits[i].move();
    }

    for (var i = 0; i < enemyUnits.length; i++) {
        enemyUnits[i].move();
    }
}

function draw() {
    rect(0, 0, canvas.width, canvas.height, 'black');

    for (var i = 0; i < playerUnits.length; i++) {
        playerUnits[i].draw();
    }

    for (var i = 0; i < enemyUnits.length; i++) {
        enemyUnits[i].draw();
    }

    for (var i = 0; i < selectedUnits.length; i++) {
        selectedUnits[i].drawSelectionBox();
    }

    if (isMouseDragging) {
        coloredOutlineRectCornerToCorner(lassoX1, lassoY1, lassoX2, lassoY2, 'yellow')
    }
}