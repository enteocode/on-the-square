import { APP_MESSAGE, APP_SET_CENTER } from '../../action/application/types';
import { AnyAction } from 'redux';

// Definitions

export type State = {
    center: LocationCoordinates,
    message: string,
    error: boolean
};

/**
 * @private
 */
const initialState: State = {
    center: null,
    message: '',
    error: false
};

/**
 * @public
 */
const reducer = (state: State = initialState, { type, ...action }: AnyAction): State => {
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
