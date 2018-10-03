import React, { Component } from 'react';


class WishList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tablewishList: []
        }
    }

    componentDidMount() {
        const { currentUser } = this.props;
        let tablewishList = [];
        // let array = currentUser.wishList;
        // console.log(currentUser.wishList);
        // tablewishList.push(currentUser.wishList);
        // tablewishList = [...array];
        console.log("inside mount:", currentUser.wishList)

        this.setState({ tablewishList: tablewishList })
    }

    render() {

        const { tablewishList } = this.state;
        console.log("outside table:", tablewishList);

        return (
            <div>
                <table className="table">
                    <thead></thead>
                    <tbody>
                        <tr>
                            <td>Hello from wishlist </td>
                        </tr>
                        {tablewishList.map((oneProduct, index) => {
                            return (
                                <tr>
                                    <td> {oneProduct}</td>
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


