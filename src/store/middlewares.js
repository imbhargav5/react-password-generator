
export const superLogger = store => next => action => {

		try{
			var action = next(action);

			console.log('\n');
			console.log('%c '+action.type,'color : #1976D2');
			if(action.payload){
				Object.keys(action.payload).forEach(i=>console.log(i,'---',action.payload[i]));
			}
			console.log('\n');
			return action;

		}catch(err){
			throw err;
		}

};

