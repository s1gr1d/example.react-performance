import { faker } from "@faker-js/faker";

export type DummyData = {
	id: number;
	name: string;
};

const data = Array.from({ length: 5000 }, (_, i) => ({
	id: i,
	name: `${faker.person.firstName()} ${faker.person.lastName()}`
}));

// dummy api with setTimeout that will be used to simulate an api request in react
export const dummyApi = async () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(data);
		}, 50);
	});
};
