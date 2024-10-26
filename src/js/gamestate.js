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
  };
})();

module.exports = GameState;
