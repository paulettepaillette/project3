import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import api from "./api";

import './App.css';
import Product from './components/Product';
import HomePage from './components/HomePage.js';
import ProductListWomen from './components/ProductListWomen';
import About from './components/About';
import Contact from './components/Contact';
import Account from './components/Account';
import MemberSpace from './components/MemberSpace';

class TheApp extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      currentUser: null
    }

  }


  componentDidMount() {
    // check with the backend to see if we are already logged in
    api.get("/checklogin")
      .then(response => {
        console.log("Check LOG IN 🤔", response.data);
        this.updateUser(response.data.userDoc);
      })
      .catch(err => {
        console.log(err);
        alert("Sorry! There was a problem. 💩");
      });
  }

  updateUser(userDoc){
    this.setState({currentUser: userDoc})
  }



  logoutClick(){
    api.delete("/logout")
    .then(()=>{
      this.updateUser(null);
      this.props.history.push("/")
    }
      
    )
    .catch(err => console.log(err))
  }



  render() {
    const {currentUser} = this.state;

    return (
      <main>

        <header>
          <a href="/"><h1>Glasses</h1></a>

          <nav>
          {currentUser && (
            <a >
            <b>Hello {currentUser.fullName}</b>
            <a href="#0" onClick={()=>this.logoutClick()} >LOG OUT</a>
            </a>
          ) }
            <a href="#0">WOMEN</a>
            <a href="#0">MEN</a>
            <a href="#0">ABOUT</a>
            <a href="#0">CONTACT</a>
            <a href="/account">ACCOUNT</a>
          </nav>

        </header>


        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/products" component={ProductListWomen} />
          <Route path="/products/:productId" component={Product} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/member-space"  
          render={(props)=> <MemberSpace match={props.match} currentUser={currentUser}/> } />
          <Route path="/account"  
        render={()=> <Account currentUser={currentUser} onSignUp={(userDoc)=>this.updateUser(userDoc)} onLogin={(userDoc)=>this.updateUser(userDoc)}  />} />
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
