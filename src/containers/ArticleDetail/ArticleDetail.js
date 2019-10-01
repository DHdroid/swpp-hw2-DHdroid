import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/action/index'
import Comment from '../../components/Comment/Comment'
const mapStateToProps = state => {
    return {
        storedArticle:state.dr.article,
        storedUsers:state.dr.users,
        storedComments:state.dr.comments
    };
}
const mapDispatchToProps = dispatch => {
    return {
        onGetUser: () => dispatch(actionCreators.getUsers()),
        onGetArticle: (id) => dispatch(actionCreators.getArticle(id)),
        onGetComments: (id) => dispatch(actionCreators.getComments(id)),
        onPostComment: (cm) => dispatch(actionCreators.postComment(cm))
    }
}
class ArticleDetail extends Component {
    state = {
        content:''
    }
    id = this.props.match.params.id;
    componentDidMount() {
        this.props.onGetUser();
        this.props.onGetArticle(this.id);
        this.props.onGetComments(this.id);
    }
    shandleChange = (s) => {
        this.setState ({
            content:s.target.value
        });
    }
    shandleClick = () => {
        this.props.onPostComment({article_id:this.id, author_id:1, content:this.state.content});
    }
    render() {
        const comments = this.props.storedComments.map((cm)=> {
            let name = 'no name';
            this.props.storedUsers.forEach(element => {
                if(element.id==cm.author_id) {
                    name = element.name;
                }
            });
            return <div><Comment author_id={cm.author_id} name={name} content={cm.content}/><p/></div>
        });
        return(
            <div className="ArticleDetail" align='center'>
                <table align='center' border='1'>
                    <tr><td align = 'center'><h1>{this.props.storedArticle.title}</h1></td></tr>
                    <tr><td width = '800' align = 'center'><h3>{this.props.storedArticle.content}</h3></td></tr>
                </table>
                <p/>
                <button id='back-detail-article-button' onClick ={()=>{window.location='/articles'}}>Back</button>
                <h2>- Comments -</h2>
                <table align='center'>
                    <tr>
                        <td><input id='new-comment-content-input' onChange = {this.shandleChange}/></td>
                        <td><button id='confirm-create-comment-button' disabled = {!this.state.content} onClick = {this.shandleClick}>confirm</button></td>
                    </tr>
                </table>
                <p/>
                {comments}
            </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ArticleDetail);