import React from 'react';
import api from "../api.js";



class ProductListWomen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            productArray: [],
            optical: false,
            sun: false,
            blue: false,
            green: false,
            purple:false,
            grey: false,
            selectedTypeCategories: [],
            selectedColorCategories: [],
            selectedShapeCategories: [],
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
            })
            .catch(err => {
                console.log(err);
                alert("Sorry! Something went wrong!")
            });
    }

    handleEvent(event) {
        console.log(event.target);
        const { name, checked, value, dataset } = event.target;
        this.setState({ [name]: checked }, () => {
            let { selectedTypeCategories, selectedColorCategories, selectedShapeCategories} = this.state;
            let { optical, sun, blue, green, purple, grey, oval, round, square } = this.state;
            
            //Récupération de l'array des catégories du pdt sélectionné pour type
            if (dataset.filter === "type" && checked) {
                selectedTypeCategories.push(parseInt(value));
            } else if (dataset.filter === "type" && !checked) {
                selectedTypeCategories = selectedTypeCategories.filter(oneValue => oneValue !== parseInt(value));
                this.setState({selectedTypeCategories: selectedTypeCategories});
            }

            //Récupération de l'array des catégories du pdt sélectionné pour Couleur
            if (dataset.filter === "color" && checked) {
                selectedColorCategories.push(parseInt(value));
            } else if (dataset.filter === "color" && !checked) {
                selectedColorCategories = selectedColorCategories.filter(oneValue => oneValue !== parseInt(value));
                this.setState({selectedColorCategories});
            }

            //Récupération de l'array des catégories du pdt sélectionné pour Shape
            if (dataset.filter === "shape" && checked) {
                selectedShapeCategories.push(parseInt(value));
            } else if (dataset.filter === "shape" && !checked) {
                selectedShapeCategories = selectedShapeCategories.filter(oneValue => oneValue !== parseInt(value));
                this.setState({selectedShapeCategories});
            }

            
            let newProductArray = this.productArrayCopy;
            
            if(optical || sun) {
                newProductArray = newProductArray.filter( oneProduct => {
                    return selectedTypeCategories.some(oneCat => oneProduct.categories.includes(oneCat))
                })                
            }

            if (blue || green || purple || grey) {
                newProductArray = newProductArray.filter( oneProduct => {
                    return selectedColorCategories.some(oneCat => oneProduct.categories.includes(oneCat))
                })                 
            }

            if (oval || round || square) {
                newProductArray = newProductArray.filter( oneProduct => {
                    return selectedShapeCategories.some(oneCat => oneProduct.categories.includes(oneCat))
                })                 
            }

            this.setState({productArray: newProductArray})
            
        }
        );

    }


    render() {
        // console.log("copy:", this.productArrayCopy);
        const { productArray, optical, sun, blue, green, purple, grey, oval, round, square } = this.state;
        const productList = productArray.map((oneProduct) => {

            return <li key={oneProduct.id}>
                <div className="product-list-item">
                    <img src={oneProduct.acf.product_image.url} />
                </div>
                <div className="product-list-overlay">
                    <h2>{oneProduct.acf.product_title}</h2>
                </div>
            </li>
        });
        // console.log("this is it", productArray);

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
                                    value= "6"
                                    onChange={event => this.handleEvent(event)}
                                    checked={optical}
                                    name="optical"
                                    data-filter="type" />
                                    Optical
                                </li>

                                <li><input
                                    type="checkbox"
                                    value = "5"
                                    onChange={event => this.handleEvent(event)}
                                    checked={sun}
                                    name="sun"
                                    data-filter="type"
                                    />
                                    Sun Glasses
                                </li>
                            </ul>
                        </li>

                        <li>Color
                            <ul>
                                <li><input
                                    type="checkbox"
                                    value = "7"
                                    onChange={event => this.handleEvent(event)}
                                    checked={blue}
                                    name="blue"
                                    data-filter="color"
                                    />
                                    Blue
                                </li>
                                <li><input
                                    type="checkbox"
                                    value= "9"
                                    onChange={event => this.handleEvent(event)}
                                    checked={green}
                                    name="green"
                                    data-filter="color"
                                    />
                                    Green
                                </li>
                                <li><input
                                    type="checkbox"
                                    value="10"
                                    onChange={event => this.handleEvent(event)}
                                    checked={grey}
                                    name="grey"
                                    data-filter="color"
                                    />
                                    Grey
                                </li>
                                <li><input
                                    type="checkbox"
                                    value="8"
                                    onChange={event => this.handleEvent(event)}
                                    checked={purple}
                                    name="purple"
                                    data-filter="color"
                                    />
                                    Purple
                                </li>
                            </ul>
                        </li>
                        <li>Shape
                            <ul>
                                <li><input
                                    type="checkbox"
                                    value = "11"
                                    onChange={event => this.handleEvent(event)}
                                    checked={oval}
                                    name="oval"
                                    data-filter="shape"
                                    />
                                    Oval
                                </li>
                                <li><input
                                    type="checkbox"
                                    value= "12"
                                    onChange={event => this.handleEvent(event)}
                                    checked={round}
                                    name="round"
                                    data-filter="shape"
                                    />
                                    Round
                                </li>
                                <li><input
                                    type="checkbox"
                                    value="13"
                                    onChange={event => this.handleEvent(event)}
                                    checked={square}
                                    name="square"
                                    data-filter="shape"
                                    />
                                    Square
                                </li>
                            </ul>
                        </li>
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