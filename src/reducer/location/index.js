import { LOCATION_CHANGE } from 'action/types';

import type { Action } from 'redux';
import type { LatLngObject } from 'lib/defs';

// Definitions

export type State = LatLngObject;

/**
 * @type {State}
 */
const initialState: State = null;

/**
 * Location reducer
 *
 * @public
 * @param {State}  state
 * @param {string} type
 * @param {Action} action
 * @return {State}
 */
const reducer = (state: State = initialState, { type, ...action }: Action): State => {
    switch (type) {
        case LOCATION_CHANGE:
            return { ...state, ...action };

        default:
            return state;
    }
};

export default reducer;
