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

    // Place ship at coordinate x, coordinate y
    expect(gameboard.placeShip(submarine, 0, 0)).toBe(true);
  });

  test('should be able to place a ship in the area horizontally', () => {
  });

  test('should not be able to place a ship out of bounds', () => {


  });

  test('should not be able to place a ship on top of another ship', () => {
  });

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
