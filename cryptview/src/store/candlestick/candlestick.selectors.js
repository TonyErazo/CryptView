import { createSelector } from "@reduxjs/toolkit";
import { candlestickSelectors } from "./candlestick.slice";

export const getCandlestickState = store => store.Candlestick;

export const getAllTickersCandlesticks = createSelector(
	getCandlestickState,
	state => candlestickSelectors.selectAll(state)
);

export const getCandlestickByTicker = createSelector(
	getCandlestickState,
	(_, ticker) => ticker, 
	(state, ticker) => candlestickSelectors.selectById(state, ticker)?.data 
);