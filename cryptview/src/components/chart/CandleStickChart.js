import './CandleStickChart.css';
import { Chart } from "react-google-charts";
import React, { useEffect, useState } from 'react';

/**
 * This function renders a react-google-charts Candlestick chart.
 * 
 * @param {*} candleStickData The data to render to the chart
 * @param {*} options The options used for rendering the chart
 * @param {*} w The width of the chart
 * @param {*} h The height of the chart
 * @returns The chart to render.
 */
export const CandleStickChart = ({candleStickData, options, w, h, columns}) => {

	const [formatted, setFormatted] = useState();

	useEffect(() => {
		setFormatted(candleStickData.map(item => [
			new Date(item[0]), // Convert timestamp to numeric value
			parseFloat(item[1]), // Open
			parseFloat(item[2]), // High
			parseFloat(item[3]), // Low
			parseFloat(item[4]), // Close
		]))
	}, [candleStickData]);

    return (
        formatted && formatted.length > 0 && (<Chart
            chartType="CandlestickChart"
            width={w}
            height={h}
            data={[columns, ...formatted]}
            options={options}
        />)
    )
};

export default CandleStickChart;