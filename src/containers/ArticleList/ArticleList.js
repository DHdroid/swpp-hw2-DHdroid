import React, {Component} from 'react';
import Article from '../../components/Article/Article'
class ArticleList extends Component {
    state = {
        articles: [
            {
                id: 0,
                author_id: 1,
                title: "10 React JS Articles Every Web Developer Should Read",
                content: "Hello Guys, React or React JS is a JavaScript front-end library from Facebook which lets you create HTML based GUI. It makes the task easier by providing a component-based architecture which was only available to languages like Java and C# before."
            },
            {
                id: 0,
                author_id: 1,
                title: "10 React JS Articles Every Web Developer Should Read",
                content: "Hello Guys, React or React JS is a JavaScript front-end library from Facebook which lets you create HTML based GUI. It makes the task easier by providing a component-based architecture which was only available to languages like Java and C# before."
            }
        ]
    }
    render() {
        const articles = this.state.articles.map((ar)=>{
            return(<Article number={ar.id.toString()} title={ar.title} name={ar.author_id.toString()}/>);
        });
        return (
            <div className = "ArticleList">
                <h2>ArticleList</h2>
                <button id = "create-article-button">Create</button>
                <div className = "articles">{articles}</div>
            </div>
        );
    }
}
export default ArticleList;
