import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getCandlestickByTicker } from 'store/candlestick/candlestick.selectors';
import { getCandlestick } from 'store/candlestick/candlestick.effects';
import { TimeIntervals } from 'libs/binance';

import { getServerTimeAsDate } from 'store/serverTime/serverTime.selectors';
import { getServerTime } from 'store/serverTime/serverTime.effects';
import { getExchange } from 'store/exchange/exchange.effects';
import { getAllExchangeData, getExchangeBySymbols } from 'store/exchange/exchange.selectors';
import { Card } from 'shadcn/components/ui/card';
import CandleStickChart from "./chart/CandleStickChart";

export const CandleStickOptions = {
	legend: "none",
	bar: { groupWidth: "100%" }, // Remove space between bars.
	candlestick: {
	fallingColor: { strokeWidth: 0, fill: "#a52714" }, // red
	risingColor: { strokeWidth: 0, fill: "#0f9d58" }, // green
	},
};

export const ExampleWithRedux = ({ ticker }) => {
	
	const candlestickData = useSelector(state => getCandlestickByTicker(state, ticker));
	const serverTime = useSelector(getServerTimeAsDate);
	const exchangeData = useSelector(getAllExchangeData);
	const BTCUSDTSymbol = useSelector(state => getExchangeBySymbols(state, ['BTCUSDT']));
	const dispatch = useDispatch();

/*	useEffect(() => {

	}, [candlestickData, ticker, dispatch]);
*/

	useEffect(() => {
		dispatch(getServerTime());
		const interval = setInterval(() => {
			dispatch(getServerTime());
		}, 500); // The server time would skip 2 seconds sometimes, so it's better to get quicker time.

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
					<CandleStickChart ticker={ticker}/>
				
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
