import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { getCandlestick } from "./candlestick.effects";

export const candlestickAdapter = createEntityAdapter({
	selectId: c => c.symbol
});
export const candlestickSelectors = candlestickAdapter.getSelectors();

export const CandlestickSlice = createSlice({
	name: 'candlestick',
	initialState: candlestickAdapter.getInitialState(),
	extraReducers: b => b
		.addCase(getCandlestick.fulfilled, (state, action) => {
			candlestickAdapter.addOne(state, action.payload);
		})
})

export default CandlestickSlice.reducer;