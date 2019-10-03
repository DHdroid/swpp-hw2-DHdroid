import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/action/index'
import './Comment.css'
const mapDispatchToProps = dispatch => {
    return {
        onDeleteComment: (id) => dispatch(actionCreators.deleteComment(id)),
        onEditComment: (cm) => dispatch(actionCreators.editComment(cm))
    };
};
class Comment extends Component {
    edithandleClick = () => {
        let content = prompt('Input Content',this.props.content);
        if(content === '') {
            alert('You cannot create empty comment!');
        }
        else if(content !== null){
            this.props.onEditComment({id:this.props.id, article_id:this.props.article_id ,author_id:1, content:content})
        }
    };
    deletehandleClick = () => {
        this.props.onDeleteComment(this.props.id);
    };
    render(){
        const ifauthor = () => {
            if(this.props.author_id==1)
                return (
                <tr>
                    <td align='center'><button id="edit-comment-button" onClick={this.edithandleClick}>edit</button>
                    <button id="delete-comment-button" onClick={this.deletehandleClick}>delete</button></td>
                </tr>);
            else
                return;
        }
        return(
            <table className="Comment" border ='2'>
                <tr>
                    <tr><td width='150' align='center'>{this.props.name}</td></tr>
                    <tr><td width='200' align='left'>{this.props.content}</td></tr>
                    {ifauthor()}
                </tr>
            </table>
        );
    }
}
export default connect(null, mapDispatchToProps)(Comment);