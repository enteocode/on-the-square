import { APP_MESSAGE, APP_SET_CENTER } from 'action/types';
import { setVenues } from 'action/venues';

import type { Action, Dispatch } from 'redux';

/**
 * Sets message on Overlay
 *
 * @public
 * @param {string}  message
 * @param {boolean} isError
 * @return {Action}
 */
export const setMessage = (message: string, isError: boolean = false): Action => ({
    type: APP_MESSAGE,
    message,
    error: isError
});

/**
 * Sets center of the request
 *
 * @public
 * @param {Object} center
 * @return {Action}
 */
export const setCenterCoordinates = (center: Object): Action => ({
    type: APP_SET_CENTER,
    center
});

/**
 * Sets the center of the request and fetches venues nearby
 *
 * @public
 * @param {Object} center
 * @return {Promise}
 */
export const setCenter = (center: Object): Promise => {
    return async (dispatch: Dispatch, getState: Function, api: Object): void => {
        dispatch(setCenterCoordinates(center));

        try {
            dispatch(setVenues(await api.getVenues(center)));
        }
        catch (e) {
            dispatch(setMessage(e.message, true))
        }
    };
};
