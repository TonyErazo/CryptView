import CryptoJS from 'crypto-js';
export { TimeIntervals } from './TimeIntervals';

const SECRET_KEY = process.env.REACT_APP_BINANCE_SECRET_KEY;

/**
 * @returns A generated HMAC SHA 256 signature based on the current timestamp.
 */
export function generateSignature() {
    return CryptoJS.HmacSHA256(`timestamp=${Date.now()}`, SECRET_KEY).toString(CryptoJS.enc.Hex);
}