import React, { Component } from 'react';

import SimpleMap from './SimpleMap';

import api from "../api";

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contactData: [],
            fullName: "",
            email: "",
            message: "",
            feedbackMessage: "",
            isDataReceived: false,
        }
    }


    componentDidMount() {

        api.get("/contact")
            .then(response => {
                console.log("react response", response.data)
                this.setState({ contactData: response.data, isDataReceived: true })
            })
    }

    updateName(event) {
        const { value } = event.target;
        this.setState({ fullName: value });
    }

    updateEmail(event) {
        const { value } = event.target;
        this.setState({ email: value });
    }

    updateMessage(event) {
        const { value } = event.target;
        this.setState({ message: value });
    }

    handleSubmit(event) {
        event.preventDefault();
        api.post("/send-email", this.state)
            .then((info) => {
                console.log(info)
                this.setState({ feedbackMessage: "Your message has been sent" })
            })
            .catch(err =>
                console.log("HandleSubmit pb", err)
            )
    }

    render() {
        const { contactData, fullName, email, message, feedbackMessage, isDataReceived } = this.state;


        return (

            <React.Fragment>
                {isDataReceived ?
                    (<ReactCSSTransitionGroup
                        transitionName="example"
                        transitionAppear={true}
                        transitionAppearTimeout={500}
                        transitionEnter={false}
                        transitionLeave={false}>
                        <section className="contact-page">

                            {contactData.map(oneData =>
                                <div key={oneData.id} className="contact-wrapper">

                                    <div style={{ backgroundImage: `url(${oneData.acf.head_banner_image.url})` }} className="head-banner">
                                        <h1>{oneData.acf.head_banner_title}</h1>
                                    </div>

                                    <div className="container">

                                        <div className="form-section">
                                            <div className="form-image">
                                                <img src={oneData.acf.form_image.url} height="400px" alt={oneData.acf.form_image.alt} />
                                            </div>


                                            <form onSubmit={event => this.handleSubmit(event)}>

                                                {feedbackMessage &&
                                                    <p className="success-message">{feedbackMessage}</p>
                                                }

                                                <div className="form-group">
                                                    <label htmlFor="exampleInputName">NAME</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="exampleInputEmail1"
                                                        aria-describedby="emailHelp"
                                                        value={fullName}
                                                        onChange={event => this.updateName(event)} />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">EMAIL</label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        id="exampleInputEmail1"
                                                        aria-describedby="emailHelp"
                                                        value={email}
                                                        onChange={event => this.updateEmail(event)} />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="exampleFormControlTextarea1">MESSAGE</label>
                                                    <textarea
                                                        className="form-control"
                                                        id="exampleFormControlTextarea1"
                                                        rows="3"
                                                        value={message}
                                                        onChange={event => this.updateMessage(event)}></textarea>
                                                </div>

                                                <button type="submit" className="btn btn-primary">SEND</button>
                                            </form>

                                        </div>


                                    </div>

                                    <div className="shop-section">
                                        <div className="map-section">
                                            <SimpleMap contactData={contactData} />
                                        </div>

                                        <div className="text">
                                            <h2>{oneData.acf.shop_section_title}</h2>
                                            <h3>{oneData.acf.shop_section_subtitle_1}</h3>
                                            <div dangerouslySetInnerHTML={{ __html: oneData.acf.shop_section_text_1 }} />
                                            <h3>{oneData.acf.shop_section_subtitle_2}</h3>
                                            <div dangerouslySetInnerHTML={{ __html: oneData.acf.shop_section_text_2 }} />
                                        </div>

                                        <div className="image">
                                            <img src={oneData.acf.shop_section_image.url} alt={oneData.acf.shop_section_image.alt} height="500px" />
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

export default Contact;