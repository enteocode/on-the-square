import React, { StrictMode } from 'react';
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

/**
 * @private
 */
const rootEl: HTMLElement = document.getElementById('root');

// Rendering application into DOM

render(
    <StrictMode>
        <App store={ store }/>
    </StrictMode>,

    rootEl
);
