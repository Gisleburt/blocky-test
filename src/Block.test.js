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
});
