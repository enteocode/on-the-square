import { ORIENTATION_CHANGE } from '../../action/orientation/types';
import { AnyAction } from 'redux';

// Definitions

export type State = Orientation;

/**
 * @type {State}
 */
const initialState: State = null;

/**
 * @public
 */
const reducer = (state: State = initialState, { type, ...action }: AnyAction): State => {
    switch (type) {
        case ORIENTATION_CHANGE:
            return { ...state, ...action };

        default:
            return state;
    }
};

export default reducer;
