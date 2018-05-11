import { createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from 'reducer/';

import type { Store } from 'redux';

/**
 * Store creator (environment sensitive)
 *
 * @public
 * @param {Object} api User defined API passed to ActionCreators
 * @return {Store}
 */
export default (api: Object = null): Store => {
    // SECURITY WARNING
    //
    // The environment testing condition MUST BE within this scope and cannot be passed
    // as an argument. Otherwise Uglify can't reduce
    // DevTools Extension from the production code and will lead data-leak.

    const apply = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose;
    const store = createStore(
        rootReducer,
        apply(applyMiddleware(thunk.withExtraArgument(api)))
    );

    // Hot Module Replacement

    if (module.hot) {
        module.hot.accept('reducer/', () => { store.replaceReducer(rootReducer) });
    }
    return store;
};
