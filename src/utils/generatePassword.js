export function generatePassword({options,include}){
	let {length} = options;
	length = length || 8;

	let data = {
		lowerCaseAlphabet : "abcdefghijklmnopqrstuvwxyz",
		upperCaseAlphabet : "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
		numbers :  "0123456789",
		symbols : "!@#$%^&*?",
		ambiguousSymbols : "{}[]()|/\\'\"`~,;:.<>",
	}
	


	let charset="";
	Object.keys(include).filter(key=>include[key]).forEach(key=>charset+=data[key])

	let retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;

}

export default generatePassword;