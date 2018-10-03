import React from 'react';
import api from "../api.js";
import { Link } from "react-router-dom";

class Product extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            productData: {
                acf: {
                    product_image:{},
                    tech_section_image:{},
                    image_banner:{},
                }
            }
        };
    }

    componentDidMount() {
        window.scrollTo(0,0);
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
    }



    render() {
        const { productData } = this.state;
        // console.log("this is it", productData);
        const backgroundStyle = { backgroundImage: `url(${productData.acf.image_banner.url})`};

        return (
            <section className="product-details">
                <div style={backgroundStyle} className="head-banner"></div>
                <div className="product-section">
                    <div className="product-main-info">
                        <img src = {productData.acf.product_image.url} alt="Product image"/>
                        <div>
                            <h1>{productData.acf.product_title}</h1>
                            <p>{productData.acf.price} €</p>
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
                    <div className= "tech-section-text">
                        <h2>{productData.acf.tech_section_title}</h2>
                        <p>{productData.acf.tech_section_text}</p>
                        <Link to="/about" className="btn" >Learn more</Link>
                    </div>
                    <img src = {productData.acf.tech_section_image.url} />
                </div>
            </section>
        );

    }
}

export default Product;