import { repeat } from '~/algorithms/standard';
import { Cell } from './cell';
import { Vec2 } from './vector';

export const SIZE = 9;
export const BLOCK_SIZE = 3;
export const FULL_CANDIDACY = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export type Board = {
	size: number;
	cells: Cell[][];
};

export function getCell({ x, y }: Vec2, { cells, size }: Board): Cell {
	if (x < 0 || x >= size || y < 0 || y > size)
		throw new Error(`Invalid cell coordinate {${x}, ${y}}`);
	return cells[x][y];
}

export function getSquareIndex({ x, y }: Vec2) {
	return Math.floor(x / BLOCK_SIZE) * BLOCK_SIZE + Math.floor(y / BLOCK_SIZE);
}

export function createBoard() {
	const board: Board = { cells: [], size: SIZE };
	repeat(board.size, (x) => {
		board.cells[x] = [];
		repeat(board.size, (y) => {
			const square = getSquareIndex({ x, y });
			const pos = { x, y };
			board.cells[x][y] = {
				pos,
				square,
				candidates: FULL_CANDIDACY,
			};
		});
	});
	return board;
}
