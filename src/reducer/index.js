import { combineReducers } from 'redux';

import application from 'reducer/application';
import location from 'reducer/location';
import orientation from 'reducer/orientation';
import venues from 'reducer/venues';

/**
 * Root reducer
 */
export default combineReducers({
    application,
    location,
    orientation,
    venues
});
