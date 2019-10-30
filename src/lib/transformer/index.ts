import { LngLatLike } from 'mapbox-gl';

/**
 * @public
 */
export const toRounded = (value: number, threshold: number = 1): number => {
    const amplitude = 10 * threshold;

   return Math.round(value / amplitude) * amplitude;
};

/**
 * @public Mapbox uses reverse order of latitude/longitude
 */
export const toLngLatLike = (location: LocationCoordinates): LngLatLike => [
    location.lng,
    location.lat
];
