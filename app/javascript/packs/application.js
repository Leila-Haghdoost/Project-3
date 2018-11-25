/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

// console.log('Hello World from Webpacker')
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import MovieDetail from './components/MovieDetail';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';


// Load router here!

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('app');
  ReactDOM.render(<Router>
    <div>
      <Route exact path="/" component={App}/>
      <Route exact path="/movie/:movieId" component={MovieDetail}/>
    </div>
  </Router>, container);
})
