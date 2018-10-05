import React, { Component } from 'react';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { Parallax } from 'react-scroll-parallax';

import api from "../api"

class About extends Component {
    constructor(props) {
        super(props);

        this.state = {
            aboutData: [],
            isDataReceived: false,
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        // axios.get("http://dev.paulettepaulette.com/admin/wp-json/wp/v2/about_us")
        api.get("/about")
            .then(response => {
                console.log("react response", response.data)
                this.setState({ aboutData: response.data, isDataReceived: true })
            })
    }

    render() {

        const { aboutData, isDataReceived } = this.state;


        return (

            <React.Fragment>
                {isDataReceived ?
                    (<ReactCSSTransitionGroup
                        transitionName="example"
                        transitionAppear={true}
                        transitionAppearTimeout={500}
                        transitionEnter={false}
                        transitionLeave={false}>

                        <section className="about-page">
                            {aboutData.map(oneData =>
                                <div key={oneData.id} className="about-wrapper">
                                    <div style={{ backgroundImage: `url(${oneData.acf.head_banner_image.url})` }} className="head-banner">
                                        <h1>{oneData.acf.head_banner_title}</h1>
                                    </div>

                                    <div className="container">

                                        <div className="our-misssion">
                                            <Parallax
                                                className="custom-class"
                                                // offsetXMax={10}
                                                // offsetXMin={-10}
                                                offsetYMax={10}
                                                offsetYMin={-10}
                                                slowerScrollRate
                                                tag="figure"
                                                >   
                                            <img src={oneData.acf.our_mission_image.url} alt={oneData.acf.our_mission_image.alt} />
                                            </Parallax>
                                            <div className="text">

                                                <h2>{oneData.acf.our_mission_title}</h2>
                                                <div dangerouslySetInnerHTML={{ __html: oneData.acf.our_mission_text }} />
                                            </div>
                                        </div>


                                        <div className="our-technology">
                                            <div className="text">
                                                <h2>{oneData.acf.our_technology_title}</h2>
                                                <div dangerouslySetInnerHTML={{ __html: oneData.acf.our_technology_text }} />
                                            </div>
                                            
                                        <img src={oneData.acf.our_technology_image.url} alt={oneData.acf.our_technology_image.alt} />
                                        
                                        </div>

                                        <div className="video">
                                            <iframe width="1000" height="500"
                                                src={oneData.acf.video} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen>
                                            </iframe>
                                        </div>
                                        
                                    </div>

                                    </div>


                            )}
                        </section>
                    </ReactCSSTransitionGroup>)
                    : (
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

export default About;