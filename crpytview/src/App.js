import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";
import CryptoJS from 'crypto-js';


export function App() {
  const secretKey = 'aPWOT1QqFA7v6QqH4h6DdtseVX0Dl5YZ1sBK7LCVfGoArFmt5Ntumo3l7DMtQARo' // We gotta store this properly somewhere
  const apiKey = 'uVrzyFyZLzRHnnvm2jeQtW2jv4fEh8cLH1qlaCk5BKVr1lR4KnUVJY6Bv4CQKClB'; // We gotta store this properly somewhere as well
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { fetchBinanceData('BTCUSDT'); }, []);

  const fetchBinanceData = async (symbol) => {
    const timestamp = Date.now();
    const queryString = `timestamp=${timestamp}`;
    const signature = CryptoJS.HmacSHA256(queryString, secretKey).toString(CryptoJS.enc.Hex);
    const apiUrl = `https://api.binance.us/api/v3/exchangeInfo?symbol=${symbol}`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    setData(data);
  };

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;
