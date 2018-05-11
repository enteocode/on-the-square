import { LOCATION_CHANGE } from 'action/types';
import { setMessage, setCenter, setCenterCoordinates } from 'action/application';

import type { Action, ActionCreator, Dispatch } from 'redux';

const { round } = Math;

/**
 * @type {number} Threshold of action (in meters)
 */
const THRESHOLD = 1000;

/**
 * @type {number} The rounding value for precision of coordinates
 */
const PRECISION = 1E6;

/**
 * Sets the rounded location-coordinates to prevent unnecessary updates on
 * small changes
 *
 * @public
 * @param {number} lat
 * @param {number} lng
 * @return {Object}
 */
export const setLocationCoordinates = (lat: number, lng: number): Action => ({
    type: LOCATION_CHANGE,
    lat: round(lat * PRECISION) / PRECISION,
    lng: round(lng * PRECISION) / PRECISION
});

/**
 * Sets the location-coordinates
 *
 * If the distance between the new location and the previous center is bigger
 * than the THRESHOLD, then resets the center and forges a request to
 * Foursquare Places API.
 *
 * @public
 * @param {number} lat
 * @param {number} lng
 * @return {ActionCreator}
 */
export const setLocation = (lat: number, lng: number): ActionCreator => {
    return (dispatch: Dispatch, getState: Function, api: Object) => {
        // If this is the first run, we are like to inform the user what's happening :)

        if (getState().location === null) {
            dispatch(setMessage('Hit the road Jack, just a few secs'));
        }

        // Setting the new coordinates

        dispatch(setLocationCoordinates(lat, lng));

        // Measure the distance between the previously set center and update venues
        // if there was enough movement since the last request

        const center = getState().application.center;
        const coords = {
            lat,
            lng
        };

        if (center === null || THRESHOLD < api.getDistance(center, coords, 0, 1)) {
            dispatch(setCenter(coords));
        }
    };
};
