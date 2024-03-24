import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "libs/api";

export const getExchange = createAsyncThunk(
	'exchange/getExchange',
	async (symbols, {rejectWithValue}) => {
		
		try
		{
			const response = await api.get(`v3/exchangeInfo?symbols=[${symbols.map(param => `"${param}"`).join(',')}]`)

			if(response.ok)
			{
				const data = await response.json();
				return data;
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
)