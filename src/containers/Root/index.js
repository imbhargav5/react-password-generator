import React, {Component} from 'react';
import { Provider } from 'react-redux';
import getDevTools from '../DevTools';
const DevTools = getDevTools(); 
import App from '../App';
import Home from '../Home';
import { Router, Route , IndexRedirect, Link, hashHistory} from 'react-router'

import { syncHistoryWithStore } from 'react-router-redux';
import reducers from '../../reducers';
import configureStore from '../../store/index';
const store = configureStore();


require('./style.css');


const history = syncHistoryWithStore(hashHistory, store);


class Root extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return <Provider store={store}>
				<div>
			    <Router history={history}>
			      <Route path="/" component={App}>
			      	 <IndexRedirect to="home" />
			      	 <Route path="home" component={Home} />
			      	
			      </Route>
			    </Router>
			    <DevTools/>
			   </div>
			  </Provider>
	}
};

export default Root;
