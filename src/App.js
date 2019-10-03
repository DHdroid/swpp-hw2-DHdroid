import React from 'react';
import Login from './components/Login/Login';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import './App.css';
import ArticleList from './containers/ArticleList/ArticleList';
import Create from './containers/Create/Create';
import ArticleDetail from './containers/ArticleDetail/ArticleDetail';
import ArticleEdit from './containers/ArticleEdit/ArticleEdit';
import { connect } from 'react-redux';
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
function App(props) {
  window.onload = function() {
    props.onGetLogin();
  }
  console.log(props.iflogin)
  if(props.iflogin===false&&window.location.toString().split('/').pop()!=='login') {
    window.location = '/login';
  }
  else if(props.iflogin===true&&window.location.toString().split('/').pop()==='login') {
    window.location = '/articles';
  }
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path='/login' exact component={Login}/>
          <Redirect exact from='/' to='/login'/>
          <Route path='/articles' exact component={ArticleList}/>
          <Route path='/articles/create' exact component={Create}/>
          <Route path='/articles/:id' exact component={ArticleDetail}/>
          <Route path='/articles/:id/edit' exact component={ArticleEdit}/>
          <Route render={()=> window.location ='/'}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
