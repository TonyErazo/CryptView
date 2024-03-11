import { configureStore } from "@reduxjs/toolkit";
import Candlestick from 'store/candlestick/candlestick.slice';
import ServerTime from 'store/serverTime/serverTime.slice';
import Exchange from 'store/exchange/exchange.slice';

export const store = configureStore({
	reducer: {
		Candlestick: Candlestick,
		ServerTime: ServerTime,
		Exchange: Exchange
	}
})