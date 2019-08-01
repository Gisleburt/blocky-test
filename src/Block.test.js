import Block, { COLOURS } from './Block';

describe('Block', () => {
  it('should be created with correct coordinates and one of the valid colours', () => {
    const testCoords = [[1, 2], [4, 9], [0, 0]];

    testCoords.forEach(testCoord => {
      const block = new Block(...testCoord);
      expect(block.x).toBe(testCoord[0]);
      expect(block.y).toBe(testCoord[1]);
      expect(COLOURS).toContain(block.colour);
    });
  });

  it('should be emptiable', () => {
    const block = new Block(0, 0);
    expect(block.isEmpty()).toBe(false);
    block.empty();
    expect(block.isEmpty()).toBe(true);
  });

  it('should let you fill empty blocks', () => {
    const block = new Block(0, 0);
    // We need to force the color of the block so we can make sure it doesn't change
    block.colour = 'green';

    block.empty();
    block.fill('red');
    expect(block.colour).toBe('red');
  });

  it('should prevent you filling already filled blocks', () => {
    const block = new Block(0, 0);
    // We need to force the color of the block so we can make sure it doesn't change
    block.colour = 'green';

    block.fill('red');
    expect(block.colour).toBe('green');
  });
});
