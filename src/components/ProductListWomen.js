import React from 'react';
import api from "../api.js";
import { Link } from "react-router-dom";



class ProductListWomen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            productArray: [],
            headBannerData: [],
            optical: false,
            sun: false,
            blue: false,
            green: false,
            purple:false,
            grey: false,
            metal: false,
            plastic: false,
            steel: false,
            selectedTypeCategories: [],
            selectedColorCategories: [],
            selectedShapeCategories: [],
            selectedMaterialCategories: [],
        };

        this.productArrayCopy = [];

    }

    componentDidMount() {
        //To retrieve products information and filter them to get only women products
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
        
        //To retrieve head-banner information
        api.get("/women-category")
            .then(response => {
                console.log("react category response", response.data)
                this.setState({ headBannerData: response.data })
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
            let { selectedTypeCategories, selectedColorCategories, selectedShapeCategories, selectedMaterialCategories } = this.state;
            let { optical, sun, blue, green, purple, grey, oval, round, square, metal, plastic, steel } = this.state;
            
            //Categories array retrieval for type categorie of the selected product
            if (dataset.filter === "type" && checked) {
                selectedTypeCategories.push(parseInt(value));
            } else if (dataset.filter === "type" && !checked) {
                selectedTypeCategories = selectedTypeCategories.filter(oneValue => oneValue !== parseInt(value));
                this.setState({selectedTypeCategories: selectedTypeCategories});
            }

            //Categories array retrieval for color categorie of the selected product
            if (dataset.filter === "color" && checked) {
                selectedColorCategories.push(parseInt(value));
            } else if (dataset.filter === "color" && !checked) {
                selectedColorCategories = selectedColorCategories.filter(oneValue => oneValue !== parseInt(value));
                this.setState({selectedColorCategories});
            }

            //Categories array retrieval for shape categorie of the selected product
            if (dataset.filter === "shape" && checked) {
                selectedShapeCategories.push(parseInt(value));
            } else if (dataset.filter === "shape" && !checked) {
                selectedShapeCategories = selectedShapeCategories.filter(oneValue => oneValue !== parseInt(value));
                this.setState({selectedShapeCategories});
            }

            //Categories array retrieval for shape categorie of the selected product
            if (dataset.filter === "material" && checked) {
                selectedMaterialCategories.push(parseInt(value));
            } else if (dataset.filter === "material" && !checked) {
                selectedMaterialCategories = selectedMaterialCategories.filter(oneValue => oneValue !== parseInt(value));
                this.setState({selectedMaterialCategories});
            }

            //So we get all the products when we unselect the categories
            let newProductArray = this.productArrayCopy;
            
            //Filter the products if a type category is selected with the array retrieved above
            if(optical || sun) {
                newProductArray = newProductArray.filter( oneProduct => {
                    return selectedTypeCategories.some(oneCat => oneProduct.categories.includes(oneCat))
                })                
            }

            //Filter the products if a colour category is selected with the array retrieved above
            if (blue || green || purple || grey) {
                newProductArray = newProductArray.filter( oneProduct => {
                    return selectedColorCategories.some(oneCat => oneProduct.categories.includes(oneCat))
                })                 
            }

            //Filter the products if a shape category is selected with the array retrieved above
            if (oval || round || square) {
                newProductArray = newProductArray.filter( oneProduct => {
                    return selectedShapeCategories.some(oneCat => oneProduct.categories.includes(oneCat))
                })                 
            }

            //Filter the products if a shape category is selected with the array retrieved above
            if (metal || plastic || steel) {
                newProductArray = newProductArray.filter( oneProduct => {
                    return selectedMaterialCategories.some(oneCat => oneProduct.categories.includes(oneCat))
                })                 
            }

            this.setState({productArray: newProductArray})
            
        }
        );

    }


    render() {
        const { optical, sun, blue, green, purple, grey, oval, round, square, metal, plastic, steel } = this.state;
        const { productArray, headBannerData } = this.state;

        //Map loop to display the products
        const productList = productArray.map((oneProduct) => {
            return <Link to={`/products/${oneProduct.id}`} key={oneProduct.id}>
                <li>
                <div className="product-list-item">
                    <img src={oneProduct.acf.product_image.url} alt={oneProduct.acf.product_title} />
                </div>
                <div className="product-list-overlay">
                    <h2>{oneProduct.acf.product_title}</h2>
                </div>
            </li>
            </Link>
        });

        //Map loop to display the head-banner info
        const headBanner = headBannerData.map(oneData => {
            const backgroundStyle = { backgroundImage: `url(${oneData.acf.head_banner_image.url})`};
            return  <div key= {oneData.id} style={backgroundStyle} className="head-banner">
                        <h1>{oneData.acf.head_banner_title}</h1>
                    </div>
        });

        //To display a message when the filters selected do not display a product
        let productResult;
        if (productArray.length > 0) { 
            productResult = (
            <ul className="product-list">
                {productList}
            </ul>)}
        else if (productArray.length === 0) { 
            productResult = (                
                <div className="no-result">               
                <p>Sorry, we don't have the product you're looking for</p>
                </div>)}

        return (
            <section className="product-list-page">
                {headBanner}
                <div className="container">
                    <div className="filter-list">

                        <div className="dropdown">
                            <div className="filter-item dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Type
                            </div>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <div className="dropdown-item">
                                    <input
                                    className="filter-input"
                                    type="checkbox"
                                    value= "6"
                                    onChange={event => this.handleEvent(event)}
                                    checked={optical}
                                    name="optical"
                                    data-filter="type" />
                                    Optical
                                </div>
                                

                                <div className="dropdown-item">
                                    <input
                                    className="filter-input"
                                    type="checkbox"
                                    value = "5"
                                    onChange={event => this.handleEvent(event)}
                                    checked={sun}
                                    name="sun"
                                    data-filter="type"
                                    />
                                    Sun Glasses
                                </div>
                            </div>
                        </div>


                        <div className="dropdown">
                            <div className="filter-item dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Color
                            </div>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <div className="dropdown-item">
                                    <input
                                    className="filter-input"
                                    type="checkbox"
                                    value = "7"
                                    onChange={event => this.handleEvent(event)}
                                    checked={blue}
                                    name="blue"
                                    data-filter="color"
                                    />
                                    Blue
                                </div>
                                <div className="dropdown-item">
                                    <input
                                    className="filter-input"
                                    type="checkbox"
                                    value= "9"
                                    onChange={event => this.handleEvent(event)}
                                    checked={green}
                                    name="green"
                                    data-filter="color"
                                    />
                                    Green
                                </div>
                                <div className="dropdown-item">
                                    <input
                                    className="filter-input"
                                    type="checkbox"
                                    value="10"
                                    onChange={event => this.handleEvent(event)}
                                    checked={grey}
                                    name="grey"
                                    data-filter="color"
                                    />
                                    Grey
                                </div>
                                <div className="dropdown-item">
                                    <input
                                    className="filter-input"
                                    type="checkbox"
                                    value="8"
                                    onChange={event => this.handleEvent(event)}
                                    checked={purple}
                                    name="purple"
                                    data-filter="color"
                                    />
                                    Purple
                                </div>
                            </div>
                        </div>
                        
                        <div className="dropdown">
                            <div className="filter-item dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Shape
                            </div>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <div className="dropdown-item">
                                    <input
                                    className="filter-input"
                                    type="checkbox"
                                    value = "11"
                                    onChange={event => this.handleEvent(event)}
                                    checked={oval}
                                    name="oval"
                                    data-filter="shape"
                                    />
                                    Oval
                                </div>
                                <div className="dropdown-item">
                                    <input
                                    className="filter-input"
                                    type="checkbox"
                                    value= "12"
                                    onChange={event => this.handleEvent(event)}
                                    checked={round}
                                    name="round"
                                    data-filter="shape"
                                    />
                                    Round
                                </div>
                                <div className="dropdown-item">
                                    <input
                                    className="filter-input"
                                    type="checkbox"
                                    value="13"
                                    onChange={event => this.handleEvent(event)}
                                    checked={square}
                                    name="square"
                                    data-filter="shape"
                                    />
                                    Square
                                </div>
                            </div>
                        </div>
                        <div className="dropdown">
                            <div className="filter-last-item dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Materials
                            </div>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <div className="dropdown-item">
                                    <input
                                    className="filter-input"
                                    type="checkbox"
                                    value= "15"
                                    onChange={event => this.handleEvent(event)}
                                    checked={metal}
                                    name="metal"
                                    data-filter="material"
                                    />
                                    Metal
                                </div>
                                <div className="dropdown-item">
                                    <input
                                    className="filter-input"
                                    type="checkbox"
                                    value="16"
                                    onChange={event => this.handleEvent(event)}
                                    checked={plastic}
                                    name="plastic"
                                    data-filter="material"
                                    />
                                    Plastic
                                </div>
                                <div className="dropdown-item">
                                    <input
                                    className="filter-input"
                                    type="checkbox"
                                    value="17"
                                    onChange={event => this.handleEvent(event)}
                                    checked={steel}
                                    name="steel"
                                    data-filter="material"
                                    />
                                    Steel
                                </div>
                            </div>
                        </div>
                    </div>
                 {productResult}
                </div>
            </section>
        );

    }
}



export default ProductListWomen;