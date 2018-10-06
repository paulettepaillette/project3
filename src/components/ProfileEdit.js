import React, { Component } from 'react';

import { Redirect } from "react-router-dom";

import api from "../api";

class ProfileEdit extends Component {
    constructor(props){
        super(props)

        this.state = {
            currentUser:"",
            fullName: "", 
            email: "" , 
            originalPassword: "",
            isSubmitSuccess: false
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
    // updatePassword(event){
    //     const {value } = event.target;
    //     this.setState({originalPassword: value})
    // }
    componentDidMount() {
        // check with the backend to see if we are already logged in
        // api.get("/checklogin")
        //   .then(response => {
        //     // console.log("Check LOG IN 🤔", response.data);
        //     this.setState({currentUser : response.data.userDoc},()=>{
        //         this.setState({fullName: response.data.userDoc.fullName,
        //             email: response.data.userDoc.email,
        //             originalPassword: response.data.userDoc.originalPassword,
        //         })
        //     });
        //   })
        //   .catch(err => {
        //     console.log(err);
        //     alert("Sorry! There was a problem. 💩");
        //   });


        //we set the state of the component from props
        const {currentUser} = this.props;
        this.setState({currentUser : currentUser},()=>{
                    this.setState({fullName: currentUser.fullName,
                        email: currentUser.email,
                        originalPassword: currentUser.originalPassword,
                    })
      })
    }

      handleSubmit(event) {
        event.preventDefault();
        
    
        // PUT and POST requests receive a 2nd argument: the data to submit
        // (here we are submitting the state we've gathered in the form)
        api.put("/edit-user", this.state)
          .then(() => {
            const {changeState} = this.props;
            changeState();
            this.setState({ isSubmitSuccess: true });
            //when we submit the form we set the state isSubmitSuccess to true in order to redirect 
            // to the memberspace infos once we click the edit button
            //we call changestate() from props to change the state of the memberSpace component 
            //in order to see the updated state directly when we redirect
            })
          
          .catch(err => {
            console.log(err);
            alert("Sorry! Something went wrong. 💩");
          });

         

      }

    render() { 

        const { fullName, email, originalPassword, loginEmail, loginOriginalPassword, contactData, isSubmitSuccess } = this.state;
        const {currentUser} = this.props;
        

        if (isSubmitSuccess) {
            
            return <Redirect to="/member-space" />
          }


        return ( 

            <div>
                <h3>Edit your profile :</h3>
                <br/>
                <form onSubmit={event=>this.handleSubmit(event)} >
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
                                <button type="submit" className="btn btn-primary" >Change</button>
                            </form>
            </div>
         );
    }
}
 


export default ProfileEdit;