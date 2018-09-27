import React, { Component } from 'react';

import api from "../api.js"

class HomePage extends Component {
    constructor(props){
        super(props);

        this.state = {
            homeData: []
        }
    }

    componentDidMount() {
        api.get("/home-page")
        .then(response => {
            console.log("react response",response.data)
        this.setState({ homeData: response.data })
        })
    }


    render() { 

let homeData = this.state.homeData.map((oneData, index) => {
return <li key={index}> <h1> {oneData.acf.slider_image_1.title }</h1> </li>
});


        return ( 
            <div>
            {homeData}
            <h2>
                 hey
            </h2>
            </div>
         );
    }
}
 
export default HomePage;