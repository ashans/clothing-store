import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
  cartOpen: false,
  setCartOpen: () => null,
  cartItems: [],
  addItemToCart: () => null,
  itemCount: 0,
});

export const CartProvider = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const count = cartItems
      .map((item) => item.quantity)
      .reduce((total, q) => total + q, 0);

    setItemCount(count);
  }, [cartItems]);

  const addItemToCart = (product) => {
    setCartItems(() => {
      const matching = cartItems.find((item) => item.id === product.id);

      if (!matching) {
        return [
          ...cartItems,
          {
            ...product,
            quantity: 1,
          },
        ];
      }
      matching.quantity = matching.quantity + 1;
      return [...cartItems];
    });
  };
  const value = { cartOpen, setCartOpen, cartItems, addItemToCart, itemCount };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
