let board = {
  maxTiles: 50,
  tileWidth: 16,
  tileHeight: 16,
  foodPositions: [],
  season: 0
};

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const backgroundCanvas = document.getElementById("background");
const backGroundCtx = backgroundCanvas.getContext("2d");

let bunnyId = 1;
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
let Animal = function(x, y, id, color, speedModifier) {
  this.id = id;
  this.col = x;
  this.row = y;
  this.speedModifier = speedModifier;
  this.color = color;
  this.moveDelay = (range.value / 50) * this.speedModifier;
  this.moveCounter = 0;
  this.timeAlive = 0;
  this.alive = true;
  this.max = 1000;
  this.state = "idle";
  this.hunger = 0;
  this.maxHunger = randomNumber(200, 300);
  this.multiplyTime = 500;
  this.foodSearch = false;
  this.gestationTime = 0;
  this.eating = 0;
  this.foodToSplice = null

  this.closestFood = {
    x: null,
    y: null
  };
  this.stateManager = function() {
    if (this.state === "idle") {
      this.move();
    } else if (this.state === "hungry" && board.foodPositions.length != 0) {
      this.pathForFood();
    }
    if (this.foodSearch && board.foodPositions.length > 0) {
      this.findFood();
    }
    if (this.state == "dead") {
      console.log("should die")
      this.die();
    }
    console.log(this.state)

  };

  this.detectBunny = function() {
    for (let i = 0; i < bunniesArray.length; i++) {
      if (
        this.col === bunniesArray[i].col &&
        this.row === bunniesArray[i].row &&
        this.id != bunniesArray[i].id
      ) {
        if (this.multiplyTime == 500 && this.gestationTime > 1000) {
          this.multiplyTime -= 1;
          this.multiply();
        }
      }
    }
  };

  this.updateDelay = function() {
    this.moveDelay = range.value / 2;
  };
  this.multiply = function() {
 
    if (bunniesArray.length < this.max) {
      bunnyId++;
      bunniesArray.push(
        new Animal(this.col + 5, this.row, bunnyId, "yellow", 20)
      );
    }
  };

  this.draw = function() {
    draw("image", bunnyImg, this.col, this.row, this.color);
  };
  this.findFood = function() {
    let randomIndex = board.foodPositions[Math.floor(Math.random() * board.foodPositions.length)]

    this.foodToSplice = board.foodPositions.indexOf(randomIndex)
    let y = randomIndex.xPos
    let x = randomIndex.yPos
    this.closestFood.x = x;
    this.closestFood.y = y;
    this.state = "hungry";
    this.foodSearch = false;

    return;
  };

  this.die = function() {
    console.log("death came for this rabbit")
    for ( let i = 0; i < bunniesArray.length; i++) {
      if (this.id === bunniesArray[i].id){
        bunniesArray.splice(i, 1);
      }
    }
  };
  this.pathForFood = function() {
    let possibleJumps = [];

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
    this.gestationTime++;
    this.moveCounter += this.moveDelay;
    if (this.moveCounter > 100) {
      if (this.row > this.closestFood.y && possibleJumps.includes("up")) {
        this.row -= 1;
        
      } else if (
        this.row < this.closestFood.y &&
        possibleJumps.includes("down")
      ) {
        this.row += 1;
      } else if (
        this.col > this.closestFood.x &&
        possibleJumps.includes("left")
      ) {
        this.col -= 1;
      } else if (
        this.col < this.closestFood.x &&
        possibleJumps.includes("right")
      ) {
        this.col += 1;
      } else if (
        this.closestFood.x + 1 === this.col ||
        this.closestFood.x - 1 === this.col ||
        this.closestFood.y + 1 === this.row ||
        this.closestFood.y - 1 === this.row
      ) {
        console.log("eating");
        this.eating += 1;
        if (this.eating > 15) {
          this.state = "idle";
          this.hunger = 0;
          this.eating = 0;
          mapArray[this.closestFood.y][this.closestFood.x] = 0;
          board.foodPositions.splice(this.foodToSplice, 1);
          renderBackground();
          
        }
   
      } else {
        this.state = "idle"
      }
      this.moveCounter = 0;
    
    }
    return
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
    direction = possibleJumps[Math.floor(Math.random() * possibleJumps.length)];

    this.hunger += this.moveDelay;
    this.gestationTime++;
    this.moveCounter += this.moveDelay;
    if (this.moveCounter > randomNumber(25, 150)) {
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
          break;
      }

      this.timeAlive++;
      console.log(this.hunger)

      if (this.timeAlive > randomNumber(1000, 2000)) {
        this.die();
      }
      if (this.hunger > this.maxHunger * this.moveDelay &&
          board.foodPositions.lengt != 0) {
        
        this.foodSearch = true;
      }
      if (this.hunger > 5000) {

        this.state = "dead"
    
      }
      this.moveCounter = 0;
    }
    return;
  };
};
backgroundCanvas.width = 880;
backgroundCanvas.height = 800;
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
  } else if (type == "imageBack") {
    let tiles = [0, 16, 32];
    backGroundCtx.drawImage(
      img,
      tiles[Math.floor(Math.random() * tiles.length)],
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
        case 8:
          mapArray[x][y] = 3;
          board.foodPositions.push({ xPos: x, yPos: y });
          break;
        case 7:
          mapArray[x][y] = 2;
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
          draw("imageBack", grassImg, x, y);
          break;
        case 1:
          draw("rect", null, x, y, "black");
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
let bunniesArray = [
  new Animal(randomNumber(20, 25), randomNumber(20, 25), bunnyId, "yellow", 20)
];
function initialize(animal) {
  for (i = 0; i < bunniesArray.length; i++) {
    bunniesArray[i].draw();
    bunniesArray[i].updateDelay();
    bunniesArray[i].stateManager();
  }
}

createArray();
console.log(mapArray);
let frameCount = 0;
function mainLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  initialize();
  board.season += 1;

  if (board.season >= 10000) {
  }
}
function startGame() {
  setInterval(mainLoop, 10);
}

startGame();
