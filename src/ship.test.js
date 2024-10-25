// Import the Ship class
const Ship = require('./ship');

describe('Ship', () => {
  test('should create a ship with the correct length, times hit and sunk status', () => {
    const ship = new Ship(4);

    expect(ship.length).toBe(4);
    expect(ship.timesHit).toBe(0);
    expect(ship.isSunk()).toBe(false);

  });

  test('should increment timesHit when hit() is called', () => {
    const ship = new Ship(4);
    
    ship.hit();
    expect(ship.timesHit).toBe(1);

    ship.hit();
    expect(ship.timesHit).toBe(2);

    ship.hit();
    ship.hit();
    expect(ship.timesHit).toBe(4);
  });

  test('should sink the ship when hits are equal or more than the length', () => {
    const ship = new Ship(4);
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);

    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });

  test('shoud not sink the ship if hits are less than length', () => {
    const ship = new Ship(4);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });
});
