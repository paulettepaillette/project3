import React, { Component } from 'react';

import { Link, Switch, Route } from "react-router-dom";

import api from "../api"
import UserInfo from './UserInfos';
import Orders from './Orders';
import WishList from './WishList';
import ProfileEdit from './ProfileEdit';

class MemberSpace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: "",
      headBannerData: [],
      isDataReceived: false,
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    // check with the backend to see if we are already logged in
    api.get("/checklogin")
      .then(response => {
        // console.log("Check LOG IN 🤔", response.data);
        this.setState({ currentUser: response.data.userDoc });
      })
      .catch(err => {
        console.log(err);
        alert("Sorry! There was a problem. 💩");
      });


    api.get("/member-space")
      .then(response => {
        console.log("react category response", response.data)
        this.setState({ headBannerData: response.data, isDataReceived: true })
      })
      .catch(err => {
        console.log(err);
        alert("Sorry! Something went wrong!")
      });



  }

  changeState() {
    api.get("/checklogin")
      .then(response => {
        // console.log("Check LOG IN from changestate🤔", response.data);
        this.setState({ currentUser: response.data.userDoc }, () => {
          this.setState({
            fullName: response.data.userDoc.fullName,
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
    const { currentUser, headBannerData, isDataReceived } = this.state;
    // console.log("this is current name", currentUser);
    const { match } = this.props;

    const headBanner = headBannerData.map(oneData => {
      const backgroundStyle = { backgroundImage: `url(${oneData.acf.head_banner.url})` };
      return <div key={oneData.id} style={backgroundStyle} className="head-banner">
        {/* <h1>{oneData.acf.head_banner_title}</h1> */}
      </div>
    });

    return (

      <React.Fragment>
        {isDataReceived ?
          (
            <div className="member-space-page" >
              {/* <div className="head-banner">   
              </div> */}
              {headBanner}

              <div className="member-space-section">
                <div className="container" >
                  <div className="member-space-section-wrapper">
                    <div className="list-of-choice" >
                      <div className="list-group">
                        {/* <a class="list-group-item list-group-item-action" href="/user-info">Infos</a> */}
                        <Link className="list-group-item list-group-item-action" to={`${match.url}`} > Infos </Link>
                        <Link className="list-group-item list-group-item-action" to={`${match.url}/edit-profile`} > Edit Your Profile </Link>
                        <Link className="list-group-item list-group-item-action" to={`${match.url}/wish-list`} > WishList </Link>
                        {/* <Link className="list-group-item list-group-item-action" to={`${match.url}/orders`} > Orders </Link> */}

                      </div>
                    </div>
                    <div className="choosen-component" >
                      <Switch>
                        <Route exact path={`${match.url}`}
                          render={() => <UserInfo currentUser={currentUser} />} />
                        <Route path={`${match.url}/orders`}
                          render={() => <Orders currentUser={currentUser} />} />
                        <Route path={`${match.url}/wish-list`}
                          render={() => <WishList currentUser={currentUser} />} />
                        <Route path={`${match.url}/edit-profile`}
                          render={() => <ProfileEdit changeState={() => this.changeState()} currentUser={currentUser} />} />
                        <Route
                          render={() => <h1>Morning sir</h1>} />
                      </Switch>
                    </div>
                  </div>
                </div>

              </div>
            </div>) : (
            <section className="loading-page">
              <div className="container loading-box">
                <h1 data-text="Prism">Prism</h1>
              </div>
            </section>
          )}

      </React.Fragment>



    );
  }
}


export default MemberSpace;