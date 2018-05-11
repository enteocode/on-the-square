import React from 'react';
import ReactDOM from 'react-dom';
import App from './index';
import createStore from 'lib/createStore';
import { getVenues } from 'lib/foursquare';
import { getDistance } from 'geolib';

import type { Store } from 'redux';

/**
 * Application store
 *
 * @private
 * @type {Store}
 */
const store: Store = createStore({
    getDistance,
    getVenues
});

// Rendering application into DOM

ReactDOM.render(<App store={store}/>, document.getElementById('root'));
