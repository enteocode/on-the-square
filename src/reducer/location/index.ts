import { LOCATION_CHANGE } from '../../action/location/types';
import { AnyAction } from 'redux';

// Definitions

export type State = LocationCoordinates;

/**
 * @private
 */
const initialState: State = null;

/**
 * @public
 */
const reducer = (state: State = initialState, { type, ...action }: AnyAction): State => {
    switch (type) {
        case LOCATION_CHANGE:
            return { ...state, ...action };

        default:
            return state;
    }
};

export default reducer;
