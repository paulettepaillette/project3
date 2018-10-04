import React, { Component } from 'react';

import api from "../api";

class WishList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wishListArray: []
        }
    }

    componentDidMount() {
        const { currentUser } = this.props;
        const wishListArray = currentUser.wishList;

        api.put("/wish-list-products", {wishListArray} )
          .then(response => {
            // console.log("wishlistarray response:",response)
            this.setState({ wishListArray: response.data })
            })
          
          .catch(err => {
            console.log(err);
            alert("Sorry! Something went wrong. 💩");
          });


        // 
    }

    render() {

        const { wishListArray } = this.state;
        // console.log("outside table:", wishListArray);

        return (
            <div>
                <table className="table">
                    <thead></thead>
                    <tbody>
                        {wishListArray.map((oneProduct, index) => {
                            return (
                                <tr key={index}>
                                    <td> {oneProduct.id}</td>
                                    <td> <img width="100px" src={oneProduct.acf.product_image.url} alt={oneProduct.acf.product_image.alt}/> </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default WishList;


