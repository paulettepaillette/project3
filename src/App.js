import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';


import './App.css';
import Product from './components/Product';
import HomePage from './components/HomePage.js';

class App extends Component {

  render() {


    return (
      <main>

        <h1>Hello enfin</h1>
        <a className="btn btn-primary" href="/home">Home trigger</a>


        <Switch>
          <Route exact path="/home" component={HomePage} />
          {/* <Route path="/products-details/:productId" component={Product} /> */}

        </Switch>

      </main>
    );
  }
}

export default App;
