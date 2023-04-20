import { createEffect, createSignal, For } from 'solid-js';
import { useMouse } from '~/hooks/board';
import { BLOCK_SIZE, FULL_CANDIDACY } from '~/structures/board';
import { Cell } from '~/structures/cell';
import Candidate from './Candidate';

const gridTemplate = `repeat(${Math.sqrt(FULL_CANDIDACY.length)}, 1fr)`;

export default function BoardCell(props: { cell: Cell }) {
	const [mouseOnAxis, setMouseOnAxis] = createSignal(false);
	const [mouseOnCell, setMouseOnCell] = createSignal(false);
	const [mouseInThisSquare, setMouseInThisSquare] = createSignal(false);

	const { mouseCoordinate, setMouseCoordinate, mouseSquare } = useMouse();
	createEffect(() => {
		const mc = mouseCoordinate();
		if (!mc) {
			// mouse is not on the board
			setMouseOnAxis(false);
			setMouseOnCell(false);
			setMouseInThisSquare(false);
			return;
		}
		const { x, y } = props.cell.pos;
		const { x: mx, y: my } = mc;

		setMouseOnAxis(x === mx || y === my);
		setMouseOnCell(x === mx && y === my);
		setMouseInThisSquare(mouseSquare() === props.cell.square);
	});

	return (
		<div
			style={{
				border: '1px solid black',
				'border-left': !props.cell.pos.y ? '2px solid black' : undefined,
				'border-top': !props.cell.pos.x ? '2px solid black' : undefined,
				'border-right':
					props.cell.pos.y % BLOCK_SIZE === 2 ? '2px solid black' : undefined,
				'border-bottom':
					props.cell.pos.x % BLOCK_SIZE === 2 ? '2px solid black' : undefined,
				padding: '4px',
				'background-color': mouseOnCell()
					? '#ddd' // color cell the darkest
					: mouseOnAxis()
					? '#e9e9e9' // color axis a bit lighter
					: mouseInThisSquare()
					? '#f6f6f6' // color square the lightest
					: undefined,
			}}
			onMouseEnter={(_) => setMouseCoordinate(props.cell.pos)}
		>
			{props.cell.candidates.length === 1 ? (
				// Show large digit for solved cells
				<button
					style={{
						width: '100%',
						height: '100%',
						'font-size': '32px',
						color: '#777',
						display: 'flex',
						'align-items': 'center',
						'justify-content': 'center',
						'user-select': 'none',
					}}
				>
					{props.cell.candidates[0]}
				</button>
			) : (
				// Show grid of candidates for unsolved cells
				<div
					style={{
						width: '100%',
						height: '100%',
						display: 'grid',
						'grid-template': `${gridTemplate} / ${gridTemplate}`,
					}}
				>
					<For each={FULL_CANDIDACY}>
						{(candidate) => (
							<Candidate candidate={candidate} cell={props.cell} />
						)}
					</For>
				</div>
			)}
		</div>
	);
}
