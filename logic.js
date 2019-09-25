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
  this.max = 10;
  this.state = "idle";
  this.hunger = 0;
  this.maxHunger = randomNumber(1000, 3000)
  this.multiplyTime = 500;
  this.foodSearch = true;
  this.gestationTime = 0;
  this.eating = 0;

  this.closestFood = {
    x: null,
    y: null
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
    bunnyId++;
    bunniesArray.push(
      new Animal(this.col + 5, this.row, bunnyId, "yellow", 20)
    );
  };

  this.draw = function() {
    draw("image", bunnyImg, this.col, this.row, this.color);
  };
  this.findFood = function() {
    if (this.state == "hungry" && this.foodSearch) {
      let food = {
        x: null,
        y: null
      };
      if (this.foodSearch) {
        if (this.foodSearch && board.foodPositions != null) {
          for (let i = 0; i < board.foodPositions.length; i++) {
            
            let tempX = Math.abs(this.col - board.foodPositions[i].yPos);
            let tempY = Math.abs(this.row - board.foodPositions[i].xPos);
            let objX = board.foodPositions[i].yPos;
            let objY = board.foodPositions[i].xPos;
           
            

            if (tempX + tempY < 20) {
              food.x = objX;
              food.y = objY;
              console.log(food);
    
          
              this.foodSearch = false;
            }
          }
        }
      }

      this.closestFood.x = food.x;
      this.closestFood.y = food.y;
      this.move();
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
    } else if (this.alive && this.state == "hungry") {
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
        }
        this.moveCounter = 0;
      }
      this.eating += 1;
      if (this.eating > 500) {
        this.state = "idle";
        this.hunger = 0;
        this.eating = 0;
      }
    }

    if (this.alive && this.state === "idle") {
      this.hunger+= this.moveDelay;
 
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
        }
        // this.multiplyTime++;
        this.timeAlive++;

        if (this.timeAlive > randomNumber(200, 300)) {
          // this.die();
        }
        if (this.hunger > this.maxHunger * this.moveDelay) {
          this.state = "hungry";
          this.foodSearch = true;
          this.findFood();
        }
        this.moveCounter = 0;
      }
    }
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
      switch (randomNumber(1, 50)) {
        case 5:
          mapArray[x][y] = 1;
          break;
        case 10:
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
  new Animal(randomNumber(20, 25), randomNumber(20, 25), bunnyId, "yellow", 20),
  new Animal(randomNumber(20, 25), randomNumber(20, 25), 2, "yellow", 20),
  new Animal(randomNumber(20, 25), randomNumber(20, 25), 3, "yellow", 20),
  new Animal(randomNumber(20, 25), randomNumber(20, 25), 4, "yellow", 20)
];
function initialize(animal) {
  for (i = 0; i < bunniesArray.length; i++) {
    bunniesArray[i].draw();
    bunniesArray[i].updateDelay();
    bunniesArray[i].move();
    // bunniesArray[i].findFood();
    bunniesArray[i].detectBunny();
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
