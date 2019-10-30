import * as React from 'react';
import { setConfig } from 'react-hot-loader';
import { render } from 'react-dom';
import { Store } from 'redux';
import { createStore } from './lib/createStore';
import App from './index';

// Hot Module Replacement

process.env.NODE_ENV !== 'production' && setConfig({
    reloadHooks : false
});

/**
 * @private Global store
 */
const store: Store = createStore();

// Rendering application into DOM

render(<App store={ store }/>, document.getElementById('root'));
