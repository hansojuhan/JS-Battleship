import "./styles.css";
import "./modal.css";

import { renderGameBoard } from "./dom";

const Gameboard = require('./gameboard');
const Ship = require('./ship');
const Player = require('./player');

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
  startNewGameButton

  renderGameBoard();
}



