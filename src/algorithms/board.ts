import { Board } from '~/structures/board';
import { Cell } from '~/structures/cell';
import { Vec2 } from '~/structures/Vector';

// todo: curry up some of these functions... or DRY them out some other way

// Type

type CellOperation<R> = (cell: Cell, index?: number) => R;
type CellReduction<T = Cell> = (acc: T, curr: Cell, index: number) => T;

// Board

export function forCell(board: Board, fn: CellOperation<void>) {
	board.cells.forEach((row) => row.forEach(fn));
}
export function someCell(board: Board, fn: CellOperation<boolean>) {
	return board.cells.some((row) => row.some(fn));
}
export function everyCell(board: Board, fn: CellOperation<boolean>) {
	return board.cells.every((row) => row.every(fn));
}
export function findCell(board: Board, fn: CellOperation<Cell | undefined>) {
	return board.cells.find((row) => row.find(fn));
}
export function filterCell(board: Board, fn: CellOperation<Cell[]>) {
	return board.cells.filter((row) => row.filter(fn));
}
export function mapCell<T>(board: Board, fn: CellOperation<T>) {
	return board.cells.map((row) => row.map(fn));
}
export function reduceCell<T = Cell>(
	board: Board,
	fn: CellReduction<T>,
	initialValue: T,
) {
	return board.cells.flat().reduce<T>(fn, initialValue);
}

// Column

export function forColumn(
	board: Board,
	column: number,
	fn: CellOperation<void>,
) {
	board.cells[column].forEach(fn);
}
export function someColumn(
	board: Board,
	column: number,
	fn: CellOperation<boolean>,
) {
	return board.cells[column].some(fn);
}
export function everyColumn(
	board: Board,
	column: number,
	fn: CellOperation<boolean>,
) {
	return board.cells[column].every(fn);
}
export function findColumn(
	board: Board,
	column: number,
	fn: CellOperation<Cell | undefined>,
) {
	return board.cells[column].find(fn);
}
export function filterColumn(
	board: Board,
	column: number,
	fn: CellOperation<Cell[]>,
) {
	return board.cells[column].filter(fn);
}
export function mapColumn<T>(
	board: Board,
	column: number,
	fn: CellOperation<T>,
) {
	return board.cells[column].map(fn);
}
export function reduceColumn<T>(
	board: Board,
	column: number,
	fn: CellReduction<T>,
	initialValue: T,
): T {
	return board.cells[column].reduce<T>(fn, initialValue);
}

// Row

export function cellsOfRow(board: Board, row: number) {
	return board.cells.map((column) => column[row]);
}

export function forRow(board: Board, row: number, fn: CellOperation<void>) {
	board.cells.forEach((column) => fn(column[row]));
}
export function someRow(board: Board, row: number, fn: CellOperation<boolean>) {
	return board.cells.some((column) => fn(column[row]));
}
export function everyRow(
	board: Board,
	row: number,
	fn: CellOperation<boolean>,
) {
	return board.cells.every((column) => fn(column[row]));
}
export function findRow(
	board: Board,
	row: number,
	fn: CellOperation<Cell | undefined>,
) {
	return board.cells.find((column) => fn(column[row]));
}
export function filterRow(
	board: Board,
	row: number,
	fn: CellOperation<Cell[]>,
) {
	return board.cells.filter((column) => fn(column[row]));
}
export function mapRow<T>(board: Board, row: number, fn: CellOperation<T>) {
	return board.cells.map((column) => fn(column[row]));
}
export function reduceRow<T = Cell>(
	board: Board,
	row: number,
	fn: CellReduction<T>,
	initialValue: T,
) {
	return cellsOfRow(board, row).reduce<T>(fn, initialValue);
}

// Block

function cellsOfBlock(board: Board, coordinate: Vec2) {
	// get the coordinate of the block
	const x = Math.floor(coordinate.x / 3) * 3;
	const y = Math.floor(coordinate.y / 3) * 3;

	// return cells in block
	return board.cells.slice(x, x + 3).flatMap((row) => row.slice(y, y + 3));
}

export function forBlock(board: Board, block: Vec2, fn: CellOperation<void>) {
	cellsOfBlock(board, block).forEach(fn);
}
export function someBlock(
	board: Board,
	block: Vec2,
	fn: CellOperation<boolean>,
) {
	return cellsOfBlock(board, block).some(fn);
}
export function everyBlock(
	board: Board,
	block: Vec2,
	fn: CellOperation<boolean>,
) {
	return cellsOfBlock(board, block).every(fn);
}
export function findBlock(
	board: Board,
	block: Vec2,
	fn: CellOperation<Cell | undefined>,
) {
	return cellsOfBlock(board, block).find(fn);
}
export function filterBlock(
	board: Board,
	block: Vec2,
	fn: CellOperation<Cell[]>,
) {
	return cellsOfBlock(board, block).filter(fn);
}
export function mapBlock<T>(board: Board, block: Vec2, fn: CellOperation<T>) {
	return cellsOfBlock(board, block).map(fn);
}
export function reduceBlock<T = Cell>(
	board: Board,
	block: Vec2,
	fn: CellReduction<T>,
	initialValue: T,
) {
	return cellsOfBlock(board, block).reduce<T>(fn, initialValue);
}
