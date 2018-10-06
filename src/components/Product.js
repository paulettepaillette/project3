import React from 'react';
import api from "../api.js";
import { Link, Redirect } from "react-router-dom";

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Product extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            productData: {
                acf: {
                    product_image: {},
                    tech_section_image: {},
                    image_banner: {},
                }
            },
            currentUser: {
                wishList: [],
            },
            isInWishLIst: false,
            isDataReceived: false,
            redirection: false
        };
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        const { params } = this.props.match;
        api.get(`/products/${params.productId}`)
            .then(response => {
                this.setState({ productData: response.data, isDataReceived: true }, () => {
                    api.get("/checklogin")
                        .then(response => {
                            // console.log("Check LOG IN 🤔", response.data);
                            this.setState({ currentUser: response.data.userDoc }, () => {
                                if (!this.state.currentUser) {
                                    return;
                                }
                                //wishList array contains ids of liked products
                                // if the product id is in the wish list we show a filled heart (else an empty heart)
                                // we do that using the isInwishlist from state
                                //and if we click on the heart we add or remove the id from the wishlist array using  
                                // addToWishlist() or removeFromWishlist() functions
                                let wishList = this.state.currentUser.wishList;
                                let id = this.state.productData.id;
                                if (wishList.includes(id.toString())) {
                                    this.setState({ isInWishLIst: true })
                                }

                            });
                            // console.log("current user:", this.state.currentUser);
                        })
                        .catch(err => {
                            console.log(err);
                            alert("Sorry! There was a problem. 💩");
                        });
                });
            })
            .catch(err => {
                console.log(err);
                alert("Sorry! Something went wrong!")
            });
        // check with the backend to see if we are already logged in

    }
    redirectToAccount() {
        this.setState({ redirection: true })

    }


    addToWishlist() {
        const userId = this.state.currentUser._id;
        const productId = this.state.productData.id;

        api.post("/add-to-wish-list", { userId, productId })
            .then(() => {
                this.setState({ isInWishLIst: true });
            }
            )
            .catch(err => console.log(err))
    }
    removeFromWishlist() {
        const userId = this.state.currentUser._id;
        const productId = this.state.productData.id;

        api.post("/remove-from-wish-list", { userId, productId })
            .then(() => {
                this.setState({ isInWishLIst: false });
            }
            )
            .catch(err => console.log(err))
    }

    render() {
        const { productData, isInWishLIst, currentUser, isDataReceived, redirection } = this.state;
        const backgroundStyle = { backgroundImage: `url(${productData.acf.image_banner.url})` };

        if (redirection) {
            //redirection is when a user click on the heart next to a product but is not connected
            //redirection sends the user to signup/login page
            return (
                <Redirect to='/account' />
            )
        }



        return (
            <React.Fragment>
                {isDataReceived ?
                    (<ReactCSSTransitionGroup
                        transitionName="example"
                        transitionAppear={true}
                        transitionAppearTimeout={500}
                        transitionEnter={false}
                        transitionLeave={false}>
                        <section className="product-details">
                            <div style={backgroundStyle} className="head-banner"></div>
                            <div className="product-section">
                                <div className="product-main-info">
                                    <img src={productData.acf.product_image.url} alt="Product image" />
                                    <div className="product-infos">
                                        <div className="text">
                                            <h1>{productData.acf.product_title}</h1>
                                            <p>{productData.acf.price} €</p>
                                        </div>
                                        <div className="heart-section">
                                            {currentUser ? (isInWishLIst ?
                                                <i className="fas fa-heart" onClick={() => this.removeFromWishlist()} >  </i> :
                                                <i className="far fa-heart" onClick={() => this.addToWishlist()} >  </i>) :
                                                (<i className="far fa-heart" onClick={() => this.redirectToAccount()} ></i>)
                                            }
                                        </div>
                                    </div>
                                </div>

                                <h3>DESCRIPTION</h3>
                                <div className="product-other-info">
                                    <div className="details">
                                        <h4>FRAME</h4>
                                        <p>{productData.acf.frame_text}</p>
                                    </div>
                                    <div className="details">
                                        <h4>LENS</h4>
                                        <p>{productData.acf.lens_text}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="tech-section">
                                <div className="tech-section-text">
                                    <h2>{productData.acf.tech_section_title}</h2>
                                    <p>{productData.acf.tech_section_text}</p>
                                    <Link to="/about" className="btn" >Learn more</Link>
                                </div>
                                <img src={productData.acf.tech_section_image.url} />
                            </div>
                        </section></ReactCSSTransitionGroup>)
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

export default Product;