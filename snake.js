class Snake {
  constructor(speed = "normal", direction = "up", length = 1) {
    this.speed = speed;
    this.direction = direction;
    this.length = length;
    this.positions = [];
    this.belly = [];
  }

  grow(position) {
    this.belly.push(position);
    this.length++;
    
  }

  die() {
    this.positions = [];
    this.length = 1;
    this.belly = [];
  }

  move() {
    let newPosition;
    switch (this.direction) {
      case "up":
        newPosition = {
          x: this.positions[0].x,
          y: this.positions[0].y - 1
        }
        break;
      case "down":
        newPosition = {
          x: this.positions[0].x,
          y: this.positions[0].y + 1
        }
        break;
      case "right":
        newPosition = {
          x: this.positions[0].x + 1,
          y: this.positions[0].y
        }
        break;
      case "left":
        newPosition = {
          x: this.positions[0].x - 1,
          y: this.positions[0].y
        }
        break;
    }

    // if the tail of the snake has not the same position as a point in its belly
    let growPosition;
    if(this.belly.length > 0) {
      if(!(this.belly[0].x === this.positions[this.positions.length - 1].x && this.belly[0].y === this.positions[this.positions.length - 1].y)) {
        growPosition = { x: this.belly[0].x, y: this.belly[0].y };
      }
    }
    if(growPosition) {
      this.belly.splice(this.belly.indexOf(this.positions[this.positions.length - 1]), 1);
    } else {
      this.positions.splice(this.positions.length - 1, 1);
    }

    // add new position
    this.positions.unshift(newPosition);

    return this.checkValid();
  }

  checkValid() {
    for(var i = 1; i < this.positions.length; i++) {
      if(this.positions[0].x === this.positions[i].x && this.positions[0].y === this.positions[i].y) {
        return false;
      }
    }
    return true;
  }

  addPosition(newPosition) {
    this.positions.push(newPosition);
  }

  setFirstPosition(newPosition) {
    this.positions[0] = newPosition;
  }

  getPositions() {
    return this.positions;
  }

  getLength() {
    return this.length;
  }

  getSpeed() {
    return this.speed;
  }

  getDirection() {
    return this.direction;
  }

  setDirection(direction) {
    this.direction = direction;
  }

  setSpeed(speed) {
    this.speed = speed;
  }
}