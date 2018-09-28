import React from 'react';
// import api from "../api.js";

class Product extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            productData: {
                acf: {}
            }
        };
    }

    componentDidMount() {
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
        console.log("this is it", productData);

        return (
            <section className="product-details">
                <div className="headbanner">
                    test
                    {productData.acf.frame_text}
                </div>
                <div className="container">
                </div>
                <div className="technology">
                </div>
            </section>
        );

    }
}

export default Product;