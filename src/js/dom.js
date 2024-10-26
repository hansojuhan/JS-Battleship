/************************  Imports    ************************/
// Gamestate singleton
const GameState = require("./gamestate");
import { processCellClick } from "..";

/************************  Functions  ************************/
// Clears and rerenders the board based on player number
export function renderGameBoard(playerNumber) {
  // Clear content first 
  let content = document.getElementById(`content-player-${playerNumber}`);
  content.innerHTML = '';
  // Container div
  const container = document.createElement('div');
  container.classList.add(`board-container`);
  container.id = `board-container-${playerNumber}`;
  // 10x10 grid
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {

      const boardCell = document.createElement('div');
      container.append(boardCell);
      // Set data
      boardCell.dataset.player = playerNumber;
      boardCell.dataset.x = x;
      boardCell.dataset.y = y;
      // Set value for the cell
      const cellValue = GameState.getPlayerBoard(playerNumber)[x][y];
      // Apply styles
      boardCell.classList.add('board-cell');
      if (cellValue == 1) {
        boardCell.classList.add('ship');
        boardCell.innerText = '🚢';
      } else if (cellValue == 2) {
        boardCell.classList.add('missed-hit');
        boardCell.innerText = '🌊';    

      } else if (cellValue == 3) {
        boardCell.classList.add('hit');
        boardCell.innerText = '💥';    
      }
      // Add an event listener to listen for the click
      boardCell.addEventListener('click', (event) => processCellClick(event));
    }
  }

  // Attach to content
  content.append(container);
}

// Checks which player has the turn and renders name on the screen
export function renderCurrentTurnPlayerName() {
  const label = document.getElementById('turn-label');
  label.innerText = 'Current turn: ';

  const value = document.getElementById('current-turn');
  value.innerText = GameState.getCurrentTurn() == 1 ? GameState.getPlayerNames().player1Name : GameState.getPlayerNames().player2Name;

}

// Renders player names
export function renderPlayerNames() {
  const name1Title = document.getElementById('player-1-name');
  name1Title.innerText = `Player 1: ${GameState.getPlayerNames().player1Name}`;

  const name2Title = document.getElementById('player-2-name');
  name2Title.innerText = `Player 2: ${GameState.getPlayerNames().player2Name}`;
}

export function renderGameOver() {
  const label = document.getElementById('turn-label');
  const value = document.getElementById('current-turn');
  
  label.innerText = `Game over! ${GameState.getWinner()} has won!`;
  value.innerText = '';
}
