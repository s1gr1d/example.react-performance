import { useEffect, FC, PropsWithChildren } from "react";

export const Page: FC<PropsWithChildren & { title: string }> = ({
	title,
	children
}) => {
	useEffect(() => {
		document.title = title;
	}, [title]);

	return children;
};
