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
            // const backgroundStyle = {
            //     backgroundImage:`url(${oneProduct.acf.product_image.url})`,
            // };
            return <li key={oneProduct.id}>
                        <div className="product-list-item">
                            <img src={oneProduct.acf.product_image.url} />
                        </div>
                        <div className="product-list-overlay">
                            <h2>{oneProduct.acf.product_title}</h2>
                        </div>
                    </li>
        });
        console.log("this is it", productArray);

        return (
            <section className="product-list-page">
                <div className="head-banner">
                <h1>Category</h1>
                </div>
                <div className="container">
                    <ul className="filter-list">
                        <li>Type</li>
                        <li>Colour</li>
                        <li>Shape</li>
                        <li>Materials</li>
                    </ul>
                    <ul className="product-list">
                        {productList}
                    </ul>
                </div>
            </section>
        );

    }
}



export default ProductList;