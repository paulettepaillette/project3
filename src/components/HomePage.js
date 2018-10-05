import React, { Component } from 'react';

import SimpleMap from './SimpleMap';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { Parallax } from 'react-scroll-parallax';

import api from "../api.js";

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            homeData: [],
            contactData: [],
            isDataReceived: false,
        };
    }

    componentDidMount() {
        api.get("/home-page")
            .then(response => {
                // console.log("react response", response.data)
                this.setState({ homeData: response.data, isDataReceived: true })
                this.setState({ contactData: response.data })
            })
    }

    sliderStyle(styleValue) {
        if (styleValue === "Dark Text") {
            return "slider-dark-text"
        }
        else if (styleValue === "Light Text") {
            return "slider-light-text"
        }
        return "";
    }

    render() {

        let { homeData, contactData, isDataReceived } = this.state

        // console.log(homeData)
        return (

            <React.Fragment>

                {isDataReceived ?
                    (
                        <ReactCSSTransitionGroup
                        transitionName="example"
                        transitionAppear={true}
                        transitionAppearTimeout={500}
                        transitionEnter={false}
                        transitionLeave={false}>
                    <section className="home-page">

                        {homeData.map((oneEl, index) => {
                            return (
                                <div key={index} className="home-wrapper">

                                    <section className="hero-section">
                                        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                                            <div className="carousel-inner">
                                                <div className="carousel-item active">
                                                    <img className="d-block w-100" src={oneEl.acf.slider_image_1.url} alt={oneEl.acf.slider_image_1.alt} />
                                                    <div id={`${this.sliderStyle(oneEl.acf.slider_text_color_1)}`} className="carousel-caption d-none d-md-block">
                                                        <h1 dangerouslySetInnerHTML={{ __html: oneEl.acf.slider_titre_1 }} />
                                                        <p dangerouslySetInnerHTML={{ __html: oneEl.acf.slider_text_1 }} />
                                                        <a className="btn" href={oneEl.acf.slider_button_1.url}> {oneEl.acf.slider_button_1.title}</a>
                                                    </div>

                                                </div>
                                                <div className="carousel-item">
                                                    <img className="d-block w-100" src={oneEl.acf.slider_image_2.url} alt={oneEl.acf.slider_image_2.alt} />
                                                    <div id={`${this.sliderStyle(oneEl.acf.slider_text_color_2)}`} className="carousel-caption d-none d-md-block">
                                                        <h1 dangerouslySetInnerHTML={{ __html: oneEl.acf.slider_titre_2 }} />
                                                        <p dangerouslySetInnerHTML={{ __html: oneEl.acf.slider_text_2 }} />
                                                        <a className="btn" href={oneEl.acf.slider_button_2.url}> {oneEl.acf.slider_button_2.title}</a>
                                                    </div>
                                                </div>
                                                <div className="carousel-item">
                                                    <img className="d-block w-100" src={oneEl.acf.slider_image_3.url} alt={oneEl.acf.slider_image_3.alt} />
                                                    <div id={`${this.sliderStyle(oneEl.acf.slider_text_color_3)}`} className="carousel-caption d-none d-md-block">
                                                        <h1 dangerouslySetInnerHTML={{ __html: oneEl.acf.slider_titre_3 }} />
                                                        <p dangerouslySetInnerHTML={{ __html: oneEl.acf.slider_text_3 }} />
                                                        <a className="btn" href={oneEl.acf.slider_button_3.url} > {oneEl.acf.slider_button_3.title}  </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span className="sr-only">Previous</span>
                                            </a>
                                            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span className="sr-only">Next</span>
                                            </a>

                                        </div>
                                    </section>

                                    <section className="news-section" >
                                        <div className="news-section-top">
                                            <div className="news-container">
                                                <span>{oneEl.acf.news_section_intro}</span>
                                                <img src="./images/cross.svg" alt="cross" height="12px" />
                                                <h2>{oneEl.acf.news_section_title}</h2>
                                                <div dangerouslySetInnerHTML={{ __html: oneEl.acf.news_section_text }} />
                                                <div>
                                                    <a className="btn" href={oneEl.acf.news_section_button_1.url}> {oneEl.acf.news_section_button_1.title}</a>
                                                    <a className="btn" href={oneEl.acf.news_section_button_2.url}> {oneEl.acf.news_section_button_2.title}</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="news-section-down">
                                            <div className="container">
                                                <div className="news-section-down-wrapper">
                                                    <div>
                                                        <Parallax
                                                            className="custom-class"
                                                            offsetYMax={10}
                                                            offsetYMin={-10}
                                                            slowerScrollRate
                                                            tag="figure"
                                                            > 
                                                            <img src={oneEl.acf.news_section_image_1.url} alt={oneEl.acf.news_section_image_1.alt} />
                                                        <h2> {oneEl.acf.news_section_title_2} </h2>
                                                        <div className="text" dangerouslySetInnerHTML={{ __html: oneEl.acf.news_section_text_2 }} />
                                                        </Parallax>
                                                    </div>
                                                    <div className="image">
                                                        <Parallax
                                                            className="custom-classe"
                                                            offsetYMax={10}
                                                            offsetYMin={-10}
                                                            slowerScrollRate
                                                            tag="figure"
                                                            > 
                                                            <img src={oneEl.acf.news_section_image_2.url} alt={oneEl.acf.news_section_image_2.alt} />
                                                        </Parallax>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    <section>
                                        <div className="tech-section">
                                            <div className="tech-section-text">
                                                <h2>{oneEl.acf.tech_section_title}</h2>
                                                <p>{oneEl.acf.tech_section_text}</p>
                                                <a to="/about" >Learn more</a>
                                            </div>
                                            <img src={oneEl.acf.tech_section_image.url} alt={oneEl.acf.tech_section_image.alt} />
                                        </div>
                                    </section>
                                    <section className="brand-section">
                                        <div className="brand-section-wrapper  container" >
                                            <img src={oneEl.acf.brand_section_image_1.url} alt={oneEl.acf.brand_section_image_1.alt} height="40px" />
                                            <img src={oneEl.acf.brand_section_image_2.url} alt={oneEl.acf.brand_section_image_2.alt} height="40px" />
                                            <img src={oneEl.acf.brand_section_image_3.url} alt={oneEl.acf.brand_section_image_3.alt} height="32px" />
                                            <img src={oneEl.acf.brand_section_image_4.url} alt={oneEl.acf.brand_section_image_4.alt} height="32px" />
                                        </div>
                                    </section>

                                    <section className="shop-section">

                                        <div className="map-section">
                                            <SimpleMap contactData={contactData} />
                                        </div>

                                        <div className="text">
                                            <h2>{oneEl.acf.shop_section_title}</h2>
                                            <h3>{oneEl.acf.shop_section_subtitle_1}</h3>
                                            <div dangerouslySetInnerHTML={{ __html: oneEl.acf.shop_section_text_1 }} />
                                            <h3>{oneEl.acf.shop_section_subtitle_2}</h3>
                                            <div dangerouslySetInnerHTML={{ __html: oneEl.acf.shop_section_text_2 }} />
                                        </div>

                                        <div className="image">
                                            <img src={oneEl.acf.shop_section_image.url} alt={oneEl.acf.shop_section_image.alt} height="600px" />
                                        </div>

                                    </section>

                                </div>
                            )
                        })

                        }
                        {/*  */}


                    </section>
                    </ReactCSSTransitionGroup>)
                    : (
                        <section className="loading-page">
                            <div className="container loading-box">
                                <img src="./images/loader.png" alt="loader" />
                                <p>Loading...</p>
                            </div>
                        </section>
                    )
                }
            </React.Fragment>

        );
    }
}

export default HomePage;