import { For } from 'solid-js';
import { TrackNextIcon } from 'solid-radix-icons';
import { useBoard, useMouse } from '~/hooks/board';
import { useResolution } from '~/hooks/board';
import BoardCell from './Cell';

export default function Board() {
	const board = useBoard();
	const { setMouseCoordinate } = useMouse();
	const { resolve } = useResolution();

	return (
		<div
			style={{
				margin: '16px',
				display: 'flex',
				'flex-direction': 'column',
				'align-items': 'start',
				gap: '16px',
			}}
		>
			<div
				style={{
					width: '512px',
					'aspect-ratio': 1,
					display: 'grid',
					'grid-template-columns': `repeat(${board().size}, 1fr)`,
				}}
				onmouseleave={() => setMouseCoordinate(null)}
			>
				<For each={board().cells}>
					{(col) => <For each={col}>{(cell) => <BoardCell cell={cell} />}</For>}
				</For>
			</div>
			<button
				style={{
					padding: '8px',
					'border-radius': '4px',
					display: 'flex',
					'align-items': 'center',
					gap: '4px',
					background: '#000',
					color: '#fff',
					'user-select': 'none',
					transition: 'transform 50ms',
				}}
				onMouseOver={(e) => {
					e.currentTarget.style.backgroundColor = '#333';
				}}
				onMouseLeave={(e) => {
					e.currentTarget.style.backgroundColor = '#000';
				}}
				onClick={(_) => resolve()}
			>
				<TrackNextIcon />
				Step
			</button>
		</div>
	);
}
