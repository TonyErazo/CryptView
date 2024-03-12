import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "libs/api";

export const getServerTime = createAsyncThunk(
	'serverTime/getServerTime',
	async (_, {rejectWithValue}) => {

		try {
			const response = await api.get('v3/time');

			if(response.ok)
			{
				const data = await response.json();
				return data.serverTime;
			}
			else
			{
				return response.json().then(e => rejectWithValue(e));
			}
		}	
		catch(e)
		{
			return rejectWithValue(e);
		}
	}
)