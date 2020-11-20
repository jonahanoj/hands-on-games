function dlog(msg) {
    document.getElementById("debugText").innerHTML = msg;
}

var canvas, ctx;

window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');

    initInput();
    carInit();
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
    carMove();
}

function draw() {
    drawTracks();
    carDraw();
}
