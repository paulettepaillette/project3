import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import api from "./api";

import './App.css';
import Product from './components/Product';
import HomePage from './components/HomePage.js';
import ProductListWomen from './components/ProductListWomen';
import About from './components/About';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
import NotFound from './components/NotFound';
import Account from './components/Account';
import MemberSpace from './components/MemberSpace';
import ProductListMen from './components/ProductListMen';

class TheApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: null
    }

  }


  componentDidMount() {
    // check with the backend to see if we are already logged in
    api.get("/checklogin")
      .then(response => {
        // console.log("Check LOG IN 🤔", response.data);
        // this.updateUser(response.data.userDoc);
      })
      .catch(err => {
        console.log(err);
        alert("Sorry! There was a problem. 💩");
      });
  }

  updateUser(userDoc) {
    this.setState({ currentUser: userDoc })
  }



  logoutClick() {
    api.delete("/logout")
      .then(() => {
        this.updateUser(null);
        // this.props.history.push("/")
      }

      )
      .catch(err => console.log(err))
  }



  render() {
    const { currentUser } = this.state;
    console.log(this.props.match)
    return (
      <main>

        <header id="header">
          <a href="/"><h1>Glasses</h1></a>
          <Navigation  currentUser={currentUser}
          onLogOutClick={() => this.logoutClick()} />
          
        </header>


        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/products-women" component={ProductListWomen} />
          <Route path="/products-men" component={ProductListMen} />
          <Route path="/products/:productId" component={Product} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />

          
          <Route path="/member-space"
            render={(props) => <MemberSpace match={props.match} currentUser={currentUser} />} />
          <Route path="/account"
            render={() => <Account currentUser={currentUser} onSignUp={(userDoc) => this.updateUser(userDoc)} onLogin={(userDoc) => this.updateUser(userDoc)} />} />
        
        <Route component={NotFound} />
        </Switch>

        <footer>
          <p>Made with 🕶 by Emmanuelle, Mohamed & Paulette</p>
        </footer>

      </main>
    );
  }
}

const App = withRouter(TheApp);
export default App;
