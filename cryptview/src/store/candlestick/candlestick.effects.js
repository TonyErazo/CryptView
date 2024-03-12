import api from "libs/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCandlestick = createAsyncThunk(
	'candlestick/getCandlestick',
	async ({symbol, interval, limit}, {rejectWithValue}) => {

		try {
			const response = await api.get(`v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`);

			if(response.ok)
			{
				const data = await response.json()
				return { symbol: symbol, data: data }
			}
			else
			{
				return response.json().then(e => rejectWithValue(e));
			}
		}
		catch(e)
		{
			rejectWithValue(e);
		}
	}
);