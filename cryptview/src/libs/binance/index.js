import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.REACT_APP_BINANCE_SECRET_KEY;
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
 * @returns A generated HMAC SHA 256 signature based on the current timestamp.
 */
export function generateSignature() {
    return CryptoJS.HmacSHA256(`timestamp=${Date.now()}`, SECRET_KEY).toString(CryptoJS.enc.Hex);
}