import React, { Component } from 'react';

import {Link, Switch, Route} from "react-router-dom";

import api from "../api"
import UserInfo from './UserInfos';
import Orders from './Orders';
import WishList from './WishList';

class MemberSpace extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentUser: "hello",
        }
    }

    componentDidMount() {
        // check with the backend to see if we are already logged in
        api.get("/checklogin")
          .then(response => {
            console.log("Check LOG IN 🤔", response.data);
            this.setState({currentUser : response.data.userDoc});
          })
          .catch(err => {
            console.log(err);
            alert("Sorry! There was a problem. 💩");
          });
      }
    
    render() { 
        console.log(this.props)
        const {currentUser} = this.state;
        console.log("this is current name", currentUser);
        const {match} = this.props;
        
        return ( 
        
            
            <div className="member-space-section" >
              <div className="head-banner">   
              </div>
              <nav className="navbar navbar-dark bg-primary mb-3">
                <div className="container">
                  <a className="navbar-brand" href="/">Membership space</a>
                </div>
              </nav>
              <div className="container">
                <div className="row">
                  <div className="col-5" >
                    <div className="list-group">
                      {/* <a class="list-group-item list-group-item-action" href="/user-info">Infos</a> */}
                      <Link className="list-group-item list-group-item-action" to={`${match.url}/user-info`} > Infos </Link>
                      <Link className="list-group-item list-group-item-action" to={`${match.url}/orders`} > Orders </Link>
                      <Link className="list-group-item list-group-item-action" to={`${match.url}/wish-list`} > WishLIst </Link>
                      
                    </div>
                  </div>
                  <div className="col-7" >
                <Switch>
                <Route  exact path={`${match.url}/user-info`}
                render={()=> <UserInfo currentUser={currentUser} /> } />
                 <Route  path={`${match.url}/orders`}
                render={()=> <Orders currentUser={currentUser} /> } />
                 <Route  path={`${match.url}/wish-list`}
                render={()=> <WishList currentUser={currentUser} /> } />
                </Switch>
                </div>
                </div>
                
              </div>
            </div>

       
       
        );
    }
}
 
export default MemberSpace;