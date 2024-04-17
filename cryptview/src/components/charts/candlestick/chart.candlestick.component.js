import useWindowDimensions from 'hooks/useWindowDimensions';
import { TimeIntervals } from 'libs/binance';
import CandleStickChart from 'libs/charts/candlestick';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCandlestick } from 'store/candlestick/candlestick.effects';
import { getCandlestickByTicker } from 'store/candlestick/candlestick.selectors';
import {SearchBar} from 'components/searchbar/searchbar.components';


export const CandlestickChartComponent = (props) => {

    const [candleStickLimit, setCandleStickLimit] = useState(200);
    const {height, width} = useWindowDimensions();
    let {ticker} = useParams();
    ticker = ticker.toUpperCase();

    const chartData = useSelector(state => getCandlestickByTicker(state, ticker));
    const dispatch = useDispatch();

    useEffect(() => {
        if(!chartData || chartData.length === 0 || chartData.length < candleStickLimit)
        {
       		dispatch(
				getCandlestick({
					symbol: ticker,
					interval: TimeIntervals.ONE_MINUTE,
					limit: candleStickLimit
				}));
        }
    }, [chartData, ticker, dispatch, candleStickLimit]);

	useEffect(() => {
		if(chartData && chartData.length > 0)
		{
			const interval = setInterval(() => {
				console.log("updating");
				getCandlestick({
					symbol: ticker,
					interval: TimeIntervals.ONE_MINUTE,
					limit: candleStickLimit
				});
			}, 60000);
			return () => clearInterval(interval);
		}
	}, [chartData]);
    
	const handleCandlestickLimitChange = (amount) => {
		setCandleStickLimit(current => 
			{
				if(current < 1000)
					return current + amount;
				else
					return amount;
			}
		);
	}

    return (
        <>
            {chartData && chartData.length > 0 && (
                <CandleStickChart chartData={chartData} size={{width: width, height: height * 0.8}} candleStickLimit={candleStickLimit} onScroll={
					(scrollAmount) => {
						const amount = Number(Math.floor(scrollAmount / 5));
						handleCandlestickLimitChange(amount);
					}
				} />
            )}
            {(!chartData || chartData.length === 0) && (
                <>
                    No Data Available
                </>
            )}
        </>
    )
}