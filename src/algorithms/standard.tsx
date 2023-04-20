import { withinBoundAssertion, validBlockAssertion } from '~/assertions/bounds';
import { Vec2 } from '~/structures/Vector';

/**
 * Iterate over a range of consecutive numbers (`start`:`end`)
 * @example forRange(0, 10, i => console.log(i)) // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
 * @param start iteration start
 * @param end end of iteration
 * @param fn function to call on each iteration
 */
export function forRange(start: number, end: number, fn: (i: number) => void) {
	if (start > end) throw new Error('`start` must be less than `end`');
	for (let i = start; i < end; i++) fn(i);
}

/**
 * Iterate over a `0`:`times` range
 * @param times times to repeat `fn`
 * @param fn  function to repeat `times` times
 */
export function repeat(times: number, fn: (i: number) => void) {
	if (times < 0) throw new Error('`times` must be greater than 0');
	forRange(0, times, fn);
}

/**
 * Convert a 1D index to a 2D coordinate within a defined space
 * @param width width of space to index
 * @param height height of space to index
 * @param index 1D index to convert
 * @returns a 2D coordinate
 */
export function indexToCoordinate(
	width: number,
	height: number,
	index: number,
): Vec2 {
	const coord = {
		x: index % width,
		y: Math.floor(index / width),
	};
	withinBoundAssertion(width, height, coord);
	return coord;
}

/**
 * Convert a 1D index of a block to a 2D coordinate within a defined space
 * @param width width of total space
 * @param height height of total space
 * @param blockWidth width of block to index
 * @param blockHeight height of block to index
 * @param index 1D index to convert to 2D coordinate
 * @returns a 2D coordinate identifying the top left corner of the block
 */
export function blockIndexToCoordinate(
	width: number,
	height: number,
	blockWidth: number,
	blockHeight: number,
	index: number,
): Vec2 {
	validBlockAssertion(width, height, blockWidth, blockHeight);
	const coord = {
		x: (index % (width / 3)) * blockWidth,
		y: Math.floor(index / (width / blockWidth)) * blockHeight,
	};
	withinBoundAssertion(width, height, coord);
	return coord;
}

/**
 * Convert a 2D coordinate to a 1D index within a defined space
 * @param width width of space to index
 * @param height height of space to index
 * @param coordinate 2D coordinate to convert
 * @returns a 1D index
 */
export function coordinateToIndex(
	width: number,
	height: number,
	coordinate: Vec2,
): number {
	withinBoundAssertion(width, height, coordinate);
	return coordinate.x + coordinate.y * width;
}
