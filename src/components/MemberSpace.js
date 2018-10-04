import React, { Component } from 'react';

import {Link, Switch, Route} from "react-router-dom";

import api from "../api"
import UserInfo from './UserInfos';
import Orders from './Orders';
import WishList from './WishList';
import ProfileEdit from './ProfileEdit';

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
            // console.log("Check LOG IN 🤔", response.data);
            this.setState({currentUser : response.data.userDoc});
          })
          .catch(err => {
            console.log(err);
            alert("Sorry! There was a problem. 💩");
          });
      }

      changeState(){
        api.get("/checklogin")
          .then(response => {
            // console.log("Check LOG IN from changestate🤔", response.data);
            this.setState({currentUser : response.data.userDoc},()=>{
                this.setState({fullName: response.data.userDoc.fullName,
                    email: response.data.userDoc.email,
                    originalPassword: response.data.userDoc.originalPassword,
                })
            });
          })
          .catch(err => {
            console.log(err);
            alert("Sorry! There was a problem. 💩");
          });
      }
    
    render() { 
        // console.log(this.props)
        const {currentUser} = this.state;
        // console.log("this is current name", currentUser);
        const {match} = this.props;
        
        return ( 
        
            
            <div className="member-space-page" >
              <div className="head-banner">   
              </div>
              
              <div className="member-space-section">
                <div className="container" >
                  <div className="member-space-section-wrapper">
                    <div className="list-of-choice" >
                      <div className="list-group">
                        {/* <a class="list-group-item list-group-item-action" href="/user-info">Infos</a> */}
                        <Link className="list-group-item list-group-item-action" to={`${match.url}/user-info`} > Infos </Link>
                        <Link className="list-group-item list-group-item-action" to={`${match.url}/orders`} > Orders </Link>
                        <Link className="list-group-item list-group-item-action" to={`${match.url}/wish-list`} > WishLIst </Link>
                        <Link className="list-group-item list-group-item-action" to={`${match.url}/edit-profile`} > Edit Your Profile </Link>
                        
                      </div>
                    </div>
                    <div className="choosen-component" >
                      <Switch>
                      <Route  exact path={`${match.url}/user-info`}
                      render={()=> <UserInfo currentUser={currentUser} /> } />
                      <Route  path={`${match.url}/orders`}
                      render={()=> <Orders currentUser={currentUser} /> } />
                      <Route  path={`${match.url}/wish-list`}
                      render={()=> <WishList currentUser={currentUser} /> } />
                      <Route  path={`${match.url}/edit-profile`}
                      render={()=> <ProfileEdit changeState={()=>this.changeState()}  currentUser={currentUser} /> } />
                      <Route 
                      render={()=> <h1>Morning sir</h1> } />
                      </Switch>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>

       
       
        );
    }
}


export default MemberSpace;