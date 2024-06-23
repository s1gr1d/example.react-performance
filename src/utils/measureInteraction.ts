export function measureInteraction() {
	const startTimestamp = performance.now();

	return {
		end() {
			const endTimestamp = performance.now();
			console.log(`The interaction took ${endTimestamp - startTimestamp} ms`);
		}
	};
}

export function measureInteractionWithMark(name: string) {
	const startName = `start-${name}`;
	const endName = `end-${name}`;

	performance.mark(startName);

	return {
		end() {
			performance.mark(endName);
			const measure = performance.measure(name, startName, endName);
			console.log(`${name} took ${measure.duration} ms`);
		}
	};
}
