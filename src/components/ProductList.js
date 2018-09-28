import React from 'react';
import api from "../api.js";

class ProductList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            productArray: []
        };
    }

    componentDidMount() {
        api.get("/products")
            .then(response => {
                this.setState({ productArray: response.data });
                console.log("let's see", response.data);
            })
            .catch(err => {
                console.log(err);
                alert("Sorry! Something went wrong!")
            });
    }



    render() {
        const { productArray } = this.state;
        const productList = productArray.map((oneProduct)=> {
            return <li key={oneProduct.id}>
                        <h2>{oneProduct.acf.product_title}</h2>
                        <img src={oneProduct.acf.product_image.url} />
                    </li>
        });
        console.log("this is it", productArray);

        return (
            <section className="product-list">
               {productList}
            </section>
        );

    }
}

export default ProductList;