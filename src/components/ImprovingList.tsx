import { useState, useEffect, FC, useMemo } from "react";
import { dummyApi, DummyData } from "../utils/dummyApi";
import { Item, ItemProps } from "./Item.tsx";
import { ListInfo } from "./ListInfo.tsx";
import { measureInteractionWithMark } from "../utils/measureInteraction.ts";
import { useDebounce } from "../hooks/debounce.ts";

const filterItems = (allItems: ItemProps[], searchTerm: string) => {
	const interaction = measureInteractionWithMark("Filter Items");
	const filtered = allItems.filter((item) => {
		return item.name.toLowerCase().includes(searchTerm.toLowerCase());
	});
	interaction.end();
	return filtered;
};

export const ImprovingList: FC = () => {
	const [allItems, setAllItems] = useState<ItemProps[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>("");

	useEffect(() => {
		dummyApi().then((data: unknown) => {
			setAllItems(data as DummyData[]);
		});
	}, []);

	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	const filteredItems = useMemo(() => {
		return filterItems(allItems, debouncedSearchTerm);
	}, [debouncedSearchTerm, allItems]);

	// Counter Button State
	const [counter, setCounter] = useState(0);

	const handleClick = () => {
		setCounter((prevCounter) => prevCounter + 1);
	};

	return (
		<>
			<h1>Improving List</h1>

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
				{filteredItems.map((item) => (
					<Item key={item.id} {...item} />
				))}
			</ul>
		</>
	);
};
