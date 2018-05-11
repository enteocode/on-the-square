import { VENUES_UPDATE } from 'action/types';

import type { Action } from 'redux';
import type { VenueObject } from 'lib/defs';

// Definitions

export type State = VenueObject[];

/**
 * @type {State}
 */
const initialState: State = null;

/**
 * Venues reducer
 *
 * @public
 * @param {State}    state
 * @param {string}   type
 * @param {Object[]} data
 * @return {State}
 */
const reducer = (state: State = initialState, { type, data }: Action): State => {
    switch (type) {
        case VENUES_UPDATE :
            return data;

        default :
            return state;
    }
};

export default reducer;
