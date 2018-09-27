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

  componentDidMount() {
    let projectUrl = "http://dev.paulettepaulette.com/admin/wp-json/wp/v2/project";
    fetch(projectUrl)
      .then(response => response.json())
      .then(response => {
        this.setState({ project: response })
      })
      .catch(err => console.log(err));
  }

  render() {
    let project = this.state.project.map((oneProject, index) => {
      return <li key={index}><img src={oneProject.acf.custom_image.url} /></li>
    })

    return (
      <main>
        {project}

        <Switch>
          <Route path="/products-details/:productId" component={Product} />
          <Route component={NotFound} />
        </Switch>

      </main>
    );
  }
}

export default App;
