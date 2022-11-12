import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
  cartOpen: false,
  setCartOpen: () => null,
  cartItems: [],
  addItemToCart: () => null,
  removeItemFromCart: () => null,
  clearItem: () => null,
  itemCount: 0,
  totalValue: 0,
});

export const CartProvider = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    const count = cartItems
      .map((item) => item.quantity)
      .reduce((acc, q) => acc + q, 0);
    setItemCount(count);

    const total = cartItems
      .map((item) => item.price * item.quantity)
      .reduce((acc, p) => acc + p, 0);
    setTotalValue(total);
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
      matching.quantity++;
      return [...cartItems];
    });
  };

  const removeItemFromCart = (product) => {
    setCartItems(() => {
      const matching = cartItems.find((item) => item.id === product.id);

      if (!matching) {
        return cartItems;
      }
      matching.quantity--;

      if (matching.quantity === 0) {
        return cartItems.filter((item) => item.id !== product.id);
      }
      return [...cartItems];
    });
  };

  const clearItem = (product) => {
    setCartItems(() => {
      return cartItems.filter((item) => item.id !== product.id);
    });
  };

  const value = {
    cartOpen,
    setCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearItem,
    itemCount,
    totalValue,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
