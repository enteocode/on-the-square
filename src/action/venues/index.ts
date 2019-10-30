import { VENUES_UPDATE } from './types';
import { AnyAction } from 'redux';

/**
 * @public
 */
export const setVenues = (venues: Venue[]): AnyAction => {
    return {
        type : VENUES_UPDATE,
        data : venues
    };
};

