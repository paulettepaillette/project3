import React, { Component } from 'react';
import axios from "axios";


class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contactData: [],
            fullName: "",
            email: "",
            message: "",
        }
    }

    componentDidMount() {
        axios.get("http://dev.paulettepaulette.com/admin/wp-json/wp/v2/contact_us")

            .then(response => {
                console.log("react response", response.data)
                this.setState({ contactData: response.data })
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

    }



    render() {
        const { contactData, fullName, email, message } = this.state;

        return (

            <section className="contact-page">

                {contactData.map(oneData =>
                    <div key={oneData.id}>

                        <div className="head-banner">
                            <h1>{oneData.acf.head_banner_title}</h1>
                        </div>

                        <div className="container">

                            <div className="form-section">
                                <div className="form-image">
                                    <img src={oneData.acf.form_image.url} height="400px" />
                                </div>

                                <form onSubmit={event => this.handleSubmit(event)}>

                                    <div className="form-group">
                                        <label htmlFor="exampleInputName">NAME</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            placeholder="Your Name"
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
                                            placeholder="Your email"
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
                            <div className="map">
                                <img src="http://dev.paulettepaulette.com/admin/wp-content/uploads/2018/09/map.jpg" />
                            </div>

                            <div className="text">
                                <h2>{oneData.acf.shop_section_title}</h2>
                                <h3>{oneData.acf.shop_section_subtitle_1}</h3>
                                <div>{oneData.acf.shop_section_text_1}</div>
                                <h3>{oneData.acf.shop_section_subtitle_2}</h3>
                                <div>{oneData.acf.shop_section_text_2}</div>
                            </div>

                            <div className="image">
                                <img src={oneData.acf.shop_section_image.url} alt={oneData.acf.shop_section_image.alt} height="500px" />
                            </div>

                        </div>

                    </div>
                )}
            </section>

        );
    }
}

export default Contact;