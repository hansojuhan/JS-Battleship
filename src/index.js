import "./styles.css";
import "./modal.css";

import { renderGameBoard, renderPlayerNames } from "./dom";

const Gameboard = require('./gameboard');
const Ship = require('./ship');
const Player = require('./player');

// Singleton game state object
const GameState = (function() {
  // Private variables
  let currentTurn = 1;
  let player1Name = '';
  let player2Name = '';

  // Public methods
  return {
    getCurrentTurn: () => {
      return currentTurn;
    },
    getPlayerNames: () => {
      return { player1Name, player2Name };
    },
    setPlayerNames: (name1, name2) => {
      player1Name = name1;
      player2Name = name2;
    },
  };
})();
export default GameState;

// Main game flow
function gameflow() {
  
  // Empty screen at first
  // New game button
  // Create two players
  // Let enter name of both players
  // Click start to start

  /**
   * show side by side two screens for both players
   * 
   */
    // Populate ships for both screens


}

window.onload = () => {
  // New game button listener to open modal
  const openNewGameModalButton = document.getElementById('new-game-button');
  openNewGameModalButton.addEventListener('click', () => {
    const newGameModal = document.getElementById('start-game-modal');
    newGameModal.showModal();
  });

  // Close modal button listener
  const closeNewGameModalButton = document.getElementById('close-start-game-modal');
  closeNewGameModalButton.addEventListener('click', () => {
    const newGameModal = document.getElementById('start-game-modal');
    newGameModal.close();
  });
  
  
  // Start game button listener to submit new game form
  const startNewGameButton = document.getElementById('start-game-button');
  startNewGameButton.addEventListener('click', () => {
    // Get from form the names
    const name1 = document.querySelector('input[name="player-1-name"]').value.trim();
    const name2 = document.querySelector('input[name="player-2-name"]').value.trim();
    // Set names
    GameState.setPlayerNames(name1, name2);
    // Render names
    renderPlayerNames();
    // Close modal
    const newGameModal = document.getElementById('start-game-modal');
    newGameModal.close();
  });

  renderGameBoard();
}



