import { LOCATION_CHANGE } from './types';
import { setMessage, setSearchCenter } from '../application';
import { getDistance } from 'geolib';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

/**
 * @private
 */
const setLocationCoordinates = (lat: number, lng: number): AnyAction => {
    return {
        type : LOCATION_CHANGE,
        lat,
        lng
    };
};

/**
 * @public
 *
 * @param lat Latitude
 * @param lng Longitude
 * @param threshold The refresh-rate in distance (meters)
 */
export const setLocation = (lat: number, lng: number, threshold: number = 300): ThunkAction<void, {}, undefined, AnyAction> => {
    return (dispatch, getState: Function) => {
        if (getState().location === null) {
            dispatch(setMessage('Hit the road Jack'));
        }
        dispatch(setLocationCoordinates(
            lat,
            lng
        ));
        const center = getState().application.center;
        const coords = {
            lat,
            lng
        };
        if (center === null || threshold < getDistance(center, coords, 50)) {
            dispatch(setSearchCenter(coords));
        }
    };
};
