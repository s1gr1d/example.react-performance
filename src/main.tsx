import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PerformantList } from "./components/PerformantList.tsx";
import { NonPerformantList } from "./components/NonPerformantList.tsx";
import { Page } from "./components/Page.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<Page title={"React Perf Demo"}>
				<App />
			</Page>
		)
	},
	{
		path: "performant",
		element: (
			<Page title="Performant">
				<PerformantList />
			</Page>
		)
	},
	{
		path: "non-performant",
		element: (
			<Page title="Non-Performant">
				<NonPerformantList />
			</Page>
		)
	}
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
