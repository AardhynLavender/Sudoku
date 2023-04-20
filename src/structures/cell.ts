import { Vec2 } from './vector';

export type Cell = {
	pos: Vec2;
	square: number;
	candidates: number[];
};

export function hasCandidate(cell: Cell, predicate: number) {
	return cell.candidates.includes(predicate);
}

export function hasCandidates(cell: Cell, predicates: number[]) {
	if (
		cell.candidates.length === 0 ||
		predicates.length === 0 ||
		predicates.length > cell.candidates.length
	)
		return false;
	return cell.candidates.every((candidate) => hasCandidate(cell, candidate));
}

export function isCell(cell: unknown): cell is Cell {
	return (
		typeof cell === 'object' &&
		cell !== null &&
		cell !== undefined &&
		'candidates' in cell &&
		'row' in cell &&
		'column' in cell &&
		'block' in cell
	);
}
