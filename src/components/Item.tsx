import { FC } from "react";

export type ItemProps = {
	id: number;
	name: string;
};

export const Item: FC<ItemProps> = ({ id, name }) => {
	// console.log(`Rendering Item ${id}`);
	return <div key={id}>{name}</div>;
};
