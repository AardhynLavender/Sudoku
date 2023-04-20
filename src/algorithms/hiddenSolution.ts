import { Board } from '~/structures/board';
import { Cell } from '~/structures/cell';
import { Vec2 } from '~/structures/Vector';
import { mapBlock, mapRow, mapColumn } from './board';

function hiddenSolutionsInGroup(cells: Cell[]) {
	return cells.map((cell, i) => {
		if (cell.candidates.length === 1) return cell; // skip solved cells

		const soleCandidates = cell.candidates.filter((candidate) => {
			// filter the other cells with this candidate
			const otherCells = cells.filter((_, j) => i !== j);
			const otherCellsWithCandidate = otherCells.filter((otherCell) =>
				otherCell.candidates.includes(candidate),
			);

			const soleCandidate = !otherCellsWithCandidate.length;
			return soleCandidate;
		});

		// if there is only one candidate, then it is a hidden solution
		if (soleCandidates.length === 1)
			return { ...cell, candidates: [soleCandidates[0]] };

		if (soleCandidates.length > 1)
			throw new Error(
				'Multiple hidden solutions found in group, this should not happen',
			);

		return cell;
	});
}

export function hiddenSolutionsInRow(board: Board, row: number) {
	const cells = mapRow(board, row, (c) => c);
	return hiddenSolutionsInGroup(cells);
}
export function hiddenSolutionsInColumn(board: Board, col: number) {
	const cells = mapColumn(board, col, (c) => c);
	return hiddenSolutionsInGroup(cells);
}
export function hiddenSolutionsInBlock(board: Board, block: Vec2) {
	const cells = mapBlock(board, block, (c) => c);
	return hiddenSolutionsInGroup(cells);
}
