import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Login';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter , Route, Link, Switch } from 'react-router-dom';
ReactDOM.render(
  <BrowserRouter>
    <Switch>
    
      <Route path="/login" exact component={Login} />
      <Route path="/"  component={App} />
    </Switch>

    {/* <App /> */}
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
