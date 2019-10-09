import React, {Component} from 'react';

class Article extends Component {
    bhandleClick = () => {
        window.location.assign('/articles/'+ this.props.number.toString());
    }
    render(){
        return(
            <tr className="Article">
                <td width='50' align='center'>{this.props.number}</td>
                <td width='800' align='center'><button onClick={this.bhandleClick}>{this.props.title}</button></td>
                <td width='150' align='center'>{this.props.name}</td>
            </tr>
        );
    }
}
export default Article;