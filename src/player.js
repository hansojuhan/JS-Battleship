const Gameboard = require("./gameboard");

class Player {
  constructor(name, type) {
    this.name = name || 'Player';
    this.type = type || 'human'; // Should be either 'human' or 'computer'
    this.board = new Gameboard();
  }
}

module.exports = Player;
