import React from 'react';
import detailReducer from './detailReducer';
import * as actionTypes from '../action/actionTypes';

const stubInitialState = {
    article:{
        id: 20,
        author_id: 3,
        title:"ReactJS Testing",
        content:"Jest is a delightful JavaScript Testing Framework with a focus on simplicity."
    },
    comments:[
        {
            "id": 20,
            "article_id": 20,
            "author_id": 3,
            "content": "Tornado has hit our town"
        },
        {
            "id": 21,
            "article_id": 20,
            "author_id": 1,
            "content": "Oh, what a misery"
        }
    ],
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
    ]

};
describe('detailReducer', ()=> {
    it('should return default state', ()=> {
        const newState = detailReducer(undefined,{});
        expect(newState).toEqual({
            article: {},
            comments: [],
            users: []
        });
    })

    it('should get all user',()=> {
        const newState = detailReducer(undefined,{type:actionTypes.GET_ALL_USER,users:stubInitialState.users});
        expect(newState).toEqual({article:{}, comments:[], users:stubInitialState.users});
    })
    it('should get article',()=> {
        const newState = detailReducer(undefined,{type:actionTypes.GET_ARTICLE,article:stubInitialState.article});
        expect(newState).toEqual({article:stubInitialState.article, comments:[], users:[]});
    })
    it('should get comments',()=> {
        const newState = detailReducer(undefined,{type:actionTypes.GET_COMMENTS,comments:stubInitialState.comments});
        expect(newState).toEqual({article:{}, comments:stubInitialState.comments, users:[]});
    })
    it('should post comments', ()=> {
        const newState = detailReducer(undefined,{type:actionTypes.POST_COMMENT,id:20,article_id:20,author_id:3,content:"Tornado has hit our town"});
        expect(newState).toEqual({article:{}, comments:[stubInitialState.comments[0]], users:[]});
    })
    it('should delete comments', ()=> {
        const newState = detailReducer({article:{}, comments:[stubInitialState.comments[0]], users:[]},{type:actionTypes.DELETE_COMMENT,targetID:20});
        expect(newState).toEqual({article:{}, comments:[], users:[]});
    })
    it('should edit comments', ()=> {
        const newState = detailReducer({article:{}, comments:[stubInitialState.comments[0],stubInitialState.comments[1]], users:[]},{type:actionTypes.EDIT_COMMENT,cm:
            {
                "id": 20,
                "article_id": 20,
                "author_id": 3,
                "content": "Tornado"
            },
        });
        expect(newState).toEqual({article:{}, comments:[
        {
            "id": 20,
            "article_id": 20,
            "author_id": 3,
            "content": "Tornado"
        },        
        {
            "id": 21,
            "article_id": 20,
            "author_id": 1,
            "content": "Oh, what a misery"
        }], users:[]});
    })
    it('should delete article',()=> {
        const newState = detailReducer({article:stubInitialState.article, comments:[], users:[]},{type:actionTypes.DELETE_ARTICLE});
        expect(newState).toEqual({article:{}, comments:[], users:[]});
    })
    it('should edit article',()=> {
        const newState = detailReducer({article:stubInitialState.article, comments:[], users:[]},{type:actionTypes.EDIT_ARTICLE, ar:{
            id: 20,
            author_id: 3,
            title:"ReactJS Test",
            content:"Jest is a delightful JavaScript Testing Framework with a focus on simplicity."
        }});
        expect(newState).toEqual({article:{
            id: 20,
            author_id: 3,
            title:"ReactJS Test",
            content:"Jest is a delightful JavaScript Testing Framework with a focus on simplicity."
        }, comments:[], users:[]});
    })
})