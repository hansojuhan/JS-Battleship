class Gameboard {
  constructor() {
    // 10x10 ocean board
    this.board = new Array(10).fill(null).map(() => new Array(10).fill(0));
  }

  // Input Ship, coordinate x, coordinate y, 'horizontal' or 'vertical' placement
  // Returns true if ship was successfully placed on the board
  // Returns false if ship was out of bounds or on top of another ship
  placeShip(ship, coordinateX, coordinateY, orientation) {

    let x = coordinateX;
    let y = coordinateY;

    switch (orientation) {
      case 'vertical':
        
        // For vertical, y is constant, x is changing
        for (let i = 0; i < ship.length; i++) {
          if (this.board[x][y] == 0) {
            // If square is free, mark as occupied
            this.board[x][y] = 1;
            x++;
          }
        }
        break;

      case 'horizontal':

        // For horizontal, y is changing, x is constant
        for (let i = 0; i < ship.length; i++) {
          if (this.board[x][y] == 0) {
            // If square is free, mark as occupied
            this.board[x][y] = 1;
            y++;
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
