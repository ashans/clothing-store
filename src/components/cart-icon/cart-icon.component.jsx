import "./cart-icon.styles";

import React from "react";
import {CartIconContainer, ItemCount, ShoppingIcon} from "./cart-icon.styles";
import {useDispatch, useSelector} from "react-redux";
import {selectCartOpen, selectCartState} from "../../store/cart/cart.selector";
import {setCartOpen} from "../../store/cart/cart.action";

const CartIcon = () => {
    const dispatch = useDispatch();
    const {itemCount} = useSelector(selectCartState);
    const cartOpen = useSelector(selectCartOpen)

    const toggle = () => {
        dispatch(setCartOpen(!cartOpen))
    };
    return (
        <CartIconContainer onClick={toggle}>
            <ShoppingIcon className="shopping-icon"/>
            <ItemCount>{itemCount}</ItemCount>
        </CartIconContainer>
    );
};

export default CartIcon;
