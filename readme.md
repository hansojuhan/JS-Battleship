# Battleship

Battleship game built in JS with the goal of learning TDD. User Jest for writing unit tests for the classes.

## Main features

- Includes main game logic (gameboard.js), which allows placing ships, hitting enemy ships and checking if all ships have been sunk.

- Includes 2 players that each have a gameboard.

- Includes rendering the game out to the screen (dom.js), including placing ships and then clicking on opponent board to sink ships.

- Includes gamestate.js, a singleton instance that holds the game state and let's other modules access the state globally.

## Further improvements

- [ ] Add testing also for gamestate public methods.

- [ ] Implement a PC opponent and hide their board setup from the player.

- [ ] Implement game messages after each action.

- [ ] Fix styles so game would be mobile-friendly.
