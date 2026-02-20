/**
 * Open-Meteo Geocoding API response shapes.
 * @see https://geocoding-api.open-meteo.com/v1/search
 */
export interface GeocodingResult {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    country_code: string;
    country?: string;
    admin1?: string;
    timezone?: string;
}
export interface GeocodingResponse {
    results?: GeocodingResult[];
}
//# sourceMappingURL=geocoding.d.ts.map