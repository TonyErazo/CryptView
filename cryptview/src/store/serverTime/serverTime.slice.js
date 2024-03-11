import { createSlice } from "@reduxjs/toolkit";
import { getServerTime } from "./serverTime.effects";

export const ServerTime = createSlice({
	name: 'serverTime',
	initialState: 1,
	extraReducers: b => b
		.addCase(getServerTime.fulfilled, (state, action) => {
			return action.payload
		})
})

export default ServerTime.reducer;