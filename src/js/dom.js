/************************  Imports    ************************/
// Gamestate singleton
const GameState = require("./gamestate");
import { processCellClick, finalizeSetup } from "..";

/************************  Functions  ************************/
// Clears and rerenders the board based on player number
export function renderGameBoard(playerNumber, clickable = true) {
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
      if (clickable) {
        boardCell.addEventListener('click', (event) => processCellClick(event));
      }
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
export function renderPlayerName(player) {
  const nameTitle = document.getElementById(`player-${player}-name`);
  nameTitle.innerText = `Player ${player}: ${GameState.getPlayerNames().player1Name}`;
}

export function renderGameOver() {
  const label = document.getElementById('turn-label');
  const value = document.getElementById('current-turn');
  
  label.innerText = `Game over! ${GameState.getWinner()} has won!`;
  value.innerText = '';
}

export function addSetupCellListeners(player) {
  // Track currently hovered cell
  let currentHoveredCell = null;
  let orientation = 'horizontal';

  // Change orientation on key press
  document.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
      orientation = orientation === 'horizontal' ? 'vertical' : 'horizontal';

      // Reapply if a cell is currently hovered
      if (currentHoveredCell) {
        removeCellHighlight(player);
        const { x, y } = currentHoveredCell;
        highlightCells(player, x, y, orientation, true);
      }
    }
  })
 
  // Add listeners to board for hightlighting and placing the ship
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {

      // Find the right cell
      const cell = document.querySelector(`[data-x="${x}"][data-y="${y}"][data-player="${player}"]`);

      // Attach listeneres for mouse enter, leave, change orientation and place ship
      cell.addEventListener('mouseenter', () => {
        currentHoveredCell = { x, y }; // Track hovered cell
        highlightCells(player, x, y, orientation, true)
      });

      cell.addEventListener('mouseleave', () => {
        currentHoveredCell = null; // Track hovered cell
        highlightCells(player, x, y, orientation, false)
      });

      // Place ship on click
      cell.addEventListener('click', () => { 
        // Attempt to place and record result
        const successfullyPlaced = GameState.setupShip(player, x, y, orientation); 
        
        if (successfullyPlaced) {
          // Rendering the board removes the listeners
          renderGameBoard(player, false);
          
          console.log(GameState.allShipsPlaced());
          
          if (GameState.allShipsPlaced()) {
            finalizeSetup();
          } else {
            // Re-add listeners
            addSetupCellListeners(player, orientation);
          }
        }
      });
    }
  }
}

function removeCellHighlight(player) {
  const cells = document.querySelectorAll(`[data-player="${player}"]`);

  // Remove listeners by replacing the cell with a clone of itself.
  cells.forEach((cell) => {
    cell.classList.remove('highlighted-cell');
  });
}

function highlightCells(player, startX, startY, orientation, applyHighlight) {

  const length = GameState.getShipSize();

  for (let i = 0; i < length; i++) {
    let x = orientation === 'horizontal' ? startX : startX + i;
    let y = orientation === 'horizontal' ? startY + i : startY;

    // Find cell by matching the data variables
    const cell = document.querySelector(`[data-x="${x}"][data-y="${y}"][data-player="${player}"]`);

    if (cell) {
      // Apply styles to highlight these cells
      if (applyHighlight) {
        cell.classList.add('highlighted-cell');
      } else {
        cell.classList.remove('highlighted-cell');
      }
    }
  }
}
