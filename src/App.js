import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import api from "./api.js";

import './App.css';
import Product from './components/Product';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      project: []
    }
  }


  render() {

    return (
      <main>
        {project}

        <Switch>
          <Route path="/products-details/:productId" component={Product} />
        </Switch>

      </main>
    );
  }
}

export default App;
