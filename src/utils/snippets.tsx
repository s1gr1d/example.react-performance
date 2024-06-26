import { ProfilerOnRenderCallback, useState } from "react";
import { CounterButton } from "../components/CounterButton.tsx";

performance.mark("start");
performance.mark("end");
const measure = performance.measure("total", "start", "end");
console.log("Performance Duration: ", measure.duration);

export const Snippets = () => {
	const [counter, setCounter] = useState(0);
	const handleClick = () => setCounter((prevCounter) => prevCounter + 1);

	return (
		<>
			<div>
				<button onClick={handleClick}> {counter} state change (local)</button>
			</div>

			<CounterButton />
		</>
	);
};

export const onRender: ProfilerOnRenderCallback = (
	id, // the "id" prop of the Profiler tree that has just committed
	phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
	actualDuration, // time spent rendering the committed update
	baseDuration, // estimated milliseconds to render the entire subtree without memoization
	startTime, // when React began rendering the current update
	commitTime // when React committed the current update
) => {
	console.table({
		id,
		phase,
		actualDuration,
		baseDuration,
		startTime,
		commitTime
	});
};

/* inside onChange
	const interaction = measureInteractionWithMark();
	requestAnimationFrame(() => setTimeout(() => interaction.end()));
*/
