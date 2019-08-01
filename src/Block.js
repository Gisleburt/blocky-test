export const COLOURS = ['red', 'green', 'blue', 'yellow'];
export const empty = 'grey';

class Block {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.colour = COLOURS[Math.floor(Math.random() * COLOURS.length)];
  }

  empty() {
    this.colour = empty;
  }

  isEmpty() {
    return this.colour === empty;
  }
}

export default Block;
