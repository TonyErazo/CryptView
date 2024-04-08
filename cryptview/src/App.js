import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomeComponent } from "components/home/home.component";
import { createBrowserHistory } from "history";
import { ExampleComponent } from "components/example/example.component";
 
export const App = () => {

	const history = createBrowserHistory();

	return (
		<Router history={history}>
			<Routes>
				<Route exact path="/" Component={(_) => <HomeComponent />} />
				<Route exact path="/examples" Component={(_) => <ExampleComponent /> }/>
			</Routes>
		</Router>
	)
}