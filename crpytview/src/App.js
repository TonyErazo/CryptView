import React, { useState, useEffect } from 'react';
import { CandlestickIntervals, Requests, fetchBinanceData } from './components/binance/Binance';
import { CandleStickChart } from './components/chart/CandleStickChart';



export function App() {
  const [candleStickData, setCandleStickData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {

      // Get the candlestick data from binance
      const data = await fetchBinanceData(Requests.CANDLESTICK_DATA, 'BTCUSDT', CandlestickIntervals.ONE_MINUTE, 200);
      setCandleStickData(data);

      // Get the exchange info for BTC and LTCBTC
      const exchange_info = await fetchBinanceData(Requests.EXCHANGE_INFO, 'BTCUSDT', 'LTCBTC');
      console.log(exchange_info);

      // Get the exchange server time
      const server_time = await fetchBinanceData(Requests.SERVER_TIME);
      console.log("SERVER TIME: " + server_time);
    };
    fetchData();
  }, []);


  /**
   * Setting up the options for the Candlestick chart...
   */
  const options = {
    legend: "none",
    bar: { groupWidth: "100%" }, // Remove space between bars.
    candlestick: {
      fallingColor: { strokeWidth: 0, fill: "#a52714" }, // red
      risingColor: { strokeWidth: 0, fill: "#0f9d58" }, // green
    },
  };

  return (
    <header>
      {CandleStickChart(candleStickData, options, "100%", "800px")}
    </header>
  );
}

export default App;
