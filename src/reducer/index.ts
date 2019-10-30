import { combineReducers } from 'redux';

import application, { State as ApplicationState } from './application';
import location, { State as LocationState } from './location';
import orientation, { State as OrientationState } from './orientation';
import venues, { State as VenuesState } from './venues';

export interface RootState {
    application: ApplicationState,
    location: LocationState,
    orientation: OrientationState,
    venues: VenuesState
}

/**
 * @public
 */
export default combineReducers<RootState>({
    application,
    location,
    orientation,
    venues
});
