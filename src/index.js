import React from 'react';
import AppContainer from 'component/AppContainer';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import './index.scss';

import type { Component } from 'react';
import type { Store } from 'redux';

// Definitions

export type Props = {
    store: Store
};

/**
 * Application framework
 *
 * @public
 * @param {Store} store
 * @return {Component}
 * @constructor
 */
const App = ({ store }: Props): Component => (
    <Provider store={store}>
        <AppContainer/>
    </Provider>
);

export default hot(module)(App);
