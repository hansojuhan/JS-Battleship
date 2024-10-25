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


  // });

  // test('should not be able to place a ship on top of another ship', () => {
  // });

// test('should create a ship with the correct length, times hit and sunk status', () => {
//     const ship = new Ship(4);

//     expect(ship.length).toBe(4);
//     expect(ship.timesHit).toBe(0);
//     expect(ship.isSunk()).toBe(false);

//   });

//   test('should increment timesHit when hit() is called', () => {
//     const ship = new Ship(4);
    
//     ship.hit();
//     expect(ship.timesHit).toBe(1);

//     ship.hit();
//     expect(ship.timesHit).toBe(2);

//     ship.hit();
//     ship.hit();
//     expect(ship.timesHit).toBe(4);
//   });

//   test('should sink the ship when hits are equal or more than the length', () => {
//     const ship = new Ship(4);
//     ship.hit();
//     ship.hit();
//     ship.hit();
//     ship.hit();
//     expect(ship.isSunk()).toBe(true);

//     ship.hit();
//     expect(ship.isSunk()).toBe(true);
//   });

//   test('shoud not sink the ship if hits are less than length', () => {
//     const ship = new Ship(4);
//     ship.hit();
//     ship.hit();
//     ship.hit();
//     expect(ship.isSunk()).toBe(false);
//   });
});
