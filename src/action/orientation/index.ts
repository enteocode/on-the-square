import { ORIENTATION_CHANGE } from './types';
import { AnyAction } from 'redux';
import { toRounded } from '../../lib/transformer';

/**
 * @public
 */
export const setOrientation = (alpha: number = 0, beta: number = 0): AnyAction => {
    return {
        type  : ORIENTATION_CHANGE,
        alpha : toRounded(alpha),
        beta  : toRounded(beta)
    };
};

