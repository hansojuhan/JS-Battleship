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

export function renderPlayerName(number, name) {
  const nameTitle = document.getElementById(`player-${number}-name`);
  nameTitle.innerText = `Player ${number}: ${name}`;
}
