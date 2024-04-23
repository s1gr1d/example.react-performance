import { useState, useEffect, FC, ProfilerOnRenderCallback } from "react";
import { dummyApi, DummyData } from "../utils/dummyApi";
import { Item, ItemProps } from "./Item.tsx";

export const NonPerformantList: FC = () => {
	const [items, setItems] = useState<ItemProps[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>("");

	useEffect(() => {
		dummyApi().then((data: unknown) => {
			setItems(data as DummyData[]);
		});
	}, []);

	const filteredItems = items.filter((item) => {
		// console.log("Filtering: ", searchTerm);
		return item.name.toLowerCase().includes(searchTerm.toLowerCase());
	});

	return (
		<>
			<input
				type="text"
				value={searchTerm}
				onChange={(e) => {
					setSearchTerm(e.target.value);
				}}
			/>

			{items.length === 0 && <p>Loading...</p>}
			{items.length > 0 && filteredItems.length === 0 && <p>No items found</p>}

			<div>
				{filteredItems.map((item) => (
					<Item key={item.id} {...item} />
				))}
			</div>
		</>
	);
};

// -----------------------------------------------------------------------------

const onRender: ProfilerOnRenderCallback = (
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

function measureInteraction() {
	const startTimestamp = performance.now();

	return {
		end() {
			const endTimestamp = performance.now();
			console.log(`The interaction took ${endTimestamp - startTimestamp} ms`);
		}
	};
}

/* inside onChange
	const interaction = measureInteraction();
	requestAnimationFrame(() => interaction.end());
*/

/* or with setTimeout
requestAnimationFrame(() => {
  setTimeout(() => {
    interaction.end()
  })
})
*/
