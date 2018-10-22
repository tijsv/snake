const states = {
  empty: 0,
  snakePart: 1,
  point: 2
}

class Board {
  constructor(canvas, snake) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.grid;
    this.ctx = canvas.getContext("2d");
    this.snake = snake;

    this.initBoard();
  }

  initBoard() {
    this.snake.addPosition(this.getMiddle());

    this.createGrid();
    
    // make a size 3 snake to test
    // this.snake.addPosition({x: 21, y: 20}); 
    // this.snake.addPosition({x: 22, y: 20});
    // this.snake.addPosition({x: 23, y: 20});
    // this.snake.addPosition({x: 24, y: 20});
    // this.snake.addPosition({x: 25, y: 20});
    // this.snake.addPosition({x: 26, y: 20});

    this.drawBoard();
  }

  drawBoard() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.lineWidth = 10;

    for(var x = 0; x < this.grid.length; x++) {
      for(var y = 0; y < this.grid[0].length; y++) {
        if(this.grid[x][y] === states.snakePart) {
          this.ctx.beginPath();
          this.ctx.strokeStyle="black";
          this.ctx.moveTo(x*10, y*10);
          this.ctx.lineTo(x*10, y*10 + 10);
          this.ctx.stroke();
        } else if(this.grid[x][y] === states.point) {
          this.ctx.beginPath();
          this.ctx.strokeStyle="red";
          this.ctx.moveTo(x*10, y*10);
          this.ctx.lineTo(x*10, y*10 + 10);
          this.ctx.stroke();
        }
      }
    }
  }

  updateBoard() {
    let validMove = this.snake.move();
    this.updateGrid();
    this.drawBoard();
    return validMove;
  }

  createGrid() {
    var grid = [];
    for(var i = 0; i < Math.floor(this.height/10); i++) {
      var row = [];
      for(var j = 0; j < Math.floor(this.width/10); j++) {
        var pos = states.empty;
        row.push(pos);
      }
      grid.push(row);
    }

    // add snake to grid
    let snakePositions = this.snake.getPositions();
    for(var i = 0; i < snakePositions.length; i++) {
      grid[snakePositions[i].x][snakePositions[i].y] = states.snakePart;
    }

    this.grid = grid;

    // add points to grid
    this.generatePoints(10);
  }

  generateRandomXY(array) {
      var randomX = Math.floor(Math.random() * this.grid.length);
      var randomY = Math.floor(Math.random() * this.grid[0].length);
      if(array.includes({ x: randomX, y: randomY }) || (randomX === this.grid.length/2 && randomY === this.grid[0].length/2)) {
        console.log('recursie jongeuh');
        this.generateRandomXY(array);
      } else {
        array.push({ x: randomX, y: randomY });
      }
  }

  generatePoints(amount) {
    let pointsPosition = [];
    while(pointsPosition.length < amount) {
      this.generateRandomXY(pointsPosition);
    }
    for(var i = 0; i < pointsPosition.length; i++) {
      this.grid[pointsPosition[i].x][pointsPosition[i].y] = states.point;
    }
  }

  updateGrid() {
    for(var i = 0; i < this.grid.length; i++) {
      for(var j = 0; j < this.grid[i].length; j++) {
        if(this.grid[i][j] === states.snakePart) {
          this.grid[i][j] = states.empty;
        }
      }
    }
    for(var i = 0; i < this.snake.getPositions().length; i++) {

      let snakeX = this.snake.getPositions()[i].x;
      let snakeY = this.snake.getPositions()[i].y

      if(snakeX === this.grid.length) {
        this.snake.setFirstPosition({ x: 0, y: snakeY });
      } else if(snakeY === this.grid.length) {
        this.snake.setFirstPosition({ x: snakeX, y: 0 });
      } else if(snakeX === -1) {
        this.snake.setFirstPosition({ x: this.grid.length - 1, y: snakeY });
      } else if(snakeY === -1) {
        this.snake.setFirstPosition({ x: snakeX, y: this.grid.length - 1 });
      }

      if(this.grid[this.snake.getPositions()[i].x][this.snake.getPositions()[i].y] === states.point) {
        this.snake.grow({ x: this.snake.getPositions()[i].x, y: this.snake.getPositions()[i].y });
      }
      this.grid[this.snake.getPositions()[i].x][this.snake.getPositions()[i].y] = states.snakePart;
      
    }
    
  }

  getMiddle() {
    let position = {
      x: Math.floor(this.width/20),
      y: Math.floor(this.height/20)
    }
    return position;
  }
}