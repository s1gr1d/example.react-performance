import { useState, useEffect, FC } from "react";
import { dummyApi, DummyData } from "../utils/dummyApi";
import { Item, ItemProps } from "./Item.tsx";
import { ListInfo } from "./ListInfo.tsx";
import { measureInteractionWithMark } from "../utils/measureInteraction.ts";

const filterItems = (allItems: ItemProps[], searchTerm: string) => {
	const interaction = measureInteractionWithMark("Filter Items");
	const filtered = allItems.filter((item) => {
		return item.name.toLowerCase().includes(searchTerm.toLowerCase());
	});
	interaction.end();
	return filtered;
};

export const NonPerformantList: FC = () => {
	const [allItems, setAllItems] = useState<ItemProps[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>("");

	useEffect(() => {
		dummyApi().then((data: unknown) => {
			setAllItems(data as DummyData[]);
		});
	}, []);

	const filteredItems = filterItems(allItems, searchTerm);

	// Counter Button State
	const [counter, setCounter] = useState(0);

	const handleClick = () => {
		setCounter((prevCounter) => prevCounter + 1);
	};

	return (
		<>
			<h1>Non-Performant List</h1>

			<button onClick={handleClick}>Count {counter}</button>

			<input
				type="text"
				name="search term"
				value={searchTerm}
				onChange={(e) => {
					const interaction = measureInteractionWithMark("Search Item");
					setSearchTerm(e.target.value);
					requestAnimationFrame(() => setTimeout(() => interaction.end()));
				}}
			/>

			<ListInfo allItems={allItems} filteredItems={filteredItems} />

			<ul>
				{filteredItems.map((item, index) => (
					<Item key={index} {...item} />
				))}
			</ul>
		</>
	);
};
