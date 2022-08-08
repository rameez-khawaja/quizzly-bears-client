import { createStore } from 'redux';
import { quizzlyReducer } from './reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';

const store = createStore(quizzlyReducer, devToolsEnhancer());

export default store;
