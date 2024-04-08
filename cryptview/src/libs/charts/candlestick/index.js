
import "libs/charts/candlestick/candlestick.chart.css";
import React, { useEffect, useRef, useState } from 'react';
import { createChart, CrosshairMode } from "lightweight-charts";

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
export const dataArrayToChartObjects = (data) => {
	if(data)
	{
		return data.map(e => ({
			time: e[0],
			open: Number(e[1]),
			high: Number(e[2]),
			low: Number(e[3]),
			close: Number(e[4]),
		}))
	}
	else
	{
		return [];
	}
};

const chartOptions = (size) => ({
	default: {
		width: size.width,
		height: size.height,
		layout: { backgroundColor: '#ffffff', textColor: '#000000', },
		grid: {
			vertLines: { color: 'rgba(197, 203, 206, 0.5)', },
			horzLines: { color: 'rgba(197, 203, 206, 0.5)', },
		},
		crosshair: { mode: CrosshairMode.Normal, },
		priceScale: { borderColor: 'rgba(197, 203, 206, 0.8)', },
		timeScale: { borderColor: 'rgba(197, 203, 206, 0.8)', },
	},
	extra: {
		localization: {
			timeFormatter: timestamp => new Date(timestamp).toLocaleString('en-GB')
		}
	},
	candlestickSeries: {
		upColor: '#4bffb5',
		downColor: '#ff4976',
		borderDownColor: '#ff4976',
		borderUpColor: '#4bffb5',
		wickDownColor: '#838ca1',
		wickUpColor: '#838ca1',
	}
});

export default function CandleStickChart(props) {

	const { chartData, size } = props;
	const chartContainerRef = useRef();

	const [chart, setChart] = useState(null);
	const [series, setSeries] = useState(null);

	let chartExists = false;

	useEffect(() => {
		if(!chart && !series && chartData && !chartExists)
		{
			const options = chartOptions(size);
			const localChart = createChart(chartContainerRef.current, options.default);
			
			localChart.applyOptions(options.extra);

			const localSeries = localChart.addCandlestickSeries(options.candlestickSeries);

			localSeries.setData(dataArrayToChartObjects(chartData));

			setChart(localChart);
			setSeries(localSeries);
			chartExists = true;
		}
		else if(series)
		{
			series.setData(dataArrayToChartObjects(chartData));
		}
	}, [chartData]);

	return (
		<div ref={chartContainerRef} />
	);
};