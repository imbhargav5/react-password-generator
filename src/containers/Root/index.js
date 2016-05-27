import React, {Component} from 'react';
import { Provider } from 'react-redux';
import getDevTools from '../DevTools';
const DevTools = getDevTools(); 
import Home from '../Home';
import reducers from '../../reducers';
import configureStore from '../../store/index';
const store = configureStore();


require('./style.css');




class Root extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return <Provider store={store}>
				<div>
			    	<Home/>
			    <DevTools/>
			   </div>
			  </Provider>
	}
};

export default Root;
