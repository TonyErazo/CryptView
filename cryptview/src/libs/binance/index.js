import CryptoJS from 'crypto-js';

/**
 * This is the API host for binance.
 */
export const HOST = 'https://api.binance.us';
export const API_KEY = 'uVrzyFyZLzRHnnvm2jeQtW2jv4fEh8cLH1qlaCk5BKVr1lR4KnUVJY6Bv4CQKClB';
export const SECRET_KEY = 'aPWOT1QqFA7v6QqH4h6DdtseVX0Dl5YZ1sBK7LCVfGoArFmt5Ntumo3l7DMtQARo';

/**
 * This is the only available interval values from here: https://docs.binance.us/?shell#trade-data-stream
 */
export const CandlestickIntervals = {
    ONE_MINUTE: '1m',
    THREE_MINUTES: '3m',
    FIVE_MINUTES: '5m',
    FIFTEEN_MINUTES: '15m',
    THIRTY_MINUTES: '30m',
    ONE_HOUR: '1h',
    TWO_HOURS: '2h',
    FOUR_HOURS: '4h',
    SIX_HOURS: '6h',
    EIGHT_HOURS: '8h',
    TWELVE_HOURS: '12h',
    ONE_DAY: '1d',
    THREE_DAYS: '3d',
    ONE_WEEK: '1w',
    ONE_MONTH: '1M'
};

/**
 * These are the types of requests that can be made to the Binance API.
 */
export const Requests = {
    /**
     * @param {*} parameters[0] The cryptocurrency symbol
     * @param {*} parameters[1] The interval span that the sticks are retrieved from
     * @param {*} parameters[2] The amount of candlesticks to retrieve
     * @returns The GET request value for CandleStick data.
     */
    CANDLESTICK_DATA: { GET: (parameters) => `/api/v3/klines?symbol=${parameters[0]}&interval=${parameters[1]}&limit=${parameters[2]}` },
    RECENT_TRADES: { GET: '/api/v3/trades' },
    PRICE_DATA: { GET: '/api/v3/ticker/price' },
    AVERAGE_PRICE: { GET: '/api/v3/avgPrice' },
    EXCHANGE_INFO: { GET: (parameters) => `/api/v3/exchangeInfo?symbols=[${parameters.map(param => `"${param}"`).join(',')}]` },

    /**
     * This gets the exchange server time.
     */
    SERVER_TIME: { GET: '/api/v3/time' },

    /**
     * This tests the connectivity to the exchange and requires no parameters.
     */
    PING: { GET: '/api/v3/ping' },

    /**
     * This gets the status of the exchange system, whether it is normal or under maintenance.
     */
    STATUS: {
        HEADER: `X-MBX-APIKEY:${API_KEY}`,
        GET: `/sapi/v1/system/status?timestamp=${Date.now()}&signature=${generateSignature()}`
    },
}

/**
 * This function asynchronously requests the specified {@param requestType} from the {@constant HOST}
 * and returns 
 * 
 * @param {*} requestType The type of GET request to get from the Binance host
 * @param  {...any} parameters The parameters (if required) to implement into the GET request
 * @returns The JSON formatted response to the request
 */
export const fetchBinanceData = async (requestType, ...parameters) => {
    const endpoint = typeof requestType.GET === 'function' ? requestType.GET(parameters) : requestType.GET;
    const headers = requestType.HEADER ? { 'HEADER': requestType.HEADER } : {};
    const request = `${HOST}${endpoint}`;
    const response = await fetch(request, {
        method: 'GET',
        headers: headers,
        'Content-Type': 'application/json',
    });

    if (!response.ok)
        throw new Error(`${response.status}`);

    return await response.json();
};

/**
 * @returns A generated HMAC SHA 256 signature based on the current timestamp.
 */
export function generateSignature() {
    return CryptoJS.HmacSHA256(`timestamp=${Date.now()}`, SECRET_KEY).toString(CryptoJS.enc.Hex);
}