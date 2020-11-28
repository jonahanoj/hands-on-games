function dlog(msg) {
    document.getElementById("debugText").innerHTML = msg;
}

var canvas, ctx;
var p1 = new carClass();

window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');

    initInput();
    p1.carInit();
    loadImages();
};

function loadingDone() {
    update();
}

function update() {
    draw();
    move();
    requestAnimationFrame(update);
}

function move() {
    p1.carMove();
}

function draw() {
    drawTracks();
    p1.carDraw();
}
