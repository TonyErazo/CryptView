import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { getExchange } from "./exchange.effects";

export const exchangeAdapter = createEntityAdapter({
	selectId: c => c.symbol
});
export const exchangeSelectors = exchangeAdapter.getSelectors();

export const ExchangeSlice = createSlice({
	name: 'exchange',
	initialState: exchangeAdapter.getInitialState(),
	extraReducers: b => b
		.addCase(getExchange.fulfilled, (state, action) => {
			return exchangeAdapter.addMany(state, action.payload);
		})
})

export default ExchangeSlice.reducer;