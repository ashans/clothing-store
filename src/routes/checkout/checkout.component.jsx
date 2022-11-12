import React, {useContext} from "react";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import {CartContext} from "../../contexts/cart.context";
import "./checkout.styles.scss";

const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

const Checkout = () => {
    const {cartItems, totalValue} = useContext(CartContext);
    return (
        <div className="checkout-container">
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>
                <div className="header-block">
                    <span>Descrioption</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>
            {cartItems.map((cartItem) => (
                <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
            ))}
            <span className="total">Total : {formatter.format(totalValue)}</span>
        </div>
    );
};

export default Checkout;
