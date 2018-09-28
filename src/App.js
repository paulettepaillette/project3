import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';


import './App.css';
import Product from './components/Product';
import HomePage from './components/HomePage.js';
import ProductList from './components/ProductList';

class App extends Component {

  render() {


    return (
      <main>

        <h1>Hello enfin</h1>
        <a href="/home">Home trigger</a>


        <Switch>
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/products" component={ProductList} />
          <Route path="/products/:productId" component={Product} />
        </Switch>

      </main>
    );
  }
}

export default App;
