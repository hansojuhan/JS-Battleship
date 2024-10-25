// Import the Ship class
const Gameboard = require('./gameboard');
const Ship = require('./ship');

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

    expect(gameboard.placeShip(carrier, 8, 7, 'vertical')).toBe(false);

    // Place ship at coordinate x, coordinate y, 'horizontally'
    expect(gameboard.placeShip(carrier, 8, 5, 'horizontal')).toBe(true);

    // Place ship at coordinate x, coordinate y, 'horizontally'
    expect(gameboard.placeShip(carrier, 5, 7, 'vertical')).toBe(true);
  });

  // test('should not be able to place a ship on top of another ship', () => {});

  // test('returns false if orientation is not specified', () => {});
});
