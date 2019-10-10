import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/action/index'
import Comment from '../../components/Comment/Comment'
import Logout from '../../components/Logout/Logout'
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
        onPostComment: (cm) => dispatch(actionCreators.postComment(cm)),
        onDeleteArticle: (id) => dispatch(actionCreators.deleteArticle(id))
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
        this.props.onPostComment({article_id:parseInt(this.id), author_id:1, content:this.state.content});
        this.setState({
            ...this.state,
            content:''
        })
    }
    deletehandleClick = () => {
        //console.log(this.props.storedComments)
        // this.props.onDeleteComments(this.props.storedComments.filter((cm)=>{return cm.article_id==this.id})); (fix it later)
        this.props.onDeleteArticle(this.id); 
        window.location = '/articles';
    }
    edithandleClick = () => {
        window.location.assign('/articles/'+this.id+'/edit');
    }
    author = () => {
        let name = 'no name';
        this.props.storedUsers.forEach(element=>{
            if(element.id == this.props.storedArticle.author_id) {
                name = element.name;
            }
        });
        return name;
    }
    render() {
        const comments = this.props.storedComments.map((cm)=> {
            let name = 'no name';
            this.props.storedUsers.forEach(element => {
                if(element.id==cm.author_id) {
                    name = element.name;
                }
            });
            return <div key={cm.id.toString()}><Comment article_id={this.id} id={cm.id} author_id={cm.author_id} name={name} content={cm.content}/><p/></div>
        });
        let button = () => {
            if(this.props.storedArticle.author_id==1)
            {
                return(
                    <span>
                        <button id='edit-article-button' onClick={this.edithandleClick}>edit</button>
                        <button id='delete-article-button' onClick = {this.deletehandleClick}>delete</button>
                    </span>
                )
            }
            else {
                return;
            }
        }
        return(
            <div className="ArticleDetail" align='center'>
                <Logout/>
                <table align='center' border='1'>
                    <tbody>
                    <tr><td align = 'center' width = '800'><h2 id="article-author">{this.author()}</h2></td></tr>
                    <tr><td align = 'center' width = '800'><h1 id="article-title">{this.props.storedArticle.title}</h1></td></tr>
                    <tr><td width = '800' align = 'center'><h3 id="article-content">{this.props.storedArticle.content}</h3></td></tr>
                    </tbody>
                </table>
                <p/>
                {button()}
                <button id='back-detail-article-button' onClick ={()=>{window.location.assign('/articles')}}>Back</button>
                <h2>- Comments -</h2>
                <table align='center'>
                    <tbody>
                    <tr>
                        <td><input id='new-comment-content-input' onChange = {this.shandleChange} value={this.state.content}/></td>
                        <td><button id='confirm-create-comment-button' disabled = {!this.state.content} onClick = {this.shandleClick}>confirm</button></td>
                    </tr>
                    </tbody>
                </table>
                <p/>
                {comments}
            </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ArticleDetail);