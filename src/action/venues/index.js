import { VENUES_UPDATE } from 'action/types';

import type { Action } from 'redux';
import type { VenueObject } from 'lib/defs';

/**
 * Sets the list of venues
 *
 * @public
 * @param {VenueObject[]} venues
 * @return {Action}
 */
export const setVenues = (venues: VenueObject[]): Action => ({
    type: VENUES_UPDATE,
    data: venues
});

