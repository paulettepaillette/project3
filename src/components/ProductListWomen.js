import React from 'react';
import api from "../api.js";



class ProductListWomen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            productArray: [],
            optical: false,
            sun: false,
        };
        this.productArrayCopy = [];

    }

    componentDidMount() {
        api.get("/products")
            .then(response => {
                const filteredArray = response.data.filter(oneProduct => {
                    return oneProduct.categories.includes(3);
                });
                this.productArrayCopy = [...filteredArray]
                this.setState({ productArray: filteredArray });
                console.log("let's see", response.data);
                console.log("copy after mount", this.productArrayCopy)
            })
            .catch(err => {
                console.log(err);
                alert("Sorry! Something went wrong!")
            });
    }

    handleEvent(event) {
        console.log(event.target);
        const { name, checked } = event.target;
        this.setState({ [name]: checked }, () => {
            console.log("optical:", this.state.optical)
            console.log("sun:", this.state.sun)
            if (this.state.optical) {
                const typeArray = this.state.productArray.filter(oneProduct => {
                    console.log(this.productArrayCopy);
                    return oneProduct.categories.includes(6)
                })
                this.setState({ productArray: typeArray })
            }  
            // else if (!this.state.optical) {
            //     this.setState({ productArray: this.productArrayCopy })
            // }
            
            else if (this.state.sun) {
                const typeArray = this.state.productArray.filter(oneProduct => {
                    console.log(this.productArrayCopy);
                    return oneProduct.categories.includes(5)
                })
                this.setState({ productArray: typeArray })
            } 
            // else if (!this.state.sun) {
            //     this.setState({ productArray: this.productArrayCopy })
            // }
            else {
                this.setState({ productArray: this.productArrayCopy })
            }
        }


        );

    }


    render() {
        console.log("copy:", this.productArrayCopy);
        const { productArray, optical, sun } = this.state;
        const productList = productArray.map((oneProduct) => {
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
                        <li>Type
                            <ul>
                                <li><input
                                    type="checkbox"
                                    onChange={event => this.handleEvent(event)}
                                    checked={optical}
                                    name="optical" />
                                    Optical
                                </li>

                                <li><input
                                    type="checkbox"
                                    onChange={event => this.handleEvent(event)}
                                    checked={sun}
                                    name="sun" />
                                    Sun Glasses
                                </li>

                            </ul>
                        </li>

                        <li>Color</li>
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



export default ProductListWomen;