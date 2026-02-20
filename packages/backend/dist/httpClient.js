"use strict";
/**
 * Single HTTP client wrapper for all external requests.
 * Easy to mock in tests.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpClient = void 0;
const axios_1 = __importDefault(require("axios"));
function createHttpClient() {
    const instance = axios_1.default.create({
        timeout: 10000,
        headers: { 'Accept': 'application/json' },
    });
    return {
        async get(url) {
            const response = await instance.get(url);
            return response.data;
        },
    };
}
exports.httpClient = createHttpClient();
