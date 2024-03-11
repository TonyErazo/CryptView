import { createSelector } from "@reduxjs/toolkit";

export const getServerTimeState = state => state.ServerTime;

export const getServerTimeAsDate = createSelector(
	getServerTimeState,
	(state) => new Date(state).toString()
)