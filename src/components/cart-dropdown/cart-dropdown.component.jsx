import React, {useCallback} from "react";
import "./cart-dropdown.styles";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import {useNavigate} from "react-router-dom";
import {CartDropdownContainer, CartItems, EmptyMessage} from "./cart-dropdown.styles";
import {useDispatch, useSelector} from "react-redux";
import {selectCartState} from "../../store/cart/cart.selector";
import {setCartOpen} from "../../store/cart/cart.action";

const CartDropdown = () => {
    const dispatch = useDispatch();
    const {cartItems} = useSelector(selectCartState);
    const navigate = useNavigate();

    const goCheckoutHandler = useCallback(() => {
        navigate("/checkout");
        dispatch(setCartOpen(false));
    }, [navigate()]);
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
