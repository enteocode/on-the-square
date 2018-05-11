import { ORIENTATION_CHANGE } from 'action/types';

import type { Action } from 'redux';

const { floor } = Math;

/**
 * @type {number} Threshold of rounding
 */
const THRESHOLD = 10;

/**
 * Sets the rounded position of device-orientation
 *
 * @public
 * @param {number} alpha
 * @param {number} beta
 * @return {Action}
 */
export const setOrientation = (alpha: number = 0, beta: number = 0): Action => ({
    type  : ORIENTATION_CHANGE,
    alpha : floor(alpha / THRESHOLD) * THRESHOLD,
    beta  : floor(beta  / THRESHOLD) * THRESHOLD
});

