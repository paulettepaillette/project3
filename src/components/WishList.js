import React, { Component } from 'react';

import { Link } from "react-router-dom";

import api from "../api";

class WishList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wishListArray: [],
            isDataReceived: false
        }
    }

    componentDidMount() {
        const { currentUser } = this.props;
        const wishListArray = currentUser.wishList;

        api.put("/wish-list-products", { wishListArray })
            .then(response => {
                // console.log("wishlistarray response:",response)
                this.setState({ wishListArray: response.data, isDataReceived: true })
            })

            .catch(err => {
                console.log(err);
                alert("Sorry! Something went wrong. 💩");
            });


        // 
    }

    render() {

        const { wishListArray, isDataReceived } = this.state;
        // console.log("outside table:", wishListArray);

        return (

            <React.Fragment>
                {isDataReceived ?
                    (
                        <div>
                            <h3>Your wish list</h3>
                            <br />
                            <table className="table">
                                <thead>
                                </thead>
                                <tbody>
                                    {wishListArray.map((oneProduct, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <Link to={`/products/${oneProduct.id}`} key={oneProduct.id}>
                                                        <p  className="wishlist-product-link" style={{ textAlign: "center" }} > {oneProduct.acf.product_title}</p>
                                                    </Link>
                                                </td>
                                                <td style={{ textAlign: "center" }} > {oneProduct.acf.price} $ </td>
                                                <td style={{ textAlign: "center" }}> <img width="100px" src={oneProduct.acf.product_image.url} alt={oneProduct.acf.product_image.alt} /> </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>) : (
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

export default WishList;


