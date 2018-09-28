import React, { Component } from 'react';
import axios from "axios";


class About extends Component {
    constructor(props) {
        super(props);

        this.state = {
            aboutData: []
        }
    }

    componentDidMount() {
        axios.get("http://dev.paulettepaulette.com/admin/wp-json/wp/v2/about_us")

            .then(response => {
                console.log("react response", response.data)
                this.setState({ aboutData: response.data })
            })
    }

    render() {

        const { aboutData } = this.state;


        return (
            <section className="about-page">

                {aboutData.map(oneData =>
                    <div key={oneData.acf.id}>

                        <div className="head-banner">
                            <h1>{oneData.acf.head_banner_title}</h1>
                        </div>

                        <div className="container">

                            <div className="our-misssion">
                                <img src={oneData.acf.our_mission_image.url} />
                                <div className="text">
                                    <h2>{oneData.acf.our_mission_title}</h2>
                                    <p>{oneData.acf.our_mission_text}</p>
                                </div>
                            </div>

                            <div className="our-technology">
                                <div className="text">
                                    <h2>{oneData.acf.our_technology_title}</h2>
                                    <p>{oneData.acf.our_technology_text}</p>
                                </div>
                                <img src={oneData.acf.our_technology_image.url} />
                            </div>

                            <div className="video">
                                <iframe width="420" height="315"
                                    src={oneData.acf.video} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen>
                                </iframe>
                            </div>

                        </div>

                    </div>
                )}
            </section>
        );
    }
}

export default About;