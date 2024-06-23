import { FC, useState, memo } from "react";
import { useDebounce } from "../hooks/debounce.ts";
import { measureInteractionWithMark } from "../utils/measureInteraction.ts";
import { CounterButton } from "./CounterButton.tsx";
import { SearchResults } from "./SearchResults.tsx";

const MemoizedSearchResults = memo(SearchResults);

export const PerformantList: FC = () => {
	const [searchTerm, setSearchTerm] = useState<string>("");

	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	return (
		<>
			<h1>Performant List</h1>

			<CounterButton />

			<input
				type="text"
				name="search term"
				value={searchTerm}
				onChange={(e) => {
					setSearchTerm(e.target.value);
					const interaction = measureInteractionWithMark("Search Item");
					requestAnimationFrame(() => setTimeout(() => interaction.end()));
				}}
			/>

			<MemoizedSearchResults debouncedSearchTerm={debouncedSearchTerm} />
		</>
	);
};
