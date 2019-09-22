const board = {
  maxTiles: 50,
  tileWidth: 16,
  tileHeight: 16
};

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const backgroundCanvas = document.getElementById("background");
const backGroundCtx = backgroundCanvas.getContext("2d");

let range = document.getElementById("range");
let mapArray = new Array(50);
let bunnieCount = 0;
let Animal = function(vitality, color, speedModifier) {
  this.col = 20;
  this.row = 20;
  this.speedModifier = speedModifier;
  this.color = color;
  this.moveDelay = (range.value / 2) * this.speedModifier;
  this.moveCounter = 0;
  this.timeAlive = 0;
  this.multiplyTime = 0;
  this.alive = true;
  this.max = 100;

  this.updateDelay = function() {
    this.moveDelay = range.value / 2;
  };
  this.multiply = function() {
    bunniesArray.push(new Animal(200, "yellow", 20));
  };

  this.draw = function() {
    drawAnimals(this.col, this.row, this.color);
  };
  this.idle = function() {
    let possibleJumps = [];
    let direction;

    if (this.row + 1 < 50 && mapArray[this.row + 1][this.col] === 0) {
      possibleJumps.push("down");
    }
    if (this.row - 1 > 0 && mapArray[this.row - 1][this.col] === 0) {
      possibleJumps.push("up");
    }
    if (mapArray[this.row][this.col + 1] === 0) {
      possibleJumps.push("right");
    }
    if (mapArray[this.row][this.col - 1] === 0) {
      possibleJumps.push("left");
    }

    direction = possibleJumps[Math.floor(Math.random() * possibleJumps.length)];
    if (this.alive) {
      this.moveCounter += this.moveDelay;
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
            this.col += 1;
        }
        this.multiplyTime++;
        this.timeAlive++;
        if (this.multiplyTime > 50 && bunniesArray.length < this.max) {
          
          this.multiply();
          this.multiplyTime = 0;
        } else if (this.timeAlive > randomNumber(200, 300)) {
          console.log("gettin called")
          this.die();
        }
        this.moveCounter = 0;
      }
    }
  };

  this.die = function() {
    this.color = "red";
    this.alive = false;
  };
};
backgroundCanvas.width = 800;
backgroundCanvas.height = 800;
canvas.height = board.tileHeight * board.maxTiles;
canvas.width = board.tileWidth * board.maxTiles;

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
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
  for (let x = 0; x < board.maxTiles; x++) {
    for (let y = 0; y < board.maxTiles; y++) {
      if (randomNumber(1, 100) == 5) {
        mapArray[x][y] = 1;
      } else {
        mapArray[x][y] = 0;
      }
    }
  }
  renderBackground();
}

function renderBackground() {
  for (let y = 0; y < mapArray.length; y++) {
    for (let x = 0; x < mapArray.length; x++) {
      switch (mapArray[y][x]) {
        case 0:
          drawBackground(x, y, "#567d46");
          break;
        case 1:
          drawBackground(x, y, "black");
          break;
      }
    }
  }
}

function click(event) {
  var x = event.clientX;
  var y = event.clientY;
  console.log(x + " " + y);
}
canvas.addEventListener(
  "click",
  function(evt) {
    var mousePos = getMousePos(canvas, evt);

    mapArray[mousePos.y][mousePos.x] = 1;
    renderBackground();
  },
  false
);

//Get Mouse Position
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: Math.floor((evt.clientX - rect.left) / board.tileWidth),
    y: Math.floor((evt.clientY - rect.top) / board.tileHeight)
  };
}
let bunniesArray = [new Animal(500, "yellow", 20)];
function initialize(animal) {
  for (i = 0; i < bunniesArray.length; i++) {
    bunniesArray[i].draw();
    bunniesArray[i].updateDelay();
    bunniesArray[i].idle();
  }
}

createArray();
console.log(mapArray);
let frameCount = 0;
function mainLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  initialize();
}
setInterval(mainLoop, 10);
