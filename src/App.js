import React from 'react';
import Login from './components/Login/Login';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import './App.css';
import ArticleList from './containers/ArticleList/ArticleList';
import Create from './containers/Create/Create';
import ArticleDetail from './containers/ArticleDetail/ArticleDetail';
import ArticleEdit from './containers/ArticleEdit/ArticleEdit';

function App() {
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
          <Route render={()=> <div><h1>404</h1><p/><h2>Not Found</h2></div>}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
