const board = {
  maxTiles: 50,
  tileWidth: 16,
  tileHeight: 16
};
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const backgroundCanvas = document.getElementById("background");
const backGroundCtx = backgroundCanvas.getContext("2d");

backgroundCanvas.width = 800;
backgroundCanvas.height = 800;
canvas.height = board.tileHeight * board.maxTiles;
canvas.width = board.tileWidth * board.maxTiles;

let mapArray = new Array(50);

function drawBackground(x, y, color) {
  backGroundCtx.fillStyle = color;
  backGroundCtx.fillRect(
    x * board.tileWidth,
    y * board.tileHeight,
    board.tileWidth,
    board.tileHeight
  );
}

function drawAnimals(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(
    x * board.tileWidth,
    y * board.tileHeight,
    board.tileWidth,
    board.tileHeight
  );
}
function createArray() {
  for (let i = 0; i < board.maxTiles; i++) {
    mapArray[i] = [];
  }
  for (let i = 0; i < board.maxTiles; i++) {
    console.log(i);
    for (let j = 0; j < board.maxTiles; j++) {
      console.log(j);
      mapArray[i][j] = 0;
    }
  }
  renderBackground();
}

function renderBackground() {
  for (let y = 0; y < mapArray.length; y++) {
    for (let x = 0; x < mapArray.length; x++) {
      switch (mapArray[x][y]) {
        case 0:
          drawBackground(x, y, "#567d46");
          break;
        default:
          backGroundCtx.fillRect(0, 0, 50, 50);
      }
    }
  }
  window.requestAnimationFrame(mainLoop);
}

function rabbitMove() {}

let Animal = function(vitality, moveDelay, color) {
  this.col = 5;
  this.row = 5;
  this.color = color;
  this.moveDelay = moveDelay;
  this.moveCounter = 0;
  this.timeAlive = 0;
  this.alive = true;
  this.draw = function() {
    drawAnimals(this.col, this.row, this.color);
  };
  this.move = function() {
    if (this.alive) {
      this.moveCounter += this.moveDelay;
      if (this.moveCounter > 100) {
        this.col += 1;

        this.moveCounter = 0;
      }
    }
  };
  this.moveDown = function() {
    if (this.alive) {
      this.moveCounter += this.moveDelay;
      if (this.moveCounter > 100) {
        this.row += 1;
        this.moveCounter = 0;
      }
    }
  };
  this.die = function() {
    this.timeAlive++;
    console.log(this.timeAlive);
    if (this.timeAlive >= vitality) {
      this.color = "red";
      this.alive = false;
    }
  };
};

bunniesArray = [];
let bunny = new Animal(100, 5.0, "yellow");
let newBunny = new Animal(400, 5.0, "blue");

createArray();
let frameCount = 0;
function mainLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bunny.draw();

  bunny.move();
  bunny.die();
  newBunny.draw();
  newBunny.moveDown();
  newBunny.die();
}
setInterval(mainLoop, 10);
