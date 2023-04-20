import { Vec2 } from '~/structures/Vector';

/**
 * Assert that a coordinate is within the bounds of a defined space
 * @param width width of space
 * @param height height of space
 * @param coordinate coordinate to assert
 */
export function withinBoundAssertion(
	width: number,
	height: number,
	{ x, y }: Vec2,
) {
	if (x < 0 || x >= width || y < 0 || y >= height)
		throw new Error('Coordinate is not within the defined space');
}

export function validBlockAssertion(
	width: number,
	height: number,
	blockWidth: number,
	blockHeight: number,
) {
	// In Sudoku, blocks must fit within the board
	if (width % blockWidth || height % blockHeight)
		throw new Error(
			'Defined space cannot contain the size of blocks specified',
		);
}
