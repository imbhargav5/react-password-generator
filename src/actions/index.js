import {PASSWORD_GENERATORS} from '../constants';
import generatePasswordFn from '../utils/generatePassword';

export const generatingPassword = function generatingPassword(){
	return {
		type : PASSWORD_GENERATORS.GENERATING_PASSWORD
	}
}





export const generatedPassword = function generatedPassword(password){
	return {
		type : PASSWORD_GENERATORS.GENERATED_PASSWORD,
		payload : {
			password
		}
	}
}

export const changeOption = function changeOption(key,value){
	return {
		type : PASSWORD_GENERATORS.CHANGE_OPTION,
		payload : {
			key,
			value
		}
	}
}

export const changeInclude = function changeInclude(key,value){
	return {
		type : PASSWORD_GENERATORS.CHANGE_INCLUDE,
		payload : {
			key,
			value
		}
	}
}

export const generatePassword = function generatePassword(){
	return (dispatch,getState)=>{
		let {meta} = getState();
		dispatch(generatingPassword());
		let pass = generatePasswordFn(meta);
		dispatch(generatedPassword(pass));
	}
}


export const resetPassword = function resetPassword(){
	return {
		type : PASSWORD_GENERATORS.RESETPASSWORD
	}
}