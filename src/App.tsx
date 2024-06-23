import { Link } from "react-router-dom";

function App() {
	return (
		<>
			<nav>
				<ul>
					<li>
						<Link to={`performant`}>Performant</Link>
					</li>
					<li>
						<Link to={`non-performant`}>Non-Performant</Link>
					</li>
					<li>
						<Link to={`improving-in-progress`}>Improving in progress</Link>
					</li>
				</ul>
			</nav>
		</>
	);
}

export default App;
