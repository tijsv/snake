class Game {
  constructor(options) {
    this.options = options;
    this.snake = new Snake(this.calculateSpeed());
    this.board = new Board(options.board, this.snake);
    this.input = "up";

    setInterval(() => {
      this.setSnakeDirection();

      if (!this.board.updateBoard()) {
        this.snake.die();
        alert('You died ma dude');
        this.board.initBoard();
      }

    }, this.snake.getSpeed());

  }

  calculateSpeed() {
    if(this.options.speed === "normal") {
      return 100;
    } else {
      return 1000;
    }
  }

  setInput(input) {
    switch(input) {
      case 37:
        this.input = "left";
        break;
      case 38:
        this.input = "up";
        break;
      case 39:
        this.input = "right";
        break;
      case 40:
        this.input = "down";
        break;
    }
  }

  setSnakeDirection() {
    switch(this.input) {
      case "left":
        if(this.snake.getDirection() !== "right") {
          this.snake.setDirection(this.input);
        }
        break;
      case "up":
        if(this.snake.getDirection() !== "down") {
          this.snake.setDirection(this.input);
        }
        break;
      case "right":
        if(this.snake.getDirection() !== "left") {
          this.snake.setDirection(this.input);
        }
        break;
      case "down":
        if(this.snake.getDirection() !== "up") {
          this.snake.setDirection(this.input);
        }
        break;
    }
  }

}