/************************  Imports    ************************/
// Gamestate singleton
const GameState = require("./gamestate");

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
      boardCell.innerText = cellValue;
      // Apply styles
      boardCell.classList.add('board-cell');
      if (cellValue == 1 ||cellValue == 3) {
        boardCell.classList.add('ship');
      }
      // Add an event listener to listen for the click
      boardCell.addEventListener('click', (event) => cellClick(event));
    }
  }

  // Attach to content
  // content = document.getElementById('content');
  content.append(container);
}


function cellClick(event) {
  const targetPlayer = event.target.dataset.player;
  const x = event.target.dataset.x;
  const y = event.target.dataset.y;

  // Allow clicks only on the opponent's board
  if (targetPlayer == GameState.getCurrentTurn()) {
    console.log("Don't attack your own ships!");
    return false;
  }

  // In case of a successful attack
  if (GameState.attackShip(targetPlayer, x, y)) {
    renderGameBoard(targetPlayer);
    // Advance turn to the next player
    GameState.advanceCurrentTurn();
    renderCurrentTurnPlayerName();
  }
}

// Checks which player has the turn and renders name on the screen
export function renderCurrentTurnPlayerName() {
  const turnLabel = document.getElementById('current-turn');
  turnLabel.innerText = GameState.getCurrentTurn() == 1 ? GameState.getPlayerNames().player1Name : GameState.getPlayerNames().player2Name;
}

// Renders player names
export function renderPlayerNames() {
  const name1Title = document.getElementById('player-1-name');
  name1Title.innerText = `Player 1: ${GameState.getPlayerNames().player1Name}`;

  const name2Title = document.getElementById('player-2-name');
  name2Title.innerText = `Player 2: ${GameState.getPlayerNames().player2Name}`;
}
