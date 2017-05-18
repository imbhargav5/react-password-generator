import { combineReducers } from 'redux';
import {PASSWORD_GENERATORS} from '../constants';


const initialMain = {

	password : null	,
	show : false
}

export const main = function(state={...initialMain},action){
	let {payload} = action;
	switch(action.type){
		case PASSWORD_GENERATORS.GENERATING_PASSWORD :
			return {
				...state,
				password : null,
				show : false
			}
		case PASSWORD_GENERATORS.GENERATED_PASSWORD:
			return {
				...state,
				password : payload.password,
				show : true,
			}
		case PASSWORD_GENERATORS.RESETPASSWORD:
			return {
				...initialMain
			}
		default:
			return state;
	}
}

const initialOptions = {
		length : 16,
		words : [],
		autoselect : false
};

export const options = function(state={...initialOptions},action){
	let {payload} = action;
	switch(action.type){
		case PASSWORD_GENERATORS.CHANGE_OPTION :
			let {key,value} = payload;
			return {
				...state,
				[key] : value
			}

		default:
			return state;
	}
}

const initialInclude={
	lowerCaseAlphabet : true,
	upperCaseAlphabet:true,
	ambiguousSymbols : false,
	symbols : true,
	numbers : true
}
export const include = function(state={...initialInclude},action){
		let {payload} = action;
		switch(action.type){
			case PASSWORD_GENERATORS.CHANGE_INCLUDE:
				let {key,value} = payload;
				return {
					...state,
					[key] : value
				}
			default:
				return state;
		}
}

const meta = combineReducers({
	options,
	include
});



const rootReducer = combineReducers({
	main,
	meta,
});

export default rootReducer;
