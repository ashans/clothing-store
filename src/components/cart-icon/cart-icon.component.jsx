import "./cart-icon.styles";

import React, {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import {CartIconContainer, ItemCount, ShoppingIcon} from "./cart-icon.styles";

const CartIcon = () => {
    const {setCartOpen, itemCount} = useContext(CartContext);

    const toggle = () => {
        setCartOpen((current) => !current);
    };
    return (
        <CartIconContainer onClick={toggle}>
            <ShoppingIcon className="shopping-icon"/>
            <ItemCount>{itemCount}</ItemCount>
        </CartIconContainer>
    );
};

export default CartIcon;
