import React, {Component} from 'react';
import {connect} from 'react-redux';
import {generatePassword, changeOption, changeInclude, resetPassword} from '../../actions/index';

console.log(jsPDF);

let styles = require('./style.css');

class Home extends React.Component{
	constructor(props){
		super(props);
	}

	componentWillMount(){
		
	}

	_changeOption(key,value){
		const {dispatch} = this.props;
		dispatch(changeOption(key,value));
	}

	_changeInclude(key,value){
		const {dispatch} = this.props;
		dispatch(changeInclude(key,value));
	}

	_generatePassword(){
		const {dispatch} = this.props;
		dispatch(generatePassword());
	}

	_closePassword(){
		const {dispatch} = this.props;
		dispatch(resetPassword());
	}

	_downloadAsPdf(){
		const {password} = this.props.main;
		if(!password){
			alert('Generate password first');
		}
		var doc = new jsPDF();
		doc.text(20, 20, password);
		doc.save(`${Date.now()}ReactPasswordGenerator.pdf`);
		this._closePassword();
	}
	
	render(){
		let {main,meta} = this.props;
		let {password, show} = main;
		let {options,include} = meta;
		let {length, autoselect} = options;
		let {lowerCaseAlphabet, upperCaseAlphabet, symbols, numbers, ambiguousSymbols} = include;
		console.log(include);
		if(autoselect){
			//do something
			
		}
		return <div className={styles.root}>
			<div className={styles.banner}>
					<p> Password Generator Built with React </p>
			</div>

					<div className={styles.container}>

					<div className={styles.box}>
						<div className={styles.heading}> Options </div>
						<fieldset>
							<label>Length </label>
							<input type="number" onChange={(e)=>{this._changeOption('length',e.target.value)}} defaultValue={length} />
						</fieldset>
					</div>

					<div className={styles.box}>
						<div className={styles.heading}> Includes </div>
					<fieldset>
						<label> Lowercase alphabet </label>
						<input type="checkbox" onChange={(e)=>{ console.log(e.target.value); console.log(e); this._changeInclude('lowerCaseAlphabet',e.target.checked)}} defaultChecked={lowerCaseAlphabet} />
					</fieldset>

					<fieldset>
						<label> Uppercase alphabet </label>
						<input type="checkbox" onChange={(e)=>{ console.log(e.target.value); console.log(e); this._changeInclude('upperCaseAlphabet',e.target.checked)}} defaultChecked={upperCaseAlphabet} />
					</fieldset>
					
					<fieldset>
						<label> Symbols </label>
						<input type="checkbox" onChange={(e)=>{ console.log(e.target.value); console.log(e); this._changeInclude('symbols',e.target.checked)}} defaultChecked={symbols} />
					</fieldset>
					
					<fieldset>
						<label> Numbers </label>
						<input type="checkbox" onChange={(e)=>{ console.log(e.target.value); console.log(e); this._changeInclude('numbers',e.target.checked)}} defaultChecked={numbers} />
					</fieldset>
					
					<fieldset>
						<label> AmbiguousSymbols </label>
						<input type="checkbox" onChange={(e)=>{ console.log(e.target.value); console.log(e); this._changeInclude('ambiguousSymbols',e.target.checked)}} defaultChecked={ambiguousSymbols} />
					</fieldset>
					

					<fieldset>
						<label>Autoselect </label>
						<input type="checkbox" onChange={(e)=>{ console.log(e.target.value); console.log(e); this._changeOption('autoselect',e.target.checked)}} defaultChecked={autoselect} />
					</fieldset>

					</div>

					<div className={styles.password+' '+ (show ?styles.show : styles.hide)}>
							<div className={styles.heading}><p>Here is your password! </p></div>
							
							<p>{password}</p>

							<p><button onClick={()=>this._downloadAsPdf()} className={styles.action_pdf}> Download As Pdf</button> <button onClick={()=>this._closePassword()} className={styles.action_close_button}> Done</button> </p>

					</div>
					<div className={styles.box}>
						
						<div className={styles.heading} title="Note: These would be added as they are"> Get your password! </div>		

						<button onClick={()=>this._generatePassword()} className={styles.action_generate}> GeneratePassword</button>
						

					</div>
			</div>
		</div>
	}
};


function select(state){
	return state;
};

export default connect(select)(Home);
