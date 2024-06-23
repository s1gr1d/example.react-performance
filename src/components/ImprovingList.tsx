import { useState, useEffect, FC } from "react";
import { dummyApi, DummyData } from "../utils/dummyApi";
import { Item, ItemProps } from "./Item.tsx";
import { ListInfo } from "./ListInfo.tsx";

export const ImprovingList: FC = () => {
	const [allItems, setAllItems] = useState<ItemProps[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>("");

	useEffect(() => {
		dummyApi().then((data: unknown) => {
			setAllItems(data as DummyData[]);
		});
	}, []);

	const filteredItems = allItems.filter((item) => {
		return item.name.toLowerCase().includes(searchTerm.toLowerCase());
	});

	// Counter Button State
	const [counter, setCounter] = useState(0);

	const handleClick = () => {
		setCounter((prevCounter) => prevCounter + 1);
	};

	return (
		<>
			<h1>Improving Performance</h1>

			<button onClick={handleClick}>Count {counter}</button>

			<input
				type="text"
				name="search term"
				value={searchTerm}
				onChange={(e) => {
					setSearchTerm(e.target.value);
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
