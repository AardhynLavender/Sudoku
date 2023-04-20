import { Board } from '~/structures/board';
import { Cell } from '~/structures/cell';
import { Vec2 } from '~/structures/Vector';
import { mapColumn, mapRow, mapBlock } from './board';

export function solutionsInGroup(cells: Cell[]) {
	return cells.reduce<number[]>((solutionsInGroup, cell) => {
		if (cell.candidates.length === 1)
			return [...solutionsInGroup, cell.candidates[0]];
		return solutionsInGroup;
	}, []);
}

export function removeInvalidCandidatesInGroup(cells: Cell[]) {
	const solutions = solutionsInGroup(cells);
	return cells.reduce<Cell[]>((validGroup, cell) => {
		if (cell.candidates.length === 1) return [...validGroup, cell]; // solved cell
		const validCell = {
			...cell,
			candidates: cell.candidates.filter(
				(candidate) => !solutions.includes(candidate),
			),
		};
		return [...validGroup, validCell];
	}, []);
}

export function removeInvalidCandidatesInRow(board: Board, row: number) {
	const cells = mapRow(board, row, (c) => c);
	return removeInvalidCandidatesInGroup(cells);
}
export function removeInvalidCandidatesInColumn(board: Board, col: number) {
	const cells = mapColumn(board, col, (c) => c);
	return removeInvalidCandidatesInGroup(cells);
}
export function removeInvalidCandidatesInBlock(board: Board, block: Vec2) {
	const cells = mapBlock(board, block, (c) => c);
	return removeInvalidCandidatesInGroup(cells);
}
