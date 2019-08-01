import Block from './Block';

class BlockGrid {
  constructor(width = 10, height = 10) {
    this.width = width;
    this.height = height;
    this.grid = [];

    for (let x = 0; x < this.width; x++) {
      const col = [];
      for (let y = 0; y < this.height; y++) {
        col.push(new Block(x, y));
      }

      this.grid.push(col);
    }
  }

  render(el = document.getElementById('gridEl')) {
    for (let x = 0; x < this.width; x++) {
      const id = 'col_' + x;
      const colEl = document.createElement('div');
      colEl.id = id;
      colEl.className = 'col';
      el.appendChild(colEl);

      for (let y = this.height - 1; y >= 0; y--) {
        const block = this.grid[x][y];
        const id = `block_${x}x${y}`;
        const blockEl = document.createElement('div');

        blockEl.id = id;
        blockEl.className = 'block';
        blockEl.style.background = block.colour;
        blockEl.addEventListener('click', evt => this.blockClicked(evt, block));
        colEl.appendChild(blockEl);
      }
    }
  }

  blockClicked(e, block) {
    console.log(e, block);
  }

  isInBounds(x, y) {
    return x >= 0
      && x < this.width
      && y >= 0
      && y < this.height;
  }

  getNeighbours(x, y) {
    const neighbours = [];
    // Check the request is in bounds.
    if (this.isInBounds(x, y)) {
      if (x > 0) {
        neighbours.push(this.grid[x - 1][y]);
      }
      if (x < this.width - 1) {
        neighbours.push(this.grid[x + 1][y]);
      }
      if (y > 0) {
        neighbours.push(this.grid[x][y - 1]);
      }
      if (y < this.height - 1) {
        neighbours.push(this.grid[x][y + 1]);
      }
    }
    return neighbours;
  }

  getSimilarNeighbours(x, y) {
    if (!this.isInBounds(x, y)) {
      return [];
    }
    const block = this.grid[x][y];
    return this.getNeighbours(x, y).filter((neighbour) => (neighbour.colour === block.colour));
  }

  // We'll need to modify chain as we go.
  getChain(x, y, chain = []) {
    if (this.isInBounds(x, y)) {
      const block = this.grid[x][y];
      if (chain.includes(block)) {
        return chain;
      }
      chain.push(block);
      this.getSimilarNeighbours(x, y).forEach((block) => {
        this.getChain(block.x, block.y, chain);
      });
      return chain;
    }
  }

  emptyFrom(x, y) {
    this.getChain(x, y).forEach((block) => block.empty())
  }
}

export default BlockGrid;
