import Login from './components/Login/Login';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import './App.css';
import ArticleList from './containers/ArticleList/ArticleList';
import Create from './containers/Create/Create';
import ArticleDetail from './containers/ArticleDetail/ArticleDetail';
import ArticleEdit from './containers/ArticleEdit/ArticleEdit';
import { connect } from 'react-redux';
import React, {Component} from 'react';
import * as actionCreators from './store/action/index'
const mapStateToProps = state => {
  return {
      iflogin:state.lr.login
  };
}
const mapDispatchToProps = dispatch => {
  return {
      onGetLogin: () => dispatch(actionCreators.getlogin())
  }
}
class App extends Component {
  componentDidMount() {
    this.props.onGetLogin();
  }
  render(){
    //console.log(this.props.iflogin);
    if(this.props.iflogin===false&&window.location.toString().split('/').pop()!=='login') {
      window.location.assign('/login'); 
    }
    else if(this.props.iflogin===true&&window.location.toString().split('/').pop()==='login') {
      window.location.assign('/articles');
    }
    return (
      <BrowserRouter history={this.props.history}>
        <div className="App">
          <Switch>
            <Route path='/login' exact component={Login}/>
            <Redirect exact from='/' to='/login'/>
            <Route path='/articles' exact component={ArticleList}/>
            <Route path='/articles/create' exact component={Create}/>
            <Route path='/articles/:id' exact component={ArticleDetail}/>
            <Route path='/articles/:id/edit' exact component={ArticleEdit}/>
            <Route path='/'/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
