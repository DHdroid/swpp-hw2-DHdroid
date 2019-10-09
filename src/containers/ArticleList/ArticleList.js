import React, {Component} from 'react';
import Article from '../../components/Article/Article';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/action/index'
import Logout from '../../components/Logout/Logout'
const mapStateToProps = state => {
    return {
        storedArticles:state.ar.articles,
        storedUsers:state.ar.users
    };
}
const mapDispatchToProps = dispatch => {
    return {
        onGetAll: () => dispatch(actionCreators.getArticles()),
        onGetUser: () => dispatch(actionCreators.getUsers())
    }
}
class ArticleList extends Component {
    componentDidMount() {
        this.props.onGetAll();
        this.props.onGetUser();
    }
    render() {
        const articles = this.props.storedArticles.map((ar)=>{
            let names = 'no name';
            this.props.storedUsers.forEach(element => {
                if(element.id === ar.author_id)
                {
                    names = element.name;
                }
            });
            return(<Article number={ar.id.toString()} title={ar.title} name={names}/>);
        });
        return (
            <div className = "ArticleList" align='center'>
                <Logout/>
                <h1>ArticleList</h1>
                <table border = "1" className = "articles">{articles}</table>
                <p><button id = "create-article-button" onClick = {()=>{window.location.assign('/articles/create')}}>Create</button></p>
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
