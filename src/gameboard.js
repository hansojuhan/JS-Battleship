class Gameboard {
  constructor() {
    // 10x10 ocean board
    this.board = new Array(10).fill(null).map(() => new Array(10).fill(0));
  }

  // Input Ship, coordinate x, coordinate y
  // Returns true if ship was successfully placed on the board
  // Returns false if ship was out of bounds or on top of another ship
  placeShip(ship, coordinateX, coordinateY) {

    // Ship length 3
    // 0, 0
    /**
     * needs to go to
     * 0,0
     * 0,1
     * 0,2
     * 
     * go through the coordionates
     * check if value 0, continue, otherwise return false
     */

    const length = ship.length;
    const x = coordinateX;
    const y = coordinateY;

    // For vertical, i = always y
    let i = y;
    for (let j = 0; j < ship.length; j++) {
      if (this.board[i][j] == 0) {
        // If square is free, mark as occupied
        this.board[i][j] = 1;
      } else {
        // If square is not free, return false
        return false;
      }
    }

    return true;
  }
}

module.exports = Gameboard;
