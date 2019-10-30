import { ORIENTATION_CHANGE } from './types';
import { AnyAction } from 'redux';

/**
 * @public
 */
export const setOrientation = (alpha: number = 0, beta: number = 0): AnyAction => {
    return {
        type  : ORIENTATION_CHANGE,
        alpha : alpha.toFixed(1),
        beta  : beta.toFixed(1)
    };
};

