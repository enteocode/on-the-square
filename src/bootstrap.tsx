import * as React from 'react';
import { render } from 'react-dom';
import { Store } from 'redux';
import { createStore } from './lib/createStore';
import App from './index';

/**
 * @private Global store
 */
const store: Store = createStore();

// Rendering application into DOM

render(<App store={ store }/>, document.getElementById('root'));
