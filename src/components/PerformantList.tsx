import {
	FC,
	useState,
	useEffect,
	memo,
	useMemo,
	useDeferredValue
} from "react";
import { dummyApi, DummyData } from "../utils/dummyApi";
import { useDebounce } from "../hooks/debounce.ts";
import { Item, ItemProps } from "./Item.tsx";
import { measureInteractionWithMark } from "../utils/measureInteraction.ts";

const MemoizedItem = memo(Item);

export const PerformantList: FC = () => {
	const [items, setItems] = useState<ItemProps[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>("");

	useEffect(() => {
		dummyApi().then((data: unknown) => {
			setItems(data as DummyData[]);
		});
	}, []);

	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	const filteredItems = useMemo(() => {
		// console.log("Filtering: ", debouncedSearchTerm);
		return items.filter((item) =>
			item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
		);
	}, [debouncedSearchTerm, items]);

	const deferredItems = useDeferredValue(filteredItems);

	return (
		<>
			<input
				type="text"
				value={searchTerm}
				onChange={(e) => {
					setSearchTerm(e.target.value);
					const interaction = measureInteractionWithMark();
					requestAnimationFrame(() => setTimeout(() => interaction.end()));
				}}
			/>
			{items.length === 0 && <p>Loading...</p>}
			{items.length > 0 && filteredItems.length === 0 && <p>No items found</p>}
			<div>
				{deferredItems.map((item) => (
					<MemoizedItem key={item.id} {...item} />
				))}
			</div>
		</>
	);
};
