import BlockGrid from './BlockGrid';
import Block from './Block';

describe('BlockGrid', () => {
  it('fills a multidimensional array of Blocks as its grid, according to the given width and height', () => {
    const grid = new BlockGrid(10, 10).grid;

    expect(grid.length).toBe(10);

    grid.forEach(column => {
      expect(column.length).toBe(10);

      column.forEach(block => {
        expect(block).toBeInstanceOf(Block);
      });
    });

    const gridB = new BlockGrid(3, 5).grid;

    expect(gridB.length).toBe(3);

    gridB.forEach(column => {
      expect(column.length).toBe(5);
    });
  });

  it('can tell if coordinates are in bounds', () => {
    const grid = new BlockGrid(2, 2);
    expect(grid.isInBounds(0, 0)).toBe(true);
    expect(grid.isInBounds(0, 1)).toBe(true);
    expect(grid.isInBounds(1, 0)).toBe(true);
    expect(grid.isInBounds(1, 1)).toBe(true);
    expect(grid.isInBounds(0, 2)).toBe(false);
    expect(grid.isInBounds(2, 0)).toBe(false);
    expect(grid.isInBounds(0, -1)).toBe(false);
    expect(grid.isInBounds(0, -1)).toBe(false);
  });

  it('it can get a blocks neighbours', () => {
    const grid = new BlockGrid(3, 3);

    const middleNeighbours = grid.getNeighbours(1, 1);
    expect(middleNeighbours.length).toBe(4);

    const edgeNeighbours = grid.getNeighbours(0, 1);
    expect(edgeNeighbours.length).toBe(3);

    const cornerNeighbours = grid.getNeighbours(0, 0);
    expect(cornerNeighbours.length).toBe(2);

    const outOfBoundsNeighbours = grid.getNeighbours(-1, -1);
    expect(outOfBoundsNeighbours.length).toBe(0);
  });

  it('it can get neighbours of the same color', () => {
    const grid = new BlockGrid(3, 3);
    // We'll override the grid:
    //
    // y
    // 2 R R R
    // 1 G G B
    // 0 G G B
    //   0 1 2 x
    grid.grid[0][0].colour = 'green';
    grid.grid[0][1].colour = 'green';
    grid.grid[0][2].colour = 'red';
    grid.grid[1][0].colour = 'green';
    grid.grid[1][1].colour = 'green';
    grid.grid[1][2].colour = 'red';
    grid.grid[2][0].colour = 'blue';
    grid.grid[2][1].colour = 'blue';
    grid.grid[2][2].colour = 'red';

    const redNeighbours = grid.getSimilarNeighbours(1, 2);
    expect(redNeighbours.length).toBe(2);

    const greenNeighbours = grid.getSimilarNeighbours(0, 0);
    expect(greenNeighbours.length).toBe(2);

    const blueNeighbours = grid.getSimilarNeighbours(2, 0);
    expect(blueNeighbours.length).toBe(1);
  });

  it('it can find the full chain of similar blocks', () => {
    const grid = new BlockGrid(3, 3);
    // We'll override the grid:
    //
    // y
    // 2 R R R
    // 1 G G B
    // 0 G G B
    //   0 1 2 x
    grid.grid[0][0].colour = 'green';
    grid.grid[0][1].colour = 'green';
    grid.grid[0][2].colour = 'red';
    grid.grid[1][0].colour = 'green';
    grid.grid[1][1].colour = 'green';
    grid.grid[1][2].colour = 'red';
    grid.grid[2][0].colour = 'blue';
    grid.grid[2][1].colour = 'blue';
    grid.grid[2][2].colour = 'red';

    const redchain = grid.getChain(0, 2);
    expect(redchain.length).toBe(3);

    const greenChain = grid.getChain(0, 0);
    expect(greenChain.length).toBe(4);

    const blueChain = grid.getChain(2, 0);
    expect(blueChain.length).toBe(2);
  });

  it('can empty all chained blocks', () => {
    const grid = new BlockGrid(3, 3);
    // We'll override the grid:
    //
    // y
    // 2 R R R
    // 1 G G B
    // 0 G G B
    //   0 1 2 x
    grid.grid[0][0].colour = 'green';
    grid.grid[0][1].colour = 'green';
    grid.grid[0][2].colour = 'red';
    grid.grid[1][0].colour = 'green';
    grid.grid[1][1].colour = 'green';
    grid.grid[1][2].colour = 'red';
    grid.grid[2][0].colour = 'blue';
    grid.grid[2][1].colour = 'blue';
    grid.grid[2][2].colour = 'red';

    grid.emptyFrom(0, 2);
    expect(grid.grid[0][0].isEmpty()).toBe(false);
    expect(grid.grid[0][1].isEmpty()).toBe(false);
    expect(grid.grid[0][2].isEmpty()).toBe(true);
    expect(grid.grid[1][0].isEmpty()).toBe(false);
    expect(grid.grid[1][1].isEmpty()).toBe(false);
    expect(grid.grid[1][2].isEmpty()).toBe(true);
    expect(grid.grid[2][0].isEmpty()).toBe(false);
    expect(grid.grid[2][1].isEmpty()).toBe(false);
    expect(grid.grid[2][2].isEmpty()).toBe(true);
  });

  it('drops filled blocks into empty ones', () => {
    const grid = new BlockGrid(3, 3);
    // We'll override the grid:
    //
    // y
    // 2 R R R
    // 1 E E B
    // 0 E E B
    //   0 1 2 x
    //
    // expected output
    //
    // y
    // 2 E E R
    // 1 E E B
    // 0 R R B
    //   0 1 2 x
    grid.grid[0][0].empty();
    grid.grid[0][1].empty();
    grid.grid[0][2].colour = 'red';
    grid.grid[1][0].empty();
    grid.grid[1][1].empty();
    grid.grid[1][2].colour = 'red';
    grid.grid[2][0].colour = 'blue';
    grid.grid[2][1].colour = 'blue';
    grid.grid[2][2].colour = 'red';

    grid.applyGravity();
    expect(grid.grid[0][0].colour).toBe('red');
    expect(grid.grid[0][1].isEmpty()).toBe(true);
    expect(grid.grid[0][2].isEmpty()).toBe(true);
    expect(grid.grid[1][0].colour).toBe('red');
    expect(grid.grid[1][1].isEmpty()).toBe(true);
    expect(grid.grid[1][2].isEmpty()).toBe(true);
    expect(grid.grid[2][0].colour).toBe('blue');
    expect(grid.grid[2][1].colour).toBe('blue');
    expect(grid.grid[2][2].colour).toBe('red');
  });
});
