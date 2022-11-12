import React, { useContext } from "react";
import "./cart-dropdown.styles.scss";
import Button from "../button/button.component";
import { CartContext } from "../../contexts/cart.context";
import CartItem from "../cart-item/cart-item.component";
import { useNavigate } from "react-router-dom";

const CartDropdown = () => {
  const { cartItems, setCartOpen } = useContext(CartContext);
  const navigate = useNavigate();

  const goCheckoutHandler = () => {
    navigate("/checkout");
    setCartOpen(false);
  };
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button onClick={goCheckoutHandler}>Checkout</Button>
    </div>
  );
};

export default CartDropdown;
