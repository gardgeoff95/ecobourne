const board = {
  maxTiles: 50,

  tileWidth: 16,
  tileHeight: 16,
  foodPositions: []
};

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const backgroundCanvas = document.getElementById("background");
const backGroundCtx = backgroundCanvas.getContext("2d");

let range = document.getElementById("range");
let mapArray = new Array(40);
let bunnieCount = 0;
let bunnyImg = new Image();
let grassImg = new Image();
grassLoaded = false;
grassImg.src = "grassTiles.png";
bunnyImg.src = "rabbit.png";
grassImg.onload = () => {
  renderBackground();
};
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
  this.max = 10;
  this.state = "hungry";
  this.foodSearch = true;
  this.closestFood = {
    x: null,
    y: null
  };

  this.updateDelay = function() {
    this.moveDelay = range.value / 2 + randomNumber(1, 10);
  };
  // this.multiply = function() {
  //   bunniesArray.push(new Animal(200, "yellow", 20));
  // };

  this.draw = function() {
    draw("image", bunnyImg, this.col, this.row, this.color);
  };
  this.findFood = function() {
    col = this.col;
    row = this.row;
    if ((this.state = "hungry")) {
      let food = {
        x: null,
        y: null
      };
      if (this.foodSearch) {
        if (this.foodSearch && board.foodPositions != null) {
          board.foodPositions.forEach(function(arrayItem) {
            let tempX = Math.abs(this.col - arrayItem.xPos);
            let tempY = Math.abs(this.row - arrayItem.yPos);
            let objX = arrayItem.yPos;
            let objY = arrayItem.xPos;

            if (tempX + tempY < 10) {
              food.x = objX;
              food.y = objY;
              // this.foodSearch = false;  // this.foodSearch = false;
            }
          });
        }

      }
      console.log(food);
      // this.closestFood.x = food.x
    }
  };

  this.die = function() {
    this.color = "red";
    this.alive = false;
  };
  this.move = function() {


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

    if (this.state == "idle") {
      direction =
        possibleJumps[Math.floor(Math.random() * possibleJumps.length)];
    } else if (this.state == "hungry") {
      let lengthLeft;
      let lengthRight;
      let lengthDown;
      let lengthUp;
      let closestFoodX = this.closestFood.x;
      let closestFoodY = this.closestFood.y;
      possibleJumps.forEach(function(direction) {
        if (direction === "left") {
          lengthLeft = closestFoodX + closestFoodY - (this.col + 1 + this.row);
        } else if (direction === "right") {
          lengthRight = closestFoodX + closestFoodY - (this.col - 1 + this.row);
        } else if (direction === "up") {
          lengthUp = closestFoodX + closestFoodY - (this.col + this.row - 1);
        } else if (direction === "down") {
          lengthDown = closestFoodX + closestFoodY - (this.col + this.row + 1);
        }
      });
      let min = Math.min(lengthLeft, lengthRight, lengthUp, lengthDown);
      if (min == lengthLeft) {
        direction = "left";
      } else if (min == lengthRight) {
        direction = "right";
      } else if (min == lengthUp) {
        direction = "up";
      } else if (min == lengthDown) {
        direction = "down";
      }
    }

    if (this.alive) {
      this.moveCounter += this.moveDelay;
      if (this.moveCounter > 100) {
        console.log("gettin called");
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
        // this.multiplyTime++;
        this.timeAlive++;
        if (this.multiplyTime > 50 && bunniesArray.length < this.max) {
          // this.multiply();
          this.multiplyTime = 0;
        } else if (this.timeAlive > randomNumber(200, 300)) {
          // this.die();
        }
        this.moveCounter = 0;
      }
    }
  };
};
backgroundCanvas.width = 880;
backgroundCanvas.height = 640;
canvas.height = board.tileHeight * board.maxTiles;
canvas.width = board.tileWidth * board.maxTiles;

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function draw(type, img = null, x, y, color) {
  if (type == "rect") {
    backGroundCtx.fillStyle = color;
    backGroundCtx.fillRect(
      x * board.tileWidth,
      y * board.tileHeight,
      board.tileWidth,
      board.tileHeight
    );
  } else if (type == "image") {
    ctx.drawImage(
      img,
      0,
      0,
      16,
      16,
      x * board.tileWidth,
      y * board.tileHeight,
      board.tileWidth,
      board.tileHeight
    );
  }
}

function createArray() {
  for (let i = 0; i < board.maxTiles; i++) {
    mapArray[i] = [];
  }
  for (let x = 0; x < board.maxTiles; x++) {
    for (let y = 0; y < board.maxTiles; y++) {
      switch (randomNumber(1, 500)) {
        case 5:
          mapArray[x][y] = 1;
          break;
        case 10:
          mapArray[x][y] = 3;
          board.foodPositions.push({ xPos: x, yPos: y });
          break;
        default:
          mapArray[x][y] = 0;
          break;
      }
    }
  }
}

function renderBackground() {
  for (let y = 0; y < mapArray.length; y++) {
    for (let x = 0; x < mapArray.length; x++) {
      switch (mapArray[y][x]) {
        case 0:
          draw("rect", null, x, y, "#58774c");
          break;
        case 1:
          draw("image", bunnyImg, x, y, "black");
          break;
        case 3:
          draw("rect", null, x, y, "purple");
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
    // bunniesArray[i].move();
    bunniesArray[i].findFood();
  }
}

createArray();
console.log(mapArray);
let frameCount = 0;
function mainLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  initialize();
}
function startGame() {
  setInterval(mainLoop, 10);
}

startGame();
