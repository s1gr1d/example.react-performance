import { useState, FC } from "react";
import { measureInteractionWithMark } from "../utils/measureInteraction.ts";
import { useDebounce } from "../hooks/debounce.ts";
import { SearchResults } from "./SearchResults.tsx";
import { CounterButton } from "./CounterButton.tsx";

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

			<SearchResults debouncedSearchTerm={debouncedSearchTerm} />
		</>
	);
};
