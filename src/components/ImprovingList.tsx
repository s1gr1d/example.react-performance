import { useState, FC, memo } from "react";
import { measureInteractionWithMark } from "../utils/measureInteraction.ts";
import { useDebounce } from "../hooks/debounce.ts";
import { SearchResults } from "./SearchResults.tsx";
import { CounterButton } from "./CounterButton.tsx";

const MemoizedSearchResults = memo(SearchResults);

export const ImprovingList: FC = () => {
	const [searchTerm, setSearchTerm] = useState<string>("");

	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	return (
		<>
			<h1>Improving List</h1>

			<CounterButton />

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

			<MemoizedSearchResults debouncedSearchTerm={debouncedSearchTerm} />
		</>
	);
};
