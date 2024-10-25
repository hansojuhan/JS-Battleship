const Gameboard = require("./gameboard");

class Player {

  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.board = new Gameboard();
  }

}

module.exports = Player;
