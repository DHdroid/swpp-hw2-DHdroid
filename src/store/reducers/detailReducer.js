import * as actionTypes from '../action/actionTypes';
const initialState = {
    article: {},
    comments: [],
    users: []
}

const detailReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_USER:
            return {...state, users:action.users};
        case actionTypes.GET_ARTICLE:
            return {...state, article:action.article};
        case actionTypes.GET_COMMENTS:
            return {...state, comments:action.comments};
        case actionTypes.POST_COMMENT:
            const newComment = {
                id: action.id,
                article_id: action.article_id,
                author_id: action.author_id,
                content: action.content
            }
            return {...state, comments:state.comments.concat(newComment)}
        default:
            break;
    }
    return state;
}

export default detailReducer;