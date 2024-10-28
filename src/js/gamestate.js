/************************  Imports    ************************/
const Player = require('./player');
const Ship = require('./ship');

/************************  Functions  ************************/
// Singleton game state object
const GameState = (function() {
  // Private variables
  let player1 = new Player();
  let player2 = new Player();
  let currentTurn = 1;

  let placeShipsCounter = 0;
  let shipsToPlace = [2, 3, 3, 4, 5].map(length => new Ship(length));

  // Public methods
  return {
    setupShip: (player, x, y, orientation) => {
      // Validate player
      const targetPlayer = player == 1 ? player1 : player == 2 ? player2 : null;
      if (!targetPlayer) {
        console.log("Invalid player number. Use 1 or 2.");
        return false;
      }

      // Check if counter is less than amount of ships
      if (placeShipsCounter <= shipsToPlace.length) {
        // Attempt to place and record the resul
        const successfullyPlaced = targetPlayer.board.placeShip(shipsToPlace[placeShipsCounter], x, y, orientation);
        // Increment counter, if succesful
        if (successfullyPlaced) {
          placeShipsCounter++;
          return true;
        }
      }
      return false;
    },
    getShipSize: () => {
      return shipsToPlace[placeShipsCounter].length;
    },
    allShipsPlaced: () => {
      return placeShipsCounter >= shipsToPlace.length;
    },

    getCurrentTurn: () => {
      return currentTurn;
    },
    advanceCurrentTurn: () => {
      currentTurn = currentTurn == 1 ? 2 : 1;
    },
    getPlayerNames: () => {
      return { player1Name: player1.name, player2Name: player2.name };
    },
    setPlayerName: (player, name) => {
      // Validate player
      const targetPlayer = player == 1 ? 1 : player == 2 ? 2 : null;
      if (!targetPlayer) {
        console.log("Invalid player number. Use 1 or 2.");
        return false;
      }

      if (targetPlayer == 1) {
        player1.name = name;
        return;
      }
      if (targetPlayer == 2) {
        player2.name = name;
        return;
      }
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
      placeShipsCounter = 0;
    },
  };
})();

module.exports = GameState;
