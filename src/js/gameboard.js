class Gameboard {
  _coordinateMap = new Map(); // Keeps track of coordinates and ships on those coordinates
  _ships = []; // All ships on this board

  constructor() {
    // 10x10 ocean board
    this.board = new Array(10).fill(null).map(() => new Array(10).fill(0));
  }

  // Resets all board back to 0.
  resetBoard() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        this.board[i][j] = 0;
      }
    }
  }

  // Input Ship, coordinate x, coordinate y, 'horizontal' or 'vertical' placement
  // Returns true if ship was successfully placed on the board
  // Returns false if ship was out of bounds or on top of another ship
  placeShip(ship, x, y, orientation) {

    // Save ship coordinates to be written after checking all cells
    let writeCoordinates = [];

    switch (orientation) {
      case 'vertical':
        // Check for out of bounds
        if (ship.length + x > 10) { return false; }
        
        // For vertical, y is constant, x is changing
        for (let i = 0; i < ship.length; i++) {
          if (this.board[x][y] == 0) {
            // Push coordinates to be written in the end
            writeCoordinates.push([x, y]);
          } else {
            return false;
          }

          x++;
        }
        break;

      case 'horizontal':
        // Check for out of bounds
        if (ship.length + y > 10) { return false; }

        // For horizontal, y is changing, x is constant
        for (let i = 0; i < ship.length; i++) {
          if (this.board[x][y] == 0) {
            writeCoordinates.push([x, y]);
          } else {
            return false;
          }

          y++;
        }
        break;

      default:
        console.log('Error! Provide an orientation.');
        return false;
    }

    // Write coordinates
    writeCoordinates.forEach(coordinate => {
      this.board[coordinate[0]][coordinate[1]] = 1;
      this._coordinateMap.set(`${coordinate[0]},${coordinate[1]}`, ship);
    });

    // Place ship in the ships counter
    this._ships.push(ship);
    
    return true;
  }

  /**
   * Processes an attack at the specified coordinates on the game board.
   * 
   * @param {number} x - X-coordinate of the attack. 
   * @param {number} y - Y-coordinate of the attack. 
   * @returns {boolean} - Returns true for a succesful attack, otherwise false.
   */
  receiveAttack(x, y) {
    // Check if was already a missed shot
    if (this.board[x][y] == 2) { return false; }

    // Check if cell with coordinates contains a ship
    if (this.board[x][y] == 0) {
      // Mark as missed
      this.board[x][y] = 2;

      return false;
    }

    // Find the right ship on the coordinate
    const ship = this._coordinateMap.get(`${x},${y}`);

    // Hit the ship
    ship.hit();

    // Mark the square as a successful hit (3)
    this.board[x][y] = 3;

    // Check if sunk, for the console message
    ship.isSunk();

    return true;
  }

  // Returns true if all ships on the board have been sunk
  allShipsSunk() {
    return this._ships.every(ship => ship.isSunk());
  }
}

module.exports = Gameboard;
