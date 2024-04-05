
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCandlestick } from 'store/candlestick/candlestick.effects';
import { getCandlestickByTicker } from 'store/candlestick/candlestick.selectors';
import { TimeIntervals } from 'libs/binance';
import { ColorType, createChart, CrosshairMode } from "lightweight-charts";

/**
 * Open Time
 * Open Price
 * High Price
 * Low Price
 * Close Price
 * Volume
 * Close Time
 * Base Asset Volume
 * Number of trades
 * Taker buy volume
 * Taker buy asset volume
 * Ignore
 */

//TODO the date from epoch time is not converted properly by lightweight charts
//TODO 3 re-renders on the chart for some reason.
export default function CandleStickChart(props) {

	const ticker = props.ticker;
	let candlestickData = useSelector(state => getCandlestickByTicker(state, ticker));
	const dispatch = useDispatch();
	const chartContainerRef = useRef();

	let candleStickObjectArray = [];

	let chart;
	let candleSeries;

	const keys = ['time', 'open', 'high', 'low', 'close'];

	useEffect(() => {

		dispatch(getCandlestick({
			symbol: ticker,
			interval: TimeIntervals.ONE_HOUR,
			limit: 200
		})).then( res => {
			console.log('initializing charts...');
			initializeCharts(res.payload.data);
		});

	}, []);


	function initializeCharts(priceData) {
		
		//console.log('ref: ' + chartContainerRef.current.value);
		if(!chart && priceData && !chartContainerRef.current.value) {
			chartContainerRef.current.value = 'set-chart';
			chart = createChart(chartContainerRef.current, {
				width: 800,
				height: 200,
				layout: { backgroundColor: '#000000', textColor: 'rgba(255, 255, 255, 0.9)', },
				grid: {
					vertLines: { color: 'rgba(197, 203, 206, 0.5)',	},
					horzLines: { color: 'rgba(197, 203, 206, 0.5)', },
				},
				crosshair: { mode: CrosshairMode.Normal, },
				priceScale: { borderColor: 'rgba(197, 203, 206, 0.8)',	},
				timeScale: { borderColor: 'rgba(197, 203, 206, 0.8)',	},
			});

			chart.applyOptions({
				localization: {
								timeFormatter: (timestamp) => {
										 return new Date(timestamp).toLocaleString('en-US');
								}
					 }
			});

			candleSeries = chart.addCandlestickSeries({
				upColor: '#4bffb5',
				downColor: '#ff4976',
				borderDownColor: '#ff4976',
				borderUpColor: '#4bffb5',
				wickDownColor: '#838ca1',
				wickUpColor: '#838ca1',
			});

			console.log("Charts have been initialized! chart: " + chart + " series: " + candleSeries);

			setChartData(chart, candleSeries, priceData);
		}
		else if(chartContainerRef.current.value && priceData) {
			//We already have our charts defined so we just update the data on the re-render
		}
	}

	function setChartData(tradingChart, series, priceData) {

		console.log('chart: ' + tradingChart + ' series: ' + series + ' data: ' + candlestickData);

		if(tradingChart && candleSeries && priceData) {

			//candlestickData.slice().sort((a, b) => a[0]-b[0]);

			for(const element of priceData) {
				// We will convert the time first as this throws an error
				//console.log(element);
				
				const candlestickElement = {
					time: element[0],
					open: Number(element[1]),
					high: Number(element[2]),
					low: Number(element[3]),
					close: Number(element[4]),
				}

				//candlestickElement.closeTime = element[6];
				//candlestickElement.closeTime = new Date([element[6]]);
				//console.log(JSON.stringify(candlestickElement));		
				candleStickObjectArray.push(candlestickElement);	
			}
			series.setData(candleStickObjectArray);
			//console.log("Updated chart data");
			//chart.timeScale().fitContent();
			//console.log(candleStickObjectArray);
			//const element = candlestickData[0];
			//candleSeries.setData([{time: element[0], open: Number(element[1]), high: Number(element[2]), low: Number(element[3]), close: Number(element[4])}]);
		}
	}


    return (
        <div ref={chartContainerRef}/>
    );
};