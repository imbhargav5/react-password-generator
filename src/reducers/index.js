import { combineReducers } from 'redux';
import { routerReducer, LOCATION_CHANGE } from 'react-router-redux';




const rootReducer = combineReducers({
    routing: routerReducer,
});

export default rootReducer;