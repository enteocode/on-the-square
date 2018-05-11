import { APP_MESSAGE, APP_SET_CENTER } from 'action/types';

import type { Action } from 'redux';
import type { LatLngObject } from 'lib/defs';

// Definitions

export type State = {
    center: LatLngObject,
    message: string,
    error: boolean
};

/**
 * @type {State}
 */
const initialState: State = {
    center: null,
    message: '',
    error: false
};

/**
 * Application reducer
 *
 * @public
 * @param {State}  state
 * @param {string} type
 * @param {Action} action
 * @return {State}
 */
const reducer = (state: State = initialState, { type, ...action }: Action): State => {
    switch (type) {
        case APP_MESSAGE :
            return { ...state, ...action };

        case APP_SET_CENTER :
            return { ...state, center : action.center };

        default:
            return state;
    }
};

export default reducer;
