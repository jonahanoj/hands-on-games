// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, canvasContext;

var p1 = new shipClass();

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  
  loadImages();
}

function loadingDoneSoStartGame() {  
  p1.init(playerPic); 
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
}

function drawEverything() {
  colorRect(0, 0, canvas.width, canvas.height, 'black');
  p1.draw(); 
}