import React, { useState } from "react";

export const TriggerReRender: React.FC = () => {
	const [counter, setCounter] = useState(0);

	const handleClick = () => {
		setCounter((prevCounter) => prevCounter + 1);
	};

	return (
		<div>
			<button onClick={handleClick}>Count {counter} (child)</button>
		</div>
	);
};
