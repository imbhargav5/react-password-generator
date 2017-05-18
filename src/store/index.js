import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import rootReducer from '../reducers/index';
import getDevTools from '../containers/DevTools';
import {routerMiddleware} from 'react-router-redux';
import {hashHistory} from 'react-router';
import * as middlewares from './middlewares';

const DevTools = getDevTools();

const loggerMiddleware = createLogger();

const middleware = [thunkMiddleware, routerMiddleware(hashHistory)];

export default function configureStore(initialState={}) {
  let buildStore;
  if(process.env.NODE_ENV==='development'){
    buildStore =  compose(
      applyMiddleware(
        ...middleware,
        middlewares.superLogger,
      ),
       DevTools.instrument()
    );

  }else{
    buildStore = compose(
        applyMiddleware(
          ...middleware
        )
    );
  }
  const store = createStore( rootReducer , buildStore);
  console.log(store);
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/index', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
