import { createSignal } from 'solid-js';
import { Board, createBoard, getSquareIndex } from '~/structures/board';
import { Cell } from '~/structures/cell';
import { Vec2 } from '~/structures/Vector';
import { forBlock } from '~/algorithms/board';
import {
	coordinateToIndex,
	indexToCoordinate,
	repeat,
	blockIndexToCoordinate,
} from '~/algorithms/standard';
import {
	removeInvalidCandidatesInBlock,
	removeInvalidCandidatesInColumn,
	removeInvalidCandidatesInRow,
} from '~/algorithms/invalidCandidates';
import {
	hiddenSolutionsInBlock,
	hiddenSolutionsInColumn,
	hiddenSolutionsInRow,
} from '~/algorithms/hiddenSolution';
import produce from 'immer';
import { WritableDraft } from 'immer/dist/internal';

// State

const [board, setBoard] = createSignal<Board>(createBoard());

// Util

export function toCoordinate(index: number) {
	return indexToCoordinate(board().size, board().size, index);
}
export function toIndex(coordinate: Vec2) {
	return coordinateToIndex(board().size, board().size, coordinate);
}

// Mouse Tracking

const [mouseCoordinate, setMouseCoordinate] = createSignal<Vec2 | null>(null);
export function useMouse() {
	const mouseSquare = () => {
		const vec = mouseCoordinate();
		if (!vec) return null;
		const index = getSquareIndex(vec);
		return index;
	};

	const _setMouseCoordinate = (vec: Vec2 | null) => {
		if (!vec) {
			setMouseCoordinate(null);
			return;
		}

		const { x, y } = vec;
		if (x < 0 || x > board().size || y < 0 || y > board().size)
			// Mouse is outside the board
			setMouseCoordinate(null);
		else setMouseCoordinate({ x, y });
	};

	return {
		setMouseCoordinate: _setMouseCoordinate,
		mouseCoordinate,
		mouseSquare,
	};
}

// Mutation

/**
 * Immer wrapper for mutating the board
 */
function mutateBoard(fn: (draft: WritableDraft<Board>) => void) {
	setBoard(
		produce(board(), (draft) => {
			fn(draft);
		}),
	);
}
function validGroupMutation(mutation: Cell[], group: string) {
	const error = `Invalid Mutation: ${group} mutation has invalid number of cells`;
	if (mutation.length !== board().size) throw new Error(error);
}

/**
 * Private board mutation functions
 */
function useMutateBoard() {
	const setColumn = (col: number, cells: Cell[]) => {
		validGroupMutation(cells, 'column');
		mutateBoard((draft) => {
			draft.cells[col] = cells;
		});
	};
	const setRow = (row: number, cells: Cell[]) => {
		validGroupMutation(cells, 'row');
		mutateBoard((draft) => {
			repeat(draft.size, (i) => (draft.cells[i][row] = cells[i]));
		});
	};
	const setBlock = (coordinate: Vec2, cells: Cell[]) => {
		validGroupMutation(cells, 'block');
		mutateBoard((draft) => {
			forBlock(draft, coordinate, ({ pos }) => {
				const next = cells.shift();
				if (!next) throw new Error('Invalid number of cells in block');
				draft.cells[pos.x][pos.y] = next;
			});
		});
	};

	return {
		setColumn,
		setRow,
		setBlock,
	};
}

export function useMutateCandidacy() {
	const addCandidate = (cell: Cell, candidate: number) =>
		mutateBoard((draft) => {
			draft.cells[cell.pos.x][cell.pos.y].candidates.push(candidate);
		});
	const removeCandidate = (cell: Cell, candidate: number) =>
		mutateBoard((draft) => {
			const newCandidates = draft.cells[cell.pos.x][
				cell.pos.y
			].candidates.filter((c) => c !== candidate);
			draft.cells[cell.pos.x][cell.pos.y].candidates = newCandidates;
		});
	const isolateCandidate = ({ x, y }: Vec2, candidate: number) =>
		mutateBoard((draft) => {
			const newCandidates = (draft.cells[x][y].candidates = [candidate]);
			draft.cells[x][y].candidates = newCandidates;
		});

	return {
		addCandidate,
		removeCandidate,
		isolateCandidate,
	};
}

// Getter

/**
 * Public board access
 */
export function useBoard() {
	return board;
}

// Resolution

/**
 * Functions to solve the board
 */
export function useResolution() {
	const { setRow, setColumn, setBlock } = useMutateBoard();

	const resolve = () => {
		// todo: 	repeat until an iteration makes no mutations.
		//				Declare the bold solved or unsolvable based on the boards state.

		const { size } = board();
		const blockSize = Math.sqrt(size);

		// I repeat `size` times because there is the
		// same number of rows, columns, and blocks.
		repeat(size, (i) => {
			const block = blockIndexToCoordinate(size, size, blockSize, blockSize, i);

			// solve cells with a only instance of a candidate in a row, column, or block
			setRow(i, hiddenSolutionsInRow(board(), i));
			setColumn(i, hiddenSolutionsInColumn(board(), i));
			setBlock(block, hiddenSolutionsInBlock(board(), block));

			// clear out old candidates
			setRow(i, removeInvalidCandidatesInRow(board(), i));
			setColumn(i, removeInvalidCandidatesInColumn(board(), i));
			setBlock(block, removeInvalidCandidatesInBlock(board(), block));
		});
	};

	const resolveStep = (step: number = 1) => {
		throw new Error('Not implemented');
	};

	const canResolve = () => {
		throw new Error('Not implemented');
	};

	return { resolve, resolveStep, canResolve };
}
