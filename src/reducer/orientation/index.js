import { ORIENTATION_CHANGE } from 'action/types';

import type { Action } from 'redux';
import type { OrientationObject } from 'lib/defs';

// Definitions

export type State = OrientationObject;

/**
 * @type {State}
 */
const initialState: State = null;

/**
 * Orientation reducer
 *
 * @public
 * @param {State}  state
 * @param {string} type
 * @param {Action} action
 * @return {State}
 */
const reducer = (state: State = initialState, { type, ...action }: Action): State => {
    switch (type) {
        case ORIENTATION_CHANGE:
            return { ...state, ...action };

        default:
            return state;
    }
};

export default reducer;
