import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';


import './App.css';
import Product from './components/Product';
import HomePage from './components/HomePage.js';
import ProductListWomen from './components/ProductListWomen';
import About from './components/About';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
import NotFound from './components/NotFound';

class App extends Component {

  render() {


    return (
      <main>

        <header id="header">
          <a href="/"><h1>Glasses</h1></a>
          <Navigation />

          {/* <nav>
            <a href="#0">WOMEN</a>
            <a href="#0">MEN</a>
            <a href="#0">ABOUT</a>
            <a href="#0">CONTACT</a>
          </nav> */}

        </header>


        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/products" component={ProductListWomen} />
          <Route path="/products/:productId" component={Product} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />

          <Route component={NotFound} />
        </Switch>

        <footer>
          <p>Made with 🕶 by Emmanuelle, Mohamed & Paulette</p>
        </footer>

      </main>
    );
  }
}

export default App;
