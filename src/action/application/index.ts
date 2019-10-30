import { APP_MESSAGE, APP_SET_CENTER } from './types';
import { setVenues } from '../venues';
import { getVenues } from '../../lib/foursquare';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

/**
 * @public Sets message on Overlay
 */
export const setMessage = (message: string, isError: boolean = false): AnyAction => {
    return {
        type: APP_MESSAGE,
        message,
        error: isError
    };
};

/**
 * @public Sets the center of the request and fetches venues nearby
 */
export const setSearchCenter = (center: LocationCoordinates): ThunkAction<void, {}, undefined, AnyAction> => {
    return async (dispatch) => {
        dispatch({
            type: APP_SET_CENTER,
            center
        });
        try {
            dispatch(setVenues(await getVenues(center)));
        }
        catch (e) {
            dispatch(setMessage(e.message, true));
        }
    };
};
