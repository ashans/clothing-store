import React, {useContext} from "react";
import "./cart-dropdown.styles";
import Button from "../button/button.component";
import {CartContext} from "../../contexts/cart.context";
import CartItem from "../cart-item/cart-item.component";
import {useNavigate} from "react-router-dom";
import {CartDropdownContainer, CartItems, EmptyMessage} from "./cart-dropdown.styles";

const CartDropdown = () => {
    const {cartItems, setCartOpen} = useContext(CartContext);
    const navigate = useNavigate();

    const goCheckoutHandler = () => {
        navigate("/checkout");
        setCartOpen(false);
    };
    return (
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length ? (
                    cartItems.map((item) => (<CartItem key={item.id} cartItem={item}/>))
                ) : (
                    <EmptyMessage>Your cart is empty</EmptyMessage>
                )}

            </CartItems>
            <Button onClick={goCheckoutHandler}>Checkout</Button>
        </CartDropdownContainer>
    );
};

export default CartDropdown;
