import { VENUES_UPDATE } from '../../action/venues/types';
import { AnyAction } from 'redux';

// Definitions

export type State = Venue[];

/**
 * @private
 */
const initialState: State = null;

/**
 * @public
 */
const reducer = (state: State = initialState, { type, data }: AnyAction): State => {
    switch (type) {
        case VENUES_UPDATE :
            return [ ...data ];

        default :
            return state;
    }
};

export default reducer;
