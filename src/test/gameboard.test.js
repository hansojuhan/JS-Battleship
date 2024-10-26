// Import the Ship class
const Gameboard = require('../js/gameboard');
const Ship = require('../js/ship');

describe('Gameboard', () => {
  test('should create a gameboard with a 10x10 area', () => {
    const gameboard = new Gameboard();

    // 10 rows
    expect(gameboard.board.length).toBe(10);

    // 10 columns
    for (let i = 0; i < gameboard.board.length; i++) {
      expect(gameboard.board[i].length).toBe(10);
    }
  });
});

describe('Gameboard placeShip', () => {
  test('should be able to place a ship in the area vertically', () => {
    const gameboard = new Gameboard();
    const submarine = new Ship(3);

    // Place ship at coordinate x, coordinate y, vertically
    expect(gameboard.placeShip(submarine, 0, 0, 'vertical')).toBe(true);

    // Check each square on the board and verify only 3 have been filled in
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        if ((x == 0 && y == 0) || (x == 1 && y == 0) || (x == 2 && y == 0)) {
          expect(gameboard.board[x][y]).toBe(1);
        } else {
          expect(gameboard.board[x][y]).toBe(0);
        }
      }
    }
  });

  test('should be able to place a ship in the area horizontally', () => {
    const gameboard = new Gameboard();
    const submarine = new Ship(3);

    // Place ship at coordinate x, coordinate y, 'horizontally'
    expect(gameboard.placeShip(submarine, 5, 5, 'horizontal')).toBe(true);

    // Check each square on the board and verify only 3 have been filled in
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        if ((x == 5 && y == 5) || (x == 5 && y == 6) || (x == 5 && y == 7)) {
          expect(gameboard.board[x][y]).toBe(1);
        } else {
          expect(gameboard.board[x][y]).toBe(0);
        }
      }
    }
  });

  test('should not be able to place a ship out of bounds', () => {
    const gameboard = new Gameboard();
    const carrier = new Ship(5);
    
    // Try placing in column 7 (7 + 5 = 12)
    expect(gameboard.placeShip(carrier, 8, 7, 'horizontal')).toBe(false);

    // Clean out board.
    gameboard.resetBoard();

    expect(gameboard.placeShip(carrier, 8, 7, 'vertical')).toBe(false);

    // Clean out board.
    gameboard.resetBoard();

    expect(gameboard.placeShip(carrier, 8, 5, 'horizontal')).toBe(true);
    
    // Clean out board.
    gameboard.resetBoard();

    expect(gameboard.placeShip(carrier, 5, 7, 'vertical')).toBe(true);

  });

  test('should not be able to place a ship on top of another ship', () => {
    const gameboard = new Gameboard();
    
    const carrier = new Ship(5);
    const destroyer = new Ship(4);

    // Place the first ship
    gameboard.placeShip(carrier, 2, 0, 'horizontal');

    // Try to place another on top
    expect(gameboard.placeShip(destroyer, 0, 1, 'vertical')).toBe(false);
  });

  test('returns false if orientation is not specified', () => {
    const gameboard = new Gameboard();
    const carrier = new Ship(5);
    
    // Place the first ship
    gameboard.placeShip(carrier, 2, 0);
  });
});

describe('Gameboard receiveAttack', () => {
  test('returns true if attack hit a ship', () => {
    const gameboard = new Gameboard();
    const submarine = new Ship(3);
    gameboard.placeShip(submarine, 0, 0, 'vertical');

    expect(gameboard.receiveAttack(0, 0)).toBe(true);
  });

  test('should send hit to the correct Ship if attack hit a ship', () => {
    const gameboard = new Gameboard();

    const submarine = new Ship(3);
    const destroyer = new Ship(2);
    const carrier = new Ship(5);
    gameboard.placeShip(submarine, 0, 0, 'vertical');
    gameboard.placeShip(destroyer, 3, 3, 'vertical');
    gameboard.placeShip(carrier, 8, 0, 'horizontal');

    gameboard.receiveAttack(0, 0);

    expect(submarine.timesHit).toBe(1);
  });

  test('should record coordinates of missed shot, if missed', () => {
    const gameboard = new Gameboard();

    const destroyer = new Ship(2);
    gameboard.placeShip(destroyer, 3, 3, 'vertical');

    // receiveAttack() returns true in case of a miss 
    expect(gameboard.receiveAttack(0, 0)).toBe(true);

    // On the board, a missed shot is marked as 2
    expect(gameboard.board[0][0]).toBe(2);
  });
});

describe('Gameboard allShipsSunk', () => {
  test('returns true if no ships on board', () => {
    const gameboard = new Gameboard();

    expect(gameboard.allShipsSunk()).toBe(true);
  });

  test('returns false if at least one unsunk ship', () => {
    const gameboard = new Gameboard();
    const submarine = new Ship(3);
    gameboard.placeShip(submarine, 0, 0, 'vertical');

    expect(gameboard.allShipsSunk()).toBe(false);
  });

  test('returns true if all are sunk', () => {
    const gameboard = new Gameboard();

    const destroyer = new Ship(2);
    gameboard.placeShip(destroyer, 0, 0, 'vertical');
    destroyer.hit();
    destroyer.hit();

    const destroyer2 = new Ship(2);
    gameboard.placeShip(destroyer2, 5, 5, 'vertical');
    destroyer2.hit();
    destroyer2.hit();

    expect(gameboard.allShipsSunk()).toBe(true);
  });
});

// describe('Gameboard', () => {
//   test('', () => {});
// });
