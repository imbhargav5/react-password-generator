import React, {Component} from 'react';
import {connect} from 'react-redux';

let styles = require('./style.css');

class Home extends React.Component{
	constructor(props){
		super(props);
	}

	componentWillMount(){
		const {dispatch} = this.props;
	}

	
	render(){
		return <div className={styles.root}>
		</div>
	}
};


function select(state){
	return state;
};

export default connect(select)(Home);
