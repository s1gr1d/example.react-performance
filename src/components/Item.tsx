import { FC } from "react";

export type ItemProps = {
	id: number;
	name: string;
};

export const Item: FC<ItemProps> = ({ id, name }) => {
	// console.log(`Rendering Item ${id}`);
	return <li key={id}>{name}</li>;
};
