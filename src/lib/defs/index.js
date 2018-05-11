/**
 * Geolocation coordinates
 *
 * @typedef  {Object} LatLngObject
 * @property {number} lat
 * @property {number} lng
 */
export type LatLngObject = { lat: number, lng: number };

/**
 * Angles for device-orientation
 *
 * @typedef  {Object} OrientationObject
 * @property {number} alpha
 * @property {number} beta
 */
export type OrientationObject = { alpha: number, beta:  number };

/**
 * Venue
 *
 * @typedef  {Object} VenueObject
 * @property {string} guid
 * @property {string} name Name of the venue
 * @property {string} type Type of the venue (like "Restaurant")
 *
 * @implements LatLngObject
 */
export type VenueObject = { ...LatLngObject, guid: string, name: string, type: string };
