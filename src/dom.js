/************************  Imports    ************************/
// Gamestate singleton
const GameState = require("./gamestate");

/************************  Functions  ************************/
// Clears and rerenders the board
export function renderGameBoard() {
  // Clear content first 
  let content = document.getElementById('content');
  content.innerHTML = '';

  // Container div
  const container = document.createElement('div');
  container.classList.add('board-container');
  
  // 10x10 grid
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {

      const boardCell = document.createElement('div');
      boardCell.classList.add('board-cell');
      boardCell.id = `cell-${x}-${y}`;
      container.append(boardCell);
      
    }
  }

  // Attach to content
  content = document.getElementById('content');
  content.append(container);
}

export function renderPlayerNames() {
  const name1Title = document.getElementById('player-1-name');
  name1Title.innerText = `Player 1: ${GameState.getPlayerNames().player1Name}`;

  const name2Title = document.getElementById('player-2-name');
  name2Title.innerText = `Player 2: ${GameState.getPlayerNames().player2Name}`;
}
