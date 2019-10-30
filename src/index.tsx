import * as React from 'react';
import AppContainer from './component/AppContainer';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';

import './index.scss';

export interface Props {
    store: Store
}

const App: React.FunctionComponent<Props> = ({ store }) => (
    <Provider store={ store }>
        <AppContainer/>
    </Provider>
);

export default hot(App);
