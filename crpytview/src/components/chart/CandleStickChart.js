import './CandleStickChart.css';
import { Chart } from "react-google-charts";

/**
 * This function renders a react-google-charts Candlestick chart.
 * 
 * @param {*} candleStickData The data to render to the chart
 * @param {*} options The options used for rendering the chart
 * @param {*} w The width of the chart
 * @param {*} h The height of the chart
 * @returns The chart to render.
 */
export const CandleStickChart = (candleStickData, options, w, h) => {
    const formatted = candleStickData.map(item => [
        new Date(item[0]), // Convert timestamp to numeric value
        parseFloat(item[1]), // Open
        parseFloat(item[2]), // High
        parseFloat(item[3]), // Low
        parseFloat(item[4]), // Close
      ]);

    return (
        <Chart
            chartType="CandlestickChart"
            width={w}
            height={h}
            data={[["Time", "Open", "High", "Low", "Close"], ...formatted]}
            options={options}
        />
    )
};