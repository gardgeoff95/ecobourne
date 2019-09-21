
let range = document.getElementById("range");

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
    for (let j = 0; j < board.maxTiles; j++) {
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
          ctx.fillStyle = "black";

          backGroundCtx.fillRect(0, 0, 50, 50);
      }
    }
  }
  window.requestAnimationFrame(mainLoop);
}
let Animal = function(vitality,  color, speedModifier) {
  this.col = 20;
  this.row = 20;
  this.speedModifier =speedModifier
  this.color = color;
  this.moveDelay = (range.value / 2) * this.speedModifier;
  this.moveCounter = 0;
  this.timeAlive = 0;
  this.alive = true;
  this.updateDelay = function() {
    this.moveDelay = range.value / 2;
  }
  this.draw = function() {
    drawAnimals(this.col, this.row, this.color);
  };
  this.idle = function() {
    let possibleJumps = [];
    if (mapArray[this.row + 2][this.col] == 0) {
      possibleJumps.push("up");
    }
    if (mapArray[this.row - 2][this.col] == 0) {
      possibleJumps.push("down");
    }
    if (mapArray[this.row][this.col + 2] == 0) {
      possibleJumps.push("right");
    }
    if (mapArray[this.row][this.col - 2] == 0) {
      possibleJumps.push("left");
    }

    let direction = possibleJumps[Math.floor(Math.random() * possibleJumps.length)];
   
    if (this.alive) {
        this.moveCounter += this.moveDelay
      if (this.moveCounter > 100) {
       
        switch (direction) {
          case "up":
            this.row -= 1;
            break;
          case "down":
            this.row += 1;
            break;
          case "left":
            this.col -= 1;
            break;
          case "right":
            this.col +=1;
            
        }
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
    if (this.timeAlive >= vitality) {
      this.color = "red";
      this.alive = false;
    }
  };
};

bunniesArray = [];
let bunny = new Animal(100, "yellow", 20);
let newBunny = new Animal(400, "blue", 20);

createArray();
let frameCount = 0;
function mainLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bunny.draw();
  bunny.idle();
  bunny.updateDelay();
  newBunny.draw();
  newBunny.idle();
  newBunny.updateDelay();
  

}
setInterval(mainLoop, 10);
