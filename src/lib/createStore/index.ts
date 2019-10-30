import { Store, createStore as create, compose, applyMiddleware, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../../reducer/';

/**
 * @public Store creator (environment sensitive)
 */
export const createStore = (): Store => {
    // SECURITY WARNING
    //
    // The environment testing condition MUST BE within this scope and cannot be passed
    // as an argument. Otherwise minifier cannot reduce
    // DevTools Extension from the production code and will cause data-leak.

    const apply: Function = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose;
    const store: Store = create(
        rootReducer,
        apply(applyMiddleware(thunk))
    );

    // Hot Module Replacement

    if (module.hot) {
        module.hot.accept('../../reducer/', () => { store.replaceReducer(rootReducer) });
    }
    return store;
};
