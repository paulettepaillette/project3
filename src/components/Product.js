import React from 'react';
import api from "../api.js";
import { Link } from "react-router-dom";

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
            currentUser: "",
            isInWishLIst: false
        };
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        const { params } = this.props.match;
        api.get(`/products/${params.productId}`)
            .then(response => {
                console.log("inside didmount", response.data)
                this.setState({ productData: response.data });
            })
            .catch(err => {
                console.log(err);
                alert("Sorry! Something went wrong!")
            });
        // check with the backend to see if we are already logged in
        api.get("/checklogin")
            .then(response => {
                // console.log("Check LOG IN 🤔", response.data);
                this.setState({ currentUser: response.data.userDoc }, () => {

                    //   let wishList =  this.state.currentUser.wishList;
                    //   console.log(wishList);
                    //   let id = this.state.productData.id;
                    //   console.log(id);
                    //     if(wishList.includes(id))
                    //     {
                    //         console.log("yes it is")
                    //         this.setState({isInWishLIst: true})
                    //     }

                });
                console.log("current user:", this.state.currentUser);
            })
            .catch(err => {
                console.log(err);
                alert("Sorry! There was a problem. 💩");
            });
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

    render() {
        const { productData, isInWishLIst } = this.state;
        console.log("this is it", productData);
        console.log("is it in wish list ?", isInWishLIst)

        // console.log("this is it", productData);
        const backgroundStyle = { backgroundImage: `url(${productData.acf.image_banner.url})` };

        return (
            <section className="product-details">
                <div style={backgroundStyle} className="head-banner"></div>
                <div className="product-section">
                    <div className="product-main-info">
                        <img src={productData.acf.product_image.url} alt="Product image" />
                        <div>
                            <h1>{productData.acf.product_title}</h1>
                            <p>{productData.acf.price} €</p>

                            <i className="far fa-heart" onClick={() => this.addToWishlist()} >  </i>
                            {/* <button  onClick={()=>this.addToWishlist()} > </button> */}
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
            </section>
        );

    }
}

export default Product;