import { FC, memo, useEffect, useMemo, useState } from "react";
import { Item, ItemProps } from "./Item.tsx";
import { dummyApi, DummyData } from "../utils/dummyApi.ts";
import { measureInteractionWithMark } from "../utils/measureInteraction.ts";
import { ListInfo } from "./ListInfo.tsx";

const MemoizedItem = memo(Item);

const filterItems = (allItems: ItemProps[], searchTerm: string) => {
	const interaction = measureInteractionWithMark("Filter Items");
	const filtered = allItems.filter((item) => {
		return item.name.toLowerCase().includes(searchTerm.toLowerCase());
	});
	interaction.end();
	return filtered;
};

export const SearchResults: FC<{ debouncedSearchTerm: string }> = ({
	debouncedSearchTerm
}) => {
	const [allItems, setAllItems] = useState<ItemProps[]>([]);

	useEffect(() => {
		dummyApi().then((data: unknown) => {
			setAllItems(data as DummyData[]);
		});
	}, []);

	const filteredItems = useMemo(() => {
		return filterItems(allItems, debouncedSearchTerm);
	}, [debouncedSearchTerm, allItems]);

	return (
		<>
			<ListInfo allItems={allItems} filteredItems={filteredItems} />
			<ul>
				{filteredItems.map((item) => (
					<MemoizedItem key={item.id} {...item} />
				))}
			</ul>
		</>
	);
};
