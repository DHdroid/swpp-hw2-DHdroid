import React from 'react';
import loginReducer from './loginReducer';
import * as actionTypes from '../action/actionTypes';

describe('loginReducer', ()=> {
    it('should return default state', ()=> {
        const newState = loginReducer(undefined,{});
        expect(newState).toEqual({login:null});
    })

    it('should get current state',()=> {
        const newState = loginReducer(undefined,{type:actionTypes.GET_LOGIN,iflogin:true});
        expect(newState).toEqual({login:true});
    })

    it('should be able to login',()=> {
        const newState = loginReducer(undefined,{type:actionTypes.LOGIN});
        expect(newState).toEqual({login:true});
    })

    it('should be able to logout',()=> {
        const newState = loginReducer(undefined,{type:actionTypes.LOGOUT});
        expect(newState).toEqual({login:false});
    })
})