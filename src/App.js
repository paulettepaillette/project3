import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      project: []
    }
  }

  componentDidMount() {
    let projectUrl = "http://localhost:8888/wp-json/wp/v2/project";
    fetch(projectUrl)
      .then(response => response.json())
      .then(response => {
        this.setState({ project: response })
      })
      .catch(err => console.log(err));
  }

  render() {
    let project = this.state.project.map((oneProject, index) => {
      return <li key={index}><img src={oneProject.acf.image.url} /></li>
    })

    return (
      <div className="App">
        {project}
      </div>
    );
  }
}

export default App;
