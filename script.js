let options = {
  board: document.getElementById('board'),
  speed: "normal"
}

let game = new Game(options);

document.onkeydown = (e) => {
  var key = e.keyCode;
  game.setInput(key);
}

