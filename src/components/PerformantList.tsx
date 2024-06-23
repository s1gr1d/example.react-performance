import { FC, useState, useEffect, memo, useMemo } from "react";
import { dummyApi, DummyData } from "../utils/dummyApi";
import { useDebounce } from "../hooks/debounce.ts";
import { Item, ItemProps } from "./Item.tsx";
import { measureInteractionWithMark } from "../utils/measureInteraction.ts";
import { ListInfo } from "./ListInfo.tsx";

const MemoizedItem = memo(Item);

export const PerformantList: FC = () => {
	const [allItems, setAllItems] = useState<ItemProps[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>("");

	useEffect(() => {
		dummyApi().then((data: unknown) => {
			setAllItems(data as DummyData[]);
		});
	}, []);

	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	const filteredItems = useMemo(() => {
		// console.log("Filtering: ", debouncedSearchTerm);
		return allItems.filter((item) =>
			item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
		);
	}, [debouncedSearchTerm, allItems]);

	return (
		<>
			<h1>Performant List</h1>

			<input
				type="text"
				name="search term"
				value={searchTerm}
				onChange={(e) => {
					setSearchTerm(e.target.value);
					const interaction = measureInteractionWithMark();
					requestAnimationFrame(() => setTimeout(() => interaction.end()));
				}}
			/>

			<ListInfo allItems={allItems} filteredItems={filteredItems} />

			<ul>
				{filteredItems.map((item) => (
					<MemoizedItem key={item.id} {...item} />
				))}
			</ul>
		</>
	);
};
