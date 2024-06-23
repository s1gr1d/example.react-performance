import { FC, memo } from "react";
import { Item } from "./Item.tsx";
import { DummyData } from "../utils/dummyApi.ts";

const MemoizedItem = memo(Item);

export const SearchResults: FC<{ items: DummyData[] }> = ({ items }) => {
	return (
		<ul>
			{items.map((item) => (
				<MemoizedItem key={item.id} {...item} />
			))}
		</ul>
	);
};
