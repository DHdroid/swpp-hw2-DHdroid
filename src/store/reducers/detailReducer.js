import * as actionTypes from '../action/actionTypes';
import { toUnicode } from 'punycode';
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
        case actionTypes.DELETE_COMMENT:
            const deletedcomment = state.comments.filter((cm)=>{
                return cm.id != action.targetID;
            })
            return {...state, comments:deletedcomment}
        case actionTypes.EDIT_COMMENT:
            const modified = state.comments.map((cm)=>{
                if(cm.id==action.cm.id) {
                    return action.cm; 
                }
                else {
                    return cm;
                }
            })
            return {...state, comments:modified};
        case actionTypes.DELETE_ARTICLE:
            return {...state, artcicle:[]};
        case actionTypes.DELETE_COMMENTS:
            return {...state, comments:[]};
        case actionTypes.EDIT_ARTICLE:
            return {...state, artcicle:action.ar}
        default:
            break;
    }
    return state;
}

export default detailReducer;