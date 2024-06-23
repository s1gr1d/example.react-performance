import React from "react";
import { DummyData } from "../utils/dummyApi.ts";

export const ListInfo: React.FC<{
	allItems: DummyData[];
	filteredItems: DummyData[];
}> = ({ allItems, filteredItems }) => {
	return (
		<>
			{allItems.length === 0 && <p>Loading...</p>}
			{allItems.length > 0 && filteredItems.length === 0 && (
				<p>No items found</p>
			)}
			{allItems.length > 0 && filteredItems.length > 0 && (
				<>
					<p>{filteredItems.length} Elements</p>
					<hr />
				</>
			)}
		</>
	);
};
