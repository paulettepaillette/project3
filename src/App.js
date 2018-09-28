import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';


import './App.css';
import Product from './components/Product';
import HomePage from './components/HomePage.js';
import About from './components/About';

class App extends Component {

  render() {


    return (
      <main>

        <header>
          <a href="/home"><h1>Glasses</h1></a>

          <nav>
            <a href="#0">WOMEN</a>
            <a href="#0">MEN</a>
            <a href="#0">ABOUT</a>
            <a href="#0">CONTACT</a>
          </nav>

        </header>


        <Switch>
          <Route exact path="/home" component={HomePage} />
          <Route path="/products-details/:productId" component={Product} />
          <Route path="/about" component={About} />
        </Switch>

        <footer>
          <p>Made with 🕶 by Emmanuelle, Mohamed & Paulette</p>
        </footer>

      </main>
    );
  }
}

export default App;
