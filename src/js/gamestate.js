/************************  Imports    ************************/
const Player = require('./player');

/************************  Functions  ************************/
// Singleton game state object
const GameState = (function() {
  // Private variables
  let player1 = new Player();
  let player2 = new Player();
  let currentTurn = 1;

  // Public methods
  return {
    getCurrentTurn: () => {
      return currentTurn;
    },
    advanceCurrentTurn: () => {
      currentTurn = currentTurn == 1 ? 2 : 1;
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
    // Attack a ship on a player's board at coordinates x, y
    attackShip: (player, x, y) => {
      // Validate player
      const targetPlayer = player == 1 ? player1 : player == 2 ? player2 : null;
      if (!targetPlayer) {
        console.log("Invalid player number. Use 1 or 2.");
        return false;
      }

      // Validate coordinates
      if (x < 0 || x > 9 || y < 0 || y > 9) {
        console.log("Invalid coordinates. Must be between 0-9.");
        return false;
      }

      // Send receive attack to the target's board at x, y
      return targetPlayer.board.receiveAttack(x, y);
    },
    getPlayerBoard: (player) => {
      // Validate player
      const targetPlayer = player == 1 ? player1 : player == 2 ? player2 : null;
      if (!targetPlayer) {
        console.log("Invalid player number. Use 1 or 2.");
        return false;
      } 

      return targetPlayer.board.board;
    },
    // Returns true if all ships of a player have been sunk
    isGameOver: () => {
      return player1.board.allShipsSunk() || player2.board.allShipsSunk();
    },
    getWinner: () => {
      if (player1.board.allShipsSunk()) {
        return player2.name;
      } else if (player2.board.allShipsSunk()) {
        return player1.name;
      } else {
        return null;
      }
    },
    resetGame: () => {
      player1 = new Player();
      player2 = new Player();
      currentTurn = 1;
    },
  };
})();

module.exports = GameState;
