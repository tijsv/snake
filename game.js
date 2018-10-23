class Game {
  constructor(options) {
    this.options = options;
    this.snake = new Snake();
    this.board = new Board(options.board, this.snake);
    this.input = "up";

    this.useSettings();

    this.board.initBoard();

    this.gameLoop();

  }

  gameLoop() {
    setTimeout(() => {

      this.setSnakeDirection();

      if(!this.board.updateBoard()) {
        
        alert('You died =(');
        this.snake.die();
        this.useSettings();
        this.board.initBoard();
      }

      if(this.snake.getLength() === this.board.points + 1) {
        alert('You won. Let\'s try that again.');
        this.snake.die();
        this.snake.getSpeed() === 25 ? alert('You reached max speed. That doesn\'t mean you have to stop playing though =)') : this.snake.setSpeed(this.snake.getSpeed()/2);
        this.board.setPoints(this.board.getPoints()*2);
        this.board.initBoard();
      }

      this.gameLoop();

    }, this.snake.getSpeed());
  }

  useSettings() {
    this.snake.setSpeed(this.calculateSpeed());
    this.board.setPoints(this.options.points);
  }

  calculateSpeed() {
    switch(this.options.speed) {
      case "wtf":
        return 25;
      case "insane":
        return 50;
      case "fast":
        return 100;
      case "normal":
        return 200;
      case "slow":
        return 250;
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