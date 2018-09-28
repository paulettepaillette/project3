import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';


import './App.css';
import Product from './components/Product';
import HomePage from './components/HomePage.js';
import ProductList from './components/ProductList';
import About from './components/About';
import Contact from './components/Contact';

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
          <Route exact path="/" component={HomePage} />
          <Route exact path="/products" component={ProductList} />
          <Route path="/products/:productId" component={Product} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
        </Switch>

        <footer>
          <p>Made with 🕶 by Emmanuelle, Mohamed & Paulette</p>
        </footer>

      </main>
    );
  }
}

export default App;
