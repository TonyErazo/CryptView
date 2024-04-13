import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { getServerTimeAsDate } from 'store/serverTime/serverTime.selectors';
import { getServerTime } from 'store/serverTime/serverTime.effects';
import { getExchange } from 'store/exchange/exchange.effects';
import { getAllExchangeData, getExchangeBySymbols } from 'store/exchange/exchange.selectors';
import { Card } from 'shadcn/components/ui/card';
import { CandlestickChartComponent } from "./charts/candlestick/chart.candlestick.component";

export const CandleStickOptions = {
	legend: "none",
	bar: { groupWidth: "100%" }, // Remove space between bars.
	candlestick: {
	fallingColor: { strokeWidth: 0, fill: "#a52714" }, // red
	risingColor: { strokeWidth: 0, fill: "#0f9d58" }, // green
	},
};

export const ExampleWithRedux = ({ ticker }) => {
	
	const serverTime = useSelector(getServerTimeAsDate);
	const exchangeData = useSelector(getAllExchangeData);
	const BTCUSDTSymbol = useSelector(state => getExchangeBySymbols(state, ['BTCUSDT']));
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getServerTime());
		const interval = setInterval(() => {
			dispatch(getServerTime());
		}, 500);

		return () => clearInterval(interval);
	}, [serverTime, dispatch]);


	useEffect(() => {
		if(!exchangeData || exchangeData.length === 0)
		{
			dispatch(getExchange(['BTCUSDT', 'LTCBTC']))
		}
	}, [exchangeData, dispatch]);

	return (
		<>
			<div>
				{serverTime && (
					<Card className="p-[10px] my-[10px]">
						<h1>Server Time:</h1>
						<pre>{serverTime}</pre>
					</Card>
				)}
				{exchangeData && exchangeData.length > 0 && (
					<Card className="p-[10px]">
						<h1>Exchange Data:</h1>
						<pre>{JSON.stringify(exchangeData, null, 2)}</pre>
					</Card>
				)}
				<Card className="p-[10px]">
						<h1>Exchange Data:</h1>
						<pre>{JSON.stringify(BTCUSDTSymbol[0], null, 2)}</pre>
				</Card>
			</div>
		</>
	)
}
