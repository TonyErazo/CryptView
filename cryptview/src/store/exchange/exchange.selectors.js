import { createSelector } from "@reduxjs/toolkit";
import { exchangeSelectors } from "./exchange.slice";

export const getExchangeState = state => state.Exchange;

export const getAllExchangeData = createSelector(
	getExchangeState,
	(state) => exchangeSelectors.selectAll(state)
)