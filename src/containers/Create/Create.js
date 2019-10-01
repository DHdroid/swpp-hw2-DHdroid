import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/action/index'
const mapDispatchToProps = dispatch => {
    return {
        onPostArticle: (ar) => dispatch(actionCreators.postArticle(ar)),
    }
}
const mapStateToProps = state => {
    return {
        storedArticles:state.ar.articles
    };
}
class Create extends Component {
    state = {
        title:"",
        content:""
    }
    thandleChange = (t) => {
        this.setState ({
            title: t.target.value
        })
    }
    chandleChange = (c) => {
        this.setState ({
            content: c.target.value
        })
    }
    bhandleClick = () => {
        window.location = '/articles'
    }
    chandleClick = () => {
        this.props.onPostArticle({title:this.state.title, content:this.state.content, author_id:1})
        window.location = '/articles'
    }
    render() {
        return (
        <div className="Create">
            <p>Title <input id="article-title-input" onChange={this.thandleChange}/></p>
            <p>Content <input id="article-content-input" onChange={this.chandleChange}/></p>
            <button id="back-create-article-button" onClick={this.bhandleClick  }>back</button><p/>
            <button id="confirm-create-article-button" onClick={this.chandleClick} disabled={!this.state.title||!this.state.content}>confirm</button><p/>
            <button id="preview-create-article-button">preiew</button><p/>
            <button id="write-create-article-button">write</button><p/>
        </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Create);
