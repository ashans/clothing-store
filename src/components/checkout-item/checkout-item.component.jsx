import React from "react";
import "./checkout-item.styles.scss";
import {useDispatch, useSelector} from "react-redux";
import {selectCartState} from "../../store/cart/cart.selector";
import {addItemToCart, clearItemFromCart, removeItemFromCart} from "../../store/cart/cart.action";

const CheckoutItem = ({cartItem}) => {
    const dispatch = useDispatch();
    const {name, imageUrl, price, quantity} = cartItem;
    const {cartItems} = useSelector(selectCartState);
    const addItem = () => dispatch(addItemToCart(cartItems, cartItem))
    const removeItem = () => dispatch(removeItemFromCart(cartItems, cartItem))
    const clearItem = () => dispatch(clearItemFromCart(cartItems, cartItem))

    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={name}/>
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
        <div className="arrow" onClick={removeItem}>&#10094;</div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItem}>&#10095;</div>
      </span>
            <span className="price">{price}</span>
            <div className="remove-button" onClick={clearItem}>
                &#10005;
            </div>
        </div>
    );
};

export default CheckoutItem;
