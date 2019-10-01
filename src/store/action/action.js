import axios from 'axios';
import * as actionTypes from './actionTypes';

import {push} from 'connected-react-router';
import { tsDeclareFunction } from '@babel/types';

export const getArticles_ = (articles) => {
    return {type: actionTypes.GET_ALL_ARTICLE, articles:articles}
};

export const getArticles = () => {
    return dispatch => {
        return axios.get('/api/articles')
            .then(res => dispatch(getArticles_(res.data)));
    }
};

export const getUsers_ = (users) => {
    return {type: actionTypes.GET_ALL_USER, users:users}
};

export const getUsers = () => {
    return dispatch => {
        return axios.get('/api/user')
            .then(res => {
                dispatch(getUsers_(res.data))
            });
    }
};

export const postArticle_ = (ar) => {
    return {
        type: actionTypes.POST_ARTICLE,
        id: ar.id,
        title: ar.title,
        content: ar.content,
        author_id: ar.author_id
    }
};

export const postArticle = (ar) => {
    return dispatch => {
        return axios.post('/api/articles',ar)
            .then(res=> {
                dispatch(postArticle_(res.data))
            });
    }
};

export const getArticle_ = (article) => {
    return {type:actionTypes.GET_ARTICLE, article:article}
};

export const getArticle = (id) => {
    return dispatch =>{
        return axios.get('/api/articles')
            .then(res=>{
                let ar;
                res.data.forEach(element => {
                    if(element.id == id) {
                        ar = element;
                    }
                });
                dispatch(getArticle_(ar));
            });
    }
}

export const getComments_ = (comments) => {
    return {type:actionTypes.GET_COMMENTS, comments:comments}
}

export const getComments = (id) => {
    return dispatch => {
        return axios.get('/api/comments')
            .then(res=> {
                let comments = [];
                res.data.forEach(element => {
                    if(element.article_id==id) {
                        comments.push(element);
                    }
                });
                dispatch(getComments_(comments));
            });
    }
}

export const postComment_ = (cm) => {
    return {
        type:actionTypes.POST_COMMENT,
        id: cm.id,
        article_id:cm.article_id,
        author_id:cm.author_id,
        content:cm.content
    }
}
export const postComment = (cm) => {
    return dispatch => {
        return axios.post('/api/comments',cm)
            .then(res=>{
                dispatch(postComment_(res.data))
            })
    }
}