/************************  Imports    ************************/
// Styles
import "./css/styles.css";
import "./css/modal.css";

// Module imports
import { renderGameBoard, renderPlayerNames } from "./js/dom";

// Class imports
const Gameboard = require('./js/gameboard');
const Ship = require('./js/ship');
const Player = require('./js/player');
// Game state import
const GameState = require('./js/gamestate');

/************************  Functions  ************************/
// On window refresh
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


  renderGameBoard(1);
  renderGameBoard(2);
  renderPlayerNames();

  populateTestData();
}

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
   * populate testdata for both players
   * 
   */
}

function populateTestData() {
  // Player 1
  const player1Destroyer = new Ship(2);
  const player1Submarine = new Ship(3);
  const player1Cruiser = new Ship(3);
  const player1Battleship = new Ship(4);
  const player1Carrier = new Ship(5);

  GameState.placeShip(1, player1Destroyer, 0, 0, 'vertical');
  GameState.placeShip(1, player1Submarine, 1, 2, 'horizontal');
  GameState.placeShip(1, player1Cruiser, 0, 8, 'vertical');
  GameState.placeShip(1, player1Battleship, 8, 1, 'horizontal');
  GameState.placeShip(1, player1Carrier, 4, 9, 'vertical');

  console.log(GameState.getPlayerBoard(1));

  // Player 1
  const player2Destroyer = new Ship(2);
  const player2Submarine = new Ship(3);
  const player2Cruiser = new Ship(3);
  const player2Battleship = new Ship(4);
  const player2Carrier = new Ship(5);

  GameState.placeShip(2, player2Destroyer, 1, 1, 'vertical');
  GameState.placeShip(2, player2Submarine, 0, 3, 'horizontal');
  GameState.placeShip(2, player2Cruiser, 3, 3, 'vertical');
  GameState.placeShip(2, player2Battleship, 7, 1, 'horizontal');
  GameState.placeShip(2, player2Carrier, 4, 7, 'vertical');

  console.log(GameState.getPlayerBoard(2));
}
