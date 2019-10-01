import React, {Component} from 'react';
import './Comment.css'
class Comment extends Component {
    render(){
        const ifauthor = () => {
            if(this.props.author_id==1)
                return (
                <tr>
                    <td align='center'><button id="edit-comment-button">edit</button>
                    <button id="delete-comment-button">delete</button></td>
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
export default Comment;