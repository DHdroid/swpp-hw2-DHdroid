import * as actionTypes from '../action/actionTypes';
const initialState = {
    login:null
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_LOGIN:
            return {login:action.iflogin};
        case actionTypes.LOGIN:
            return {login:true};
        case actionTypes.LOGOUT:
            return {login:false};
        default:
                break;
    }
    return state;
}

export default loginReducer;