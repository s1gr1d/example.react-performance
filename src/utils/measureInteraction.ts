export function measureInteraction() {
	const startTimestamp = performance.now();

	return {
		end() {
			const endTimestamp = performance.now();
			console.log(`The interaction took ${endTimestamp - startTimestamp} ms`);
		}
	};
}

export function measureInteractionWithMark() {
	performance.mark("start");

	return {
		end() {
			performance.mark("end");
			const measure = performance.measure("Search Item", "start", "end");
			console.log(`The interaction took ${measure.duration} ms`);
		}
	};
}
