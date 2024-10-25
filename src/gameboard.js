class Gameboard {
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
  placeShip(ship, coordinateX, coordinateY, orientation) {

    let x = coordinateX;
    let y = coordinateY;

    /**
     * instead of immediately marking done 1s,
     * run a check of the whole length first
     * 
     * if board is free, add the coordinates into an array
     * keep pushing coordinates until the end
     * 
     * if length is not empty, return false
     * if lenfth is empty, run another loop and 
     * for each coordinate in the array, write the 1
     */

    let writeCoordinates = [];

    switch (orientation) {
      case 'vertical':
        // Check for out of bounds
        if (ship.length + x > 10) { return false; }
        
        // For vertical, y is constant, x is changing
        for (let i = 0; i < ship.length; i++) {
          if (this.board[x][y] == 0) {
            // If square is free, mark as occupied
            // this.board[x][y] = 1;
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
            // If square is free, mark as occupied
            // this.board[x][y] = 1;

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
    });

    // In case of success, return true
    return true;
  }
}

module.exports = Gameboard;
