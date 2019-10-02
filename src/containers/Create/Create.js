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
        content:"",
        write:true
    }
    thandleChange = (t) => {
        this.setState ({
            ...this.state,
            title: t.target.value
        })
    }
    chandleChange = (c) => {
        this.setState ({
            ...this.state,
            content: c.target.value
        })
    }
    previewhandleClick = (c) => {
        this.setState({
            ...this.state,
            write:false
        })
    }
    bhandleClick = () => {
        window.location = '/articles'
    }
    chandleClick = () => {
        this.props.onPostArticle({title:this.state.title, content:this.state.content, author_id:1})
        window.location = '/articles'
    }
    writehandleClick = (c) => {
        this.setState({
            ...this.state,
            write:true
        })
    }
    
    render() {
        let inputtitle = <span><p>Title</p><textarea id="article-title-input" onChange={this.thandleChange}>{this.state.title}</textarea></span>;
        let inputcontent = <span><p>Content</p><textarea id="article-content-input" onChange={this.chandleChange}>{this.state.content}</textarea></span>
        let view = () => {
            if(this.state.write) {
                return(
                    <span>
                        {inputtitle}
                        {inputcontent}
                    </span>
                );
            }
            else {
                return(
                    <table align='center' border='1'>
                    <tr><td align = 'center' width = '800'><h2>Software Lover</h2></td></tr>
                    <tr><td align = 'center' width = '800'><h1>{this.state.title}</h1></td></tr>
                    <tr><td width = '800' align = 'center'><h3>{this.state.content}</h3></td></tr>
                    </table>
                );
            }
        }
        console.log(this.state)
        return (
        <div className="Create">
            {view()}
            <p></p><button id="back-create-article-button" onClick={this.bhandleClick  }>back</button><p/>
            <button id="confirm-create-article-button" disabled ={!this.state.title||!this.state.content} onClick={this.chandleClick} disabled={!this.state.title||!this.state.content}>confirm</button><p/>
            <button id="preview-create-article-button" disabled ={!this.state.title||!this.state.content} onClick={this.previewhandleClick}>preiew</button><p/>
            <button id="write-create-article-button" onClick={this.writehandleClick}>write</button><p/>
        </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Create);
