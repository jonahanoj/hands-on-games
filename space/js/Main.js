// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, canvasContext;

var p1 = new shipClass();
var enemy = new UFOClass();

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  canvasContext.font = '16px sans-serif';
  canvasContext.textAlign = 'center';
  
  loadImages();
}

function loadingDoneSoStartGame() {  
  p1.init(playerPic); 
  enemy.init(UFOPic);
  initInput();
  update();
}

function update() {
  moveEverything();
  drawEverything();
  requestAnimationFrame(update);
}

function moveEverything() {
  p1.move();
  enemy.move();
  p1.checkMyShipAndShotCollisionAgainst(enemy);
}

function drawEverything() {
  colorRect(0, 0, canvas.width, canvas.height, 'black');
  p1.draw();
  enemy.draw();
  colorText(canvas.width - 100, 100, timesShotEnemy, 'yellow'); 
}