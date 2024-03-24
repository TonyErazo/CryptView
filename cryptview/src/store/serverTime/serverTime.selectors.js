import { createAction, createSelector } from "@reduxjs/toolkit";

export const getServerTimeState = state => state.ServerTime;

export const getServerTime = createSelector(
	getServerTimeState,
	(state) => state
)

export const getServerTimeAsDate = createSelector(
	getServerTimeState,
	(state) => new Date(state).toString()
)