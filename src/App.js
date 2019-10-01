import React from 'react';
import Login from './components/Login/Login';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import './App.css';
import ArticleList from './containers/ArticleList/ArticleList';
import Create from './containers/Create/Create';
import ArticleDetail from './containers/ArticleDetail/ArticleDetail';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path='/' exact component={Login}/>
          <Route path='/articles' exact component={ArticleList}/>
          <Route path='/articles/create' exact component={Create}/>
          <Route path='/articles/:id' exact component={ArticleDetail}/>
          
          <Route render={()=> <div><h1>404</h1><p/><h2>Not Found</h2></div>}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
