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
});
