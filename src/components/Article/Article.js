import React, {Component} from 'react';

class Article extends Component {
    render(){
        return(
            <div className="Article">
                <p/>
                <div>
                {this.props.number}
                <button>{this.props.title}</button>
                {this.props.name}
                </div>
            </div>
        );
    }
}
export default Article;