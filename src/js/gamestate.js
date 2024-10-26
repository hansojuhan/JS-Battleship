/************************  Imports    ************************/
const Player = require('./player');

/************************  Functions  ************************/
// Singleton game state object
const GameState = (function() {
  // Private variables
  let currentTurn = 1;
  let player1 = new Player();
  let player2 = new Player();

  // Public methods
  return {
    getCurrentTurn: () => {
      return currentTurn;
    },
    getPlayerNames: () => {
      return { player1Name: player1.name, player2Name: player2.name };
    },
    setPlayerNames: (name1, name2) => {
      player1.name = name1;
      player2.name = name2;
    },
    // Place a ship on a player's board
    placeShip: (player, ship, x, y, orientation) => {
      // Validate player
      const targetPlayer = player == 1 ? player1 : player == 2 ? player2 : null;
      if (!targetPlayer) {
        console.log("Invalid player number. Use 1 or 2.");
        return false;
      }

      // Place ship on selected player's board
      return targetPlayer.board.placeShip(ship, x, y, orientation);
    },
    getPlayerBoard: (player) => {
      // Validate player
      const targetPlayer = player == 1 ? player1 : player == 2 ? player2 : null;
      if (!targetPlayer) {
        console.log("Invalid player number. Use 1 or 2.");
        return false;
      } 

      return targetPlayer.board.board;
    }
  };
})();

module.exports = GameState;
