import React from 'react';
import articleReducer from './articleReducer';
import * as actionTypes from '../action/actionTypes';

const stubInitialState = {
    articles:[{
        id: 0,
        author_id: 1,
        title: "10",
        content: "Hello"
      }],
    comments:[],
    users:[
        {
          "id": 1,
          "email": "swpp@snu.ac.kr",
          "password": "iluvswpp",
          "name": "Software Lover",
          "logged_in": false
        },
        {
          "id": 2,
          "email": "alan@turing.com",
          "password": "iluvswpp",
          "name": "Alan Turing",
          "logged_in": false
        },
        {
          "id": 3,
          "email": "edsger@dijkstra.com",
          "password": "iluvswpp",
          "name": "Edsger Dijkstra",
          "logged_in": false
        }
    ],
    id:0
}
describe('articleReducer', ()=> {
    it('should return default state', ()=> {
        const newState = articleReducer(undefined,{});
        expect(newState).toEqual(  
        { 
            articles: [],
            comments: [],
            users: [],
            id: 0
        });
    })

    it('should post article', ()=>{
        const newState = articleReducer(undefined,{type:actionTypes.POST_ARTICLE, id:0, author_id:1, title:"10", content:"Hello"})
        expect(newState).toEqual({articles:stubInitialState.articles, comments:[],users:[],id:0});
    })

    it('should get all article', ()=> {
        const newState = articleReducer(undefined,{type:actionTypes.GET_ALL_ARTICLE,articles:stubInitialState.articles});
        expect(newState).toEqual({articles:stubInitialState.articles, comments:[],users:[],id:0});
    })

    it('should get all users',()=>{
        const newState = articleReducer(undefined,{type:actionTypes.GET_ALL_USER,users:stubInitialState.users});
        expect(newState).toEqual({articles:[],comments:[],users:stubInitialState.users,id:0})
    })
})