/************************  Imports    ************************/
// Styles
import "./css/styles.css";
import "./css/modal.css";
import favicon from './img/battleship.png';

// Module imports
import { renderCurrentTurnPlayerName, renderGameBoard, renderPlayerName, renderGameOver, addSetupCellListeners } from "./js/dom";
import { loadFavicon } from "./js/utils";

// Class imports
// const Gameboard = require('./js/gameboard');
const Ship = require('./js/ship');
// const Player = require('./js/player');

// Game state import
const GameState = require('./js/gamestate');

/************************  Functions  ************************/
// On window refresh
window.onload = () => {
  // Load faviocn
  loadFavicon(favicon, 'Battleship icons created by Umeicon - Flaticon');

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
  startNewGameButton.addEventListener('click', initialiseGame);
}

/**
 * Initialises a new game, resetting values and re-rendering the screen.
 */
function initialiseGame() {
  // Reset gamestate
  GameState.resetGame();

  // Reset names and boards
  const player1NameField = document.getElementById('player-1-name');
  player1NameField.innerText = '';
  const player1Board = document.getElementById('content-player-1');
  player1Board.innerText = '';
  const player2NameField = document.getElementById('player-2-name');
  player2NameField.innerText = '';
  const player2Board = document.getElementById('content-player-2');
  player2Board.innerText = '';

  // Get from form the names and set them in the game state
  const name1 = document.querySelector('input[name="player-1-name"]').value.trim();
  const name2 = document.querySelector('input[name="player-2-name"]').value.trim();
  GameState.setPlayerName(1, name1);
  GameState.setPlayerName(2, name2);
  
  // Close modal
  const newGameModal = document.getElementById('start-game-modal');
  newGameModal.close();

  // Populate other player with testdata
  populateTestData(2);
  
  // Place ships for user
  placeShips(1);
}

// Finalises setup after ship placement
export function finalizeSetup() {
  // Render names
  renderPlayerName(1);
  renderPlayerName(2);
  renderCurrentTurnPlayerName();

  renderGameBoard(1, true);
  renderGameBoard(2, true);
}

// Processes a game move.
export function processCellClick(event) {
  const targetPlayer = event.target.dataset.player;
  const x = event.target.dataset.x;
  const y = event.target.dataset.y;

  // Check if game over
  if (GameState.isGameOver()) {
    return;
  }

  // Allow clicks only on the opponent's board
  if (targetPlayer == GameState.getCurrentTurn()) {
    console.log("Don't attack your own ships!");
    return;
  }

  // Attack the ship
  const attack = GameState.attackShip(targetPlayer, x, y);

  // In case of an unsuccessful attack
  if (!attack) {
    console.log("Cannot attack there.");
    return;
  }

  // Render updated board
  renderGameBoard(targetPlayer, true);

  // Check if game over after this move
  if (GameState.isGameOver()) {
    renderGameOver();
    return;
  }

  // Advance turn to the next player
  GameState.advanceCurrentTurn();

  // Update player names on screen
  renderCurrentTurnPlayerName();
}

function populateTestData(player) {
  if (player == 1) {
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
  }

  if (player == 2) {
    // Player 2
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
}

function placeShips(player) {
  // Update label advising user to place the ships
  const label = document.getElementById('turn-label');
  const value = document.getElementById('current-turn');
  label.innerText = `Player ${player}, place your ships!`;
  value.innerText = '';

  // Render the board
  renderGameBoard(player, false);
  renderPlayerName(player);

  // Add cell listeners for placing ships 
  addSetupCellListeners(player);
}
