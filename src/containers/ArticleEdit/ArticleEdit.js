import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/action/index'
import Logout from '../../components/Logout/Logout'
const mapStateToProps = state => {
    return {
        storedArticle:state.dr.article,
        storedUsers:state.dr.users
    };
}
const mapDispatchToProps = dispatch => {
    return {
        onGetArticle: (id) => dispatch(actionCreators.getArticle(id)),
        onGetUser: () => dispatch(actionCreators.getUsers()),
        onEditArticle: (ar) => dispatch(actionCreators.editArticle(ar))
    }
}
class ArticleEdit extends Component {
    state = {
        title:null,
        content:null,
        write: true
    }
    id = this.props.match.params.id;
    async componentDidMount() {
        await this.props.onGetArticle(this.props.match.params.id).then();
        await this.setState({
            ...this.state,
            title:this.props.storedArticle.title,
            content:this.props.storedArticle.content
        });
        await this.props.onGetUser();
    }
    titlehandleChange = (t) => {
        this.setState({
            ...this.state,
            title:t.target.value
        })
    }
    contenthandleChange = (c) => {
        this.setState({
            ...this.state,
            content:c.target.value
        })
    }
    previewhandleClick = (c) => {
        this.setState({
            ...this.state,
            write:false
        })
    }
    writehandleClick = (c) => {
        this.setState({
            ...this.state,
            write:true
        })
    }
    backhandleClick = (c) => {
        if(this.state.title!==this.props.storedArticle.title||this.state.content!==this.props.storedArticle.content)
        {
            if(confirm("Are you sure? The change will be lost")===true) { //eslint-disable-line
                window.location.assign('/articles/'+this.id);
            }
        }
        else {
            window.location.assign('/articles/'+this.id);
        }
    }
    confirmhandleClick = (c) => {
        this.props.onEditArticle({...this.props.storedArticle, title:this.state.title, content:this.state.content});
        window.location.assign('/articles/'+this.id);
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
        
        let titleinput = null;
        let contentinput = null;
        if(this.state.title!==null)
            titleinput = <p><textarea cols='70' rows='4' id='article-title-input' onChange={this.titlehandleChange} value={this.state.title}></textarea></p>;
        if(this.state.content!==null)
            contentinput = <p><textarea cols='70' rows='4' id='article-content-input' onChange={this.contenthandleChange} value={this.state.content}></textarea></p>;
        let view = () => {
                if(this.state.write) {
                    return(
                    <div>
                        <h4>Title</h4>
                        {titleinput}
                        <h4>Content</h4>
                        {contentinput}
                    </div>);
                }
                else {
                    return(
                    <table align='center' border='1'>
                        <tbody>
                            <tr><td align = 'center' width = '800'><h2 id="article-author">{this.author()}</h2></td></tr>
                            <tr><td align = 'center' width = '800'><h1 id="article-title">{this.state.title}</h1></td></tr>
                            <tr><td width = '800' align = 'center'><h3 id="article-content">{this.state.content}</h3></td></tr>
                        </tbody>
                    </table>);
                }
            }
        return(
            <div className="ArticleEdit">
                <Logout/>
                {view()}
                <p><button id='back-edit-article-button' onClick={this.backhandleClick}>back</button></p>
                <p><button id='confirm-edit-article-button' disabled ={!this.state.title||!this.state.content} onClick={this.confirmhandleClick}>confirm</button></p>
                <p><button id='preview-tab-button' onClick={this.previewhandleClick}>preview</button></p>
                <p><button id='write-tab-button' onClick={this.writehandleClick}>write</button></p>
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ArticleEdit)