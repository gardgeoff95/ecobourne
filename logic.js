let board = {
  maxTiles: 100,
  tileWidth: 16,
  tileHeight: 16,
  foodPositions: [],
  season: 0
};
const GRASS_1 = 0;
const GRASS_2 = 2;
const GRASS_3 = 4;
const grassArray = [GRASS_1, GRASS_2, GRASS_3];
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const backgroundCanvas = document.getElementById("background");
const backGroundCtx = backgroundCanvas.getContext("2d");

let bunnyId = 30;

let mapArray = new Array();
let bunnieCount = 0;
let bunnyImg = new Image();
let foxImg = new Image();
let grassImg = new Image();
grassLoaded = false;
grassImg.src = "grassTiles.png";
bunnyImg.src = "rabbit.png";
foxImg.src = "fox.png";
grassImg.onload = () => {
  renderBackground();
  startGame();
};
let Animal = function(animalType, x, y, id, color, speedModifier) {
  this.preyEaten = 0;
  this.animalType = animalType;
  this.id = id;
  this.col = x;
  this.row = y;
  this.speedModifier = speedModifier;
  this.color = color;
  this.moveCounter = 0;
  this.timeAlive = 0;
  this.max = 50;
  this.state = "idle";
  this.hunger = 0;
  this.foxHungry = true;
  this.maxHunger = randomNumber(500, 2000);
  this.starvation = randomNumber(2000, 2100);
  this.currentDirection = "left";
  this.upOrDown = "up";
  this.multiplyTime = 500;
  this.foodSearch = false;
  this.gestationTime = 0;
  this.eating = 0;
  this.foodToSplice = null;

  this.closestFood = {
    x: null,
    y: null
  };
  this.stateManager = function() {
    if (this.state === "idle") {
      this.move();
    } else if (this.state === "hungry" && board.foodPositions.length > 0) {
      this.pathForFood();
    }

    if (
      this.state === "idle" &&
      this.animalType === "fox" &&
      this.preyEaten < 6
    ) {
      this.preyBunnies();
    }
    if (this.state === "tired") {
      this.returnToDen();
    }
    if (this.foodSearch && board.foodPositions.length > 0) {
      this.findFood();
    }
    if (this.state == "dead") {
      this.die();
    }

    if (this.animalType === "rabbit") {
      this.detectBunny();
    }
  };

  this.returnToDen = function() {};

  this.detectBunny = function() {
    for (let i = 0; i < bunniesArray.length; i++) {
      if (bunniesArray[i].state !== "dead") {
        if (
          (this.col + 1 === bunniesArray[i].col &&
            this.row == bunniesArray[i].row) ||
          (this.col - 1 === bunniesArray[i].col &&
            this.row == bunniesArray[i].row) ||
          (this.row + 1 === bunniesArray[i].row &&
            this.col == bunniesArray[i].col) ||
          (this.row - 1 === bunniesArray[i].row &&
            this.col == bunniesArray[i].col) ||
          (this.col === bunniesArray[i].col &&
            this.row === bunniesArray[i].row &&
            this.id != bunniesArray[i].id)
        ) {
          if (this.gestationTime > 400 && bunniesArray[i].gestationTime > 200) {
            this.gestationTime = 0;

            this.multiply();
          }
        }
      }
    }
  };

  this.multiply = function() {
    if (this.animalType === "rabbit") {
      if (bunniesArray.length < this.max) {
        bunnyId++;
        bunniesArray.push(
          new Animal("rabbit", this.col + 5, this.row, bunnyId, "yellow", 20)
        );
      }
    }
  };

  this.draw = function() {
    if (this.animalType === "rabbit") {
      draw("image", bunnyImg, this.col, this.row);
    } else if (this.animalType === "fox") {
      draw("image", foxImg, this.col, this.row);
    }
  };
  this.findFood = function() {
    let randomIndex = randomNumber(0, board.foodPositions.length);

    let randomArrayItem = board.foodPositions[randomIndex];

    if (board.foodPositions[randomIndex].taken === false) {
      let y = randomArrayItem.xPos;
      let x = randomArrayItem.yPos;
      this.closestFood.x = x;
      this.closestFood.y = y;
      this.state = "hungry";

      this.foodSearch = false;
    }

    return;
  };

  this.die = function() {
    if (this.animalType === "rabbit") {
      bunniesArray = bunniesArray.filter(bunny => bunny.id != this.id);
      console.log("Bunnies array ", bunniesArray);
      console.log("My id is ", this.id);
    }
    // for (let i = 0; i < bunniesArray.length; i++) {
    //   if (this.id === bunniesArray[i].id) {
    //     bunniesArray.splice(i, 1);
    //   }
    // }
  };
  this.preyBunnies = function() {
    for (let i = 0; i < bunniesArray.length; i++) {
      if (
        (this.col + 1 === bunniesArray[i].col &&
          this.row === bunniesArray[i].row) ||
        (this.col - 1 === bunniesArray[i].col &&
          this.row === bunniesArray[i].row) ||
        (this.row + 1 === bunniesArray[i].row &&
          this.col === bunniesArray[i].col) ||
        (this.row - 1 === bunniesArray[i].row &&
          this.col === bunniesArray[i].col) ||
        (this.row === bunniesArray[i].row && this.col === bunniesArray[i].col)
      ) {
        console.log("IIIII", i);
        console.log("GOTTEM -");
        this.preyEaten++;
        bunniesArray[i].state = "dead";
        bunniesArray = bunniesArray.filter(
          bunny => bunny.id !== bunniesArray[i].id
        );
        if (this.preyEaten === 5) {
          this.state = "tired";
        }
      }
    }
  };
  this.pathForFood = function() {
    let possibleJumps = [];

    if (
      this.row + 1 < board.maxTiles &&
      grassArray.includes(mapArray[this.row + 1][this.col])
    ) {
      possibleJumps.push("down");
    }
    if (
      this.row - 1 > 0 &&
      grassArray.includes(mapArray[this.row - 1][this.col])
    ) {
      possibleJumps.push("up");
    }
    if (grassArray.includes(mapArray[this.row][this.col + 1])) {
      possibleJumps.push("right");
    }
    if (grassArray.includes(mapArray[this.row][this.col - 1])) {
      possibleJumps.push("left");
    }

    this.gestationTime++;
    this.hunger += 1;
    this.moveCounter += 20;
    if (this.moveCounter > 100) {
      if (this.row > this.closestFood.y && possibleJumps.includes("up")) {
        this.row -= 1;
        // start
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
        this.eating += 1;
        if (this.eating > 15) {
          board.foodPositions.splice(this.foodToSplice, 1);
          mapArray[this.closestFood.y][this.closestFood.x] = 0;
          renderBackground();
          console.log(board.foodPositions);

          this.state = "idle";
          this.hunger = 0;
          this.eating = 0;
        }
      } else if (this.hunger > this.starvation) {
        console.log("starved");
        this.die();
      } else {
        this.state = "idle";
      }
      this.moveCounter = 0;
    }

    return;
  };
  this.move = function() {
    if (this.animalType === "rabbit") {
      let possibleJumps = [];
      let direction;

      if (
        this.row + 1 < board.maxTiles &&
        grassArray.includes(mapArray[this.row + 1][this.col])
      ) {
        possibleJumps.push("down");
      }
      if (
        this.row - 1 > 0 &&
        grassArray.includes(mapArray[this.row - 1][this.col])
      ) {
        possibleJumps.push("up");
      }
      if (grassArray.includes(mapArray[this.row][this.col + 1])) {
        possibleJumps.push("right");
      }
      if (grassArray.includes(mapArray[this.row][this.col - 1])) {
        possibleJumps.push("left");
      }
      direction =
        possibleJumps[Math.floor(Math.random() * possibleJumps.length)];

      this.hunger += 1;
      this.gestationTime++;
      this.moveCounter += 50;
      if (this.moveCounter > randomNumber(300, 400)) {
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
        console.log(this.timeAlive)

        if (this.timeAlive > randomNumber(1000, 2000)) {
          console.log("died from age");
          this.state = "dead";
        }
        if (this.hunger > this.maxHunger && board.foodPositions.length > 1) {
          console.log("FOOD SEARCH");
          this.foodSearch = true;
        }
        if (this.hunger > this.starvation) {
          console.log("STARVED");
          this.state = "dead";
        }
        this.moveCounter = 0;
      }
    } else if (this.animalType === "fox") {
      let possibleJumps = [];

      if (
        this.row + 1 < board.maxTiles &&
        grassArray.includes(mapArray[this.row + 1][this.col])
      ) {
        possibleJumps.push("down");
      }
      if (
        this.row - 1 > 0 &&
        grassArray.includes(mapArray[this.row - 1][this.col])
      ) {
        possibleJumps.push("up");
      }
      if (grassArray.includes(mapArray[this.row][this.col + 1])) {
        possibleJumps.push("right");
      }
      if (grassArray.includes(mapArray[this.row][this.col - 1])) {
        possibleJumps.push("left");
      }

      this.moveCounter += 50;
      if (this.moveCounter > randomNumber(150, 200)) {
        if (
          possibleJumps.includes("left") &&
          this.col > 0 &&
          this.currentDirection === "left"
        ) {
          this.col--;
        } else if (
          possibleJumps.includes("up") &&
          this.col === 0 &&
          this.upOrDown === "up"
        ) {
          if (this.currentDirection === "left") {
            this.currentDirection = "right";
            this.row--;
            this.col++;
          }
        } else if (possibleJumps.includes("up") && this.col === 99) {
          if (this.currentDirection === "right") {
            this.currentDirection = "left";
            this.row--;
            this.col--;
          }
        } else if (
          possibleJumps.includes("right") &&
          this.col < board.maxTiles &&
          this.currentDirection === "right"
        ) {
          this.col++;
        }
        if (
          this.currentDirection === "right" &&
          !possibleJumps.includes("right")
        ) {
          this.row--;
        }
        if (
          this.currentDirection === "left" &&
          !possibleJumps.includes("left")
        ) {
          this.row--;
        }
        if (this.row === 0) {
          this.currentDirection = "down";
        }
        if (
          this.currentDirection === "down" &&
          possibleJumps.includes("down")
        ) {
          this.row++;
        } else if (
          this.currentDirection === "down" &&
          !possibleJumps.includes("down")
        ) {
          this.col++;
        }
        if (this.currentDirection === "down" && this.row == 99) {
          this.currentDirection = "left";
        }

        this.moveCounter = 0;
      }
    }

    return;
  };
};
backgroundCanvas.width = board.tileHeight * board.maxTiles;
backgroundCanvas.height = board.tileWidth * board.maxTiles;
canvas.height = board.tileHeight * board.maxTiles;
canvas.width = board.tileWidth * board.maxTiles;

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function draw(type, img = null, x, y, color, tile) {
  if (type == "rect") {
    backGroundCtx.fillStyle = color;
    backGroundCtx.fillRect(
      x * board.tileWidth,
      y * board.tileHeight,
      board.tileWidth,
      board.tileHeight
    );
  } else if (type === "image") {
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
  } else if (type === "imageBack") {
    let tiles = [0, 16, 32];

    backGroundCtx.drawImage(
      img,
      tile,
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
      const rando = randomNumber(1, 1000);

      if (rando <= 50) {
        mapArray[x][y] = 1;
      } else if (rando <= 60) {
        mapArray[x][y] = 3;
        board.foodPositions.push({ xPos: x, yPos: y, taken: false, uses: 5 });
      } else if (rando <= 200) {
        mapArray[x][y] = GRASS_2;
      } else if (rando <= 500) {
        mapArray[x][y] = GRASS_3;
      } else {
        mapArray[x][y] = GRASS_1;
      }
    }
  }
}

function renderBackground() {
  for (let y = 0; y < board.maxTiles; y++) {
    for (let x = 0; x < board.maxTiles; x++) {
      switch (mapArray[y][x]) {
        case GRASS_1:
          draw("imageBack", grassImg, x, y, null, 16);
          break;
        case 1:
          draw("imageBack", grassImg, x, y, null, 64);
          break;
        case GRASS_2:
          draw("imageBack", grassImg, x, y, null, 0);
          break;
        case 3:
          draw("imageBack", grassImg, x, y, null, 48);
          break;
        default:
          draw("imageBack", grassImg, x, y, null, 32);
          break;
      }
    }
  }
}
function addFood() {
  if (board.foodPositions.length < 50) {
    let x = randomNumber(1, board.maxTiles);
    let y = randomNumber(1, board.maxTiles);
    if (mapArray[x][y] === 0) {
      mapArray[x][y] = 3;
      board.foodPositions.push({ xPos: x, yPos: y, taken: false, uses: 5 });
      renderBackground();
    }
  }
}
setInterval(addFood, 2000);
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
  new Animal(
    "rabbit",
    randomNumber(30, 40),
    randomNumber(5, 10),
    1,
    "yellow",
    20
  )
];
let foxArray = [
  // new Animal(
  //   "fox",
  //   randomNumber(30, 40),
  //   randomNumber(30, 40),
  //   10,
  //   "yellow",
  //   20
  // )
];

function initialize(animal) {
  for (i = 0; i < bunniesArray.length; i++) {
    if (bunniesArray[i].state !== "dead") {
      bunniesArray[i].draw();
      bunniesArray[i].stateManager();
    }
  }
  for (i = 0; i < foxArray.length; i++) {
    foxArray[i].draw();
    foxArray[i].stateManager();
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
