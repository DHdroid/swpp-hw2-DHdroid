import * as actionTypes from '../action/actionTypes';

const initialState = {
    articles: [],
    comments: [],
    users: [],
    id: 0
}

const articleReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.POST_ARTICLE:
            const newArticle = {
                id: action.id,
                title: action.title,
                content: action.content,
                author_id: action.author_id
            };
            return {...state, articles: state.articles.concat(newArticle), id:action.id}
        case actionTypes.GET_ALL_ARTICLE:
            return {...state, articles: action.articles}
        case actionTypes.GET_ALL_USER:
            return {...state, users:action.users}
        default:
            break;
    }
    return state;
}

export default articleReducer;