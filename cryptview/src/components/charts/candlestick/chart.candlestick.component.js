import useWindowDimensions from 'hooks/useWindowDimensions';
import { TimeIntervals } from 'libs/binance';
import CandleStickChart from 'libs/charts/candlestick';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCandlestick } from 'store/candlestick/candlestick.effects';
import { getCandlestickByTicker } from 'store/candlestick/candlestick.selectors';


export const CandlestickChartComponent = (props) => {

    const {height, width} = useWindowDimensions();
    let {ticker} = useParams();
    ticker = ticker.toUpperCase();

    const chartData = useSelector(state => getCandlestickByTicker(state, ticker));
    const dispatch = useDispatch();

    useEffect(() => {
        if(!chartData || chartData.length === 0)
        {
            dispatch(getCandlestick({
                symbol: ticker,
                interval: TimeIntervals.ONE_HOUR,
                limit: 200
            }));
        }
    }, [chartData, ticker, dispatch]);
    
    return (
        <>
            {chartData && chartData.length > 0 && (
                <CandleStickChart chartData={chartData} size={{width: width, height: height * 0.8}} />
            )}
            {(!chartData || chartData.length === 0) && (
                <>
                    No Data Available
                </>
            )}
        </>
    )
}
