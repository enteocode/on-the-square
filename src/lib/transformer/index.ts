import { LngLatLike } from 'mapbox-gl';

/**
 * @public Mapbox uses reverse order of latitude/longitude
 */
export const toLngLatLike = (location: LocationCoordinates): LngLatLike => [
    location.lng,
    location.lat
];
