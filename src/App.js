import React from 'react';
import Login from './components/Login/Login';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import './App.css';
import ArticleList from './containers/ArticleList/ArticleList';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path='/' exact component={Login}/>
        <Route path='/articles' exact component={ArticleList}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
