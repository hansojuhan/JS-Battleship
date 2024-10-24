// Ship class
class Ship {
  constructor(length) {
    this.length = length;
    this.timesHit = 0;

    console.log(`Created a ship with length: ${this.length}`);
  }

  // Increases the number of hits
  hit() {
    this.timesHit++;

    console.log(`Ship is hit! Times hit: ${this.timesHit}`);
  }

  // Calculates whether a ship is considered sunk based on its length 
  // and the number of hits it has received
  isSunk() {
    return this.timesHit >= this.length ? true : false;
  }
}

module.exports = Ship;
