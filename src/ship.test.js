// Import the Ship class
const Ship = require('./ship');

describe('Ship', () => {
  test('should create a ship with the correct length, times hit and sunk status', () => {
    
    const ship = new Ship(4);

    expect(ship.length).toBe(4);
    expect(ship.timesHit).toBe(0);
    expect(ship.isSunk()).toBe(false);

  });

});
