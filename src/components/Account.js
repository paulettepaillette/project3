import React, { Component } from 'react';

import  { Redirect } from 'react-router-dom'

import api from "../api.js"

class Accout extends Component {
    constructor(props){
        super(props)

        this.state = {
            fullName: "", 
            email: "" , 
            originalPassword: "",
            loginEmail:"",
            loginOriginalPassword: "",
            contactData: [],
            headBannerData: [],
            isDataReceived: false,

        }
    }
    updateName(event){
        const {value } = event.target;
        this.setState({fullName: value})
    }
    updateEmail(event){
        const {value } = event.target;
        this.setState({email: value})
    }
    updatePassword(event){
        const {value } = event.target;
        this.setState({originalPassword: value})
    }
    updateLoginPassword(event){
        const {value } = event.target;
        this.setState({loginOriginalPassword: value})
    }
    
    updateLoginEmail(event){
        const {value } = event.target;
        this.setState({loginEmail: value})
    }

    handleSignUpSubmit(event){
        event.preventDefault();
        api.post("/signup", this.state)
        .then(response => {
            console.log("Sign up",response.data)
            const {onSignUp} = this.props;
            onSignUp(response.data.userDoc);

        }
        )
        .catch(err=> console.log(err))
    }

    handleLoginSubmit(event){
        event.preventDefault();
        const  email = this.state.loginEmail ;
        const  originalPassword = this.state.loginOriginalPassword;
        api.post("/login", {email, originalPassword})
        .then(response => {
            console.log("Login up",response.data)
            const {onLogin} = this.props;
            onLogin(response.data.userDoc);
            this.setState({originalPassword: ""})
            this.setState({email: ""})

        }
        )
        .catch(err=> console.log(err))
    }

    componentDidMount() {

        // api.get("/contact")
        //     .then(response => {
        //         console.log("react response", response.data)
        //         this.setState({ contactData: response.data })
        //     })
        api.get("/account")
            .then(response => {
                console.log("react category response", response.data)
                this.setState({ headBannerData: response.data, isDataReceived: true })
            })
            .catch(err => {
                console.log(err);
                alert("Sorry! Something went wrong!")
            });
    }



    render() { 
        const { fullName, email, originalPassword, loginEmail, loginOriginalPassword, contactData, headBannerData, isDataReceived } = this.state;
        const {currentUser} = this.props;

        // console.log("current user: ",currentUser);
        const headBanner = headBannerData.map(oneData => {
            const backgroundStyle = { backgroundImage: `url(${oneData.acf.head_banner.url})`};
            return  <div key= {oneData.id} style={backgroundStyle} className="head-banner">
                        {/* <h1>{oneData.acf.head_banner_title}</h1> */}
                    </div>
        });


        
        if(currentUser){
            return (
                <Redirect to='/member-space'  />
            )
        }


        return ( 


            <React.Fragment>
            { isDataReceived ? 
           ( <section className="account-section">
                {/* <div className="head-banner">   
                </div> */}
                {headBanner}
                <div className="account-section-wrapper container" >
                    <div className="sign-up form-group">
                        <h3>Sign Up</h3>
                        <form onSubmit={event=>this.handleSignUpSubmit(event)} >
                            <label >
                                Full name
                                <input type="text" 
                                className="form-control"
                                onChange={event => this.updateName(event)}  
                                value={fullName} placeholder="hey you" />
                            </label>
                            <label >
                            Email
                            <input type="email" 
                            className="form-control"
                            onChange={event => this.updateEmail(event)}  
                            value={email} placeholder="your email" />
                            </label>
                            <label >
                                Password
                                 <input type="password" 
                                 className="form-control"
                                onChange={event => this.updatePassword(event)} 
                                value={originalPassword} placeholder="your password"/>
                            </label>
                            <br/>
                            <button type="submit" className="btn btn-primary" >Sign Up</button>
                        </form>
                    </div>
                    <div className="log-in form-group">
                        <h3>Login</h3>
                        <form onSubmit={event=>this.handleLoginSubmit(event)} >
                            
                            <label >
                            Email
                            <input type="email"
                            className="form-control" 
                            onChange={event => this.updateLoginEmail(event)}  
                            value={loginEmail} placeholder="your email" />
                            </label>
                            <label >
                                Password
                                <input type="password" 
                                className="form-control"
                                onChange={event => this.updateLoginPassword(event)} 
                                value={loginOriginalPassword} placeholder="your password"/>
                            </label>
                            <br/>
                            <button type="submit" className="btn btn-primary" >Login</button>
                        </form>
                    </div>
                </div>
            </section>):( 
                <section className="loading-page">
                    <div className="container loading-box">
                        <img src="./images/loader.png" />
                        <p>Loading...</p>
                    </div>
                </section>
            )} 

            </React.Fragment>
          );
    }
}
 
export default Accout;