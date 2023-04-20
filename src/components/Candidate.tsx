import { onMount, onCleanup } from 'solid-js';
import { useMutateCandidacy } from '~/hooks/board';
import { Cell } from '~/structures/cell';

function useIsolateCandidate() {
	const { isolateCandidate } = useMutateCandidacy();
	return (cell: Cell, candidate: number) => {
		isolateCandidate(cell.pos, candidate);
	};
}

export default function Candidate(props: { candidate: number; cell: Cell }) {
	const { isolateCandidate, addCandidate, removeCandidate } =
		useMutateCandidacy();

	// Right click to solve cell with this candidate
	const handleRightClick = (e: MouseEvent) => {
		e.preventDefault(); // Prevents the context menu from appearing
		isolateCandidate(props.cell.pos, props.candidate);
	};
	let ref: HTMLButtonElement | undefined;
	onMount(() => {
		if (ref) ref.addEventListener('contextmenu', handleRightClick);
	});
	onCleanup(() => {
		if (ref) ref.removeEventListener('contextmenu', handleRightClick);
	});

	const hasCandidate = props.cell.candidates.includes(props.candidate);
	const handleClick = () => {
		if (hasCandidate) removeCandidate(props.cell, props.candidate);
		else addCandidate(props.cell, props.candidate);
	};

	return (
		<button
			ref={ref}
			style={{
				width: '100%',
				height: '100%',
				color: '#777',
				'border-radius': '100px',
				'font-size': '12px',
				opacity: hasCandidate ? 1 : 0,
				display: 'flex',
				'align-items': 'center',
				'justify-content': 'center',
				'user-select': 'none',
			}}
			onClick={(_) => handleClick()}
			onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#bbb')}
			onMouseLeave={(e) =>
				(e.currentTarget.style.backgroundColor = 'transparent')
			}
		>
			{props.candidate}
		</button>
	);
}
