import React from 'react';
import api from "../api.js";
import { Link } from "react-router-dom";



class ProductListMen extends React.Component {
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
            isDataReceived: false,
        };

        this.productArrayCopy = [];

    }

    componentDidMount() {
        window.scrollTo(0, 0);
        //To retrieve products information and filter them to get only men products
        api.get("/products")
            .then(response => {
                const filteredArray = response.data.filter(oneProduct => {
                    return oneProduct.categories.includes(4);
                });
                this.productArrayCopy = [...filteredArray]
                this.setState({ productArray: filteredArray, isDataReceived: true });
            })
            .catch(err => {
                console.log(err);
                alert("Sorry! Something went wrong!")
            });
        
        //To retrieve head-banner information
        api.get("/men-category")
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
                selectedTypeCategories.push(parseInt(value, 10));
            } else if (dataset.filter === "type" && !checked) {
                selectedTypeCategories = selectedTypeCategories.filter(oneValue => oneValue !== parseInt(value, 10));
                this.setState({selectedTypeCategories: selectedTypeCategories});
            }

            //Categories array retrieval for color categorie of the selected product
            if (dataset.filter === "color" && checked) {
                selectedColorCategories.push(parseInt(value, 10));
            } else if (dataset.filter === "color" && !checked) {
                selectedColorCategories = selectedColorCategories.filter(oneValue => oneValue !== parseInt(value, 10));
                this.setState({selectedColorCategories});
            }

            //Categories array retrieval for shape categorie of the selected product
            if (dataset.filter === "shape" && checked) {
                selectedShapeCategories.push(parseInt(value, 10));
            } else if (dataset.filter === "shape" && !checked) {
                selectedShapeCategories = selectedShapeCategories.filter(oneValue => oneValue !== parseInt(value, 10));
                this.setState({selectedShapeCategories});
            }

            //Categories array retrieval for shape categorie of the selected product
            if (dataset.filter === "material" && checked) {
                selectedMaterialCategories.push(parseInt(value, 10));
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


    filterClass(isChecked) {
        if (isChecked) {
            return "filter-selected";
        }

        return "";
    }


    render() {
        const { optical, sun, blue, green, purple, grey, oval, round, square, metal, plastic, steel } = this.state;
        const { productArray, headBannerData, isDataReceived } = this.state;


        //Map loop to display the products
        const productList = productArray.map((oneProduct) => {
            return <Link to={`/products/${oneProduct.id}`} key={oneProduct.id}>
                <li>
                <div className="product-list-item">
                    <img src={oneProduct.acf.product_image.url} alt={oneProduct.acf.product_title}/>
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
        else if ( isDataReceived && productArray.length === 0) { 
            productResult = (
            <div className="no-result">               
            <p>Sorry, we don't have the product you're looking for</p>
            </div>)}

        return (
            
            <React.Fragment>
            {/* Conditional operator for the loader */}
            { isDataReceived ? 
            (<section className="product-list-page">
                {headBanner}
                <div className="container">
                    <div className="filter-list">

                        <div className="dropdown">
                            <div className="filter-item" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <p>Type</p>
                                <img src="/images/filter-arrow.svg" />
                            </div>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <label className={`dropdown-item ${this.filterClass(optical)}`}>
                                    <input
                                    className="filter-input"
                                    type="checkbox"
                                    value= "6"
                                    onChange={event => this.handleEvent(event)}
                                    checked={optical}
                                    name="optical"
                                    data-filter="type" />
                                    Optical
                                </label>
                                

                                <label className={`dropdown-item ${this.filterClass(sun)}`}>
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
                                </label>
                            </div>
                        </div>


                        <div className="dropdown">
                            <div className="filter-item" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <p>Color</p>
                                <img src="/images/filter-arrow.svg" />
                            </div>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <label className={`dropdown-item ${this.filterClass(blue)}`}>
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
                                </label>
                                <label className={`dropdown-item ${this.filterClass(green)}`}>
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
                                </label>
                                <label className={`dropdown-item ${this.filterClass(grey)}`}>
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
                                </label>
                                <label className={`dropdown-item ${this.filterClass(purple)}`}>
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
                                </label>
                            </div>
                        </div>
                        
                        <div className="dropdown">
                            <div className="filter-item" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <p>Shape</p>
                                <img src="/images/filter-arrow.svg" />
                            </div>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <label className={`dropdown-item ${this.filterClass(oval)}`}>
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
                                </label>
                                <label className={`dropdown-item ${this.filterClass(round)}`}>
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
                                </label>
                                <label className={`dropdown-item ${this.filterClass(square)}`}>
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
                                </label>
                            </div>
                        </div>
                        <div className="dropdown">
                            <div className="filter-last-item" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <p>Materials</p>
                                <img src="/images/filter-arrow.svg" />
                            </div>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <label className={`dropdown-item ${this.filterClass(metal)}`}>
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
                                </label>
                                <label className={`dropdown-item ${this.filterClass(plastic)}`}>
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
                                </label>
                                <label className={`dropdown-item ${this.filterClass(steel)}`}>
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
                                </label>
                            </div>
                        </div>
                    </div>
                    {productResult}
                </div>
                </section>) 
            : ( 
                <section className="loading-page">
                    <div className="container loading-box">
                    <img src="./images/loader.png" />
                    <p>Loading...</p>
                    </div>
                </section>
              ) 
            } 
            </React.Fragment>
            
        );

    }
}



export default ProductListMen;