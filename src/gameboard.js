class Gameboard {
  constructor() {
    // 10x10 ocean board
    this.board = new Array(10).fill(null).map(() => new Array(10).fill(0));
  }

  // Input Ship, coordinate x, coordinate y, 'horizontal' or 'vertical' placement
  // Returns true if ship was successfully placed on the board
  // Returns false if ship was out of bounds or on top of another ship
  placeShip(ship, coordinateX, coordinateY, orientation) {

    const length = ship.length;
    const x = coordinateX;
    const y = coordinateY;
    let i;

    switch (orientation) {
      case 'vertical':
        
        // For vertical, y is constant, x is changing
        for (let x = 0; x < ship.length; x++) {
          if (this.board[x][y] == 0) {
            // If square is free, mark as occupied
            this.board[x][y] = 1;
          } else {
            // If square is not free, return false
            return false;
          }
        }
        break;

      case 'horizontal':

        // For vertical, i = always y
        i = x;
        for (let j = 0; j < ship.length; j++) {
          if (this.board[i][j] == 0) {
            // If square is free, mark as occupied
            this.board[i][j] = 1;
          } else {
            // If square is not free, return false
            return false;
          }
        }
        break;

      default:
        console.log('Error! Provide an orientation.');
        return false;
    }

    // In case of success, return true
    return true;
  }
}

module.exports = Gameboard;
