import { createSelector } from "@reduxjs/toolkit";
import { exchangeSelectors } from "./exchange.slice";

export const getExchangeState = state => state.Exchange;

export const getAllExchangeData = createSelector(
	getExchangeState,
	(state) => exchangeSelectors.selectAll(state)
)

export const getExchangeBySymbols = createSelector(
	getAllExchangeData,
	(_, symbols) => symbols,
	(state, symbols) => state.filter(s => symbols.includes(s.symbol))
)