import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomeComponent } from "components/home/home.component";
import { createBrowserHistory } from "history";
import { ExampleComponent } from "components/example/example.component";
import { CandlestickChartComponent } from "components/charts/candlestick/chart.candlestick.component";
 
export const App = () => {

	const history = createBrowserHistory();

	return (
		<Router history={history}>
			<Routes>
				<Route exact path="/" Component={(_) => <HomeComponent />} />
				<Route exact path="/examples" Component={(_) => <ExampleComponent /> }/>
				<Route exact path="/candlestick/:ticker" Component={(_) => <CandlestickChartComponent />}/>
			</Routes>
		</Router>
	)
}