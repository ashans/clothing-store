import {createContext, useReducer} from "react";
import {createAction} from "../utils/reducers/action.util";

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

const INITIAL_STATE = {
    cartOpen: false,
    cartItems: [],
    itemCount: 0,
    totalValue: 0,
}

const CART_ACTION_TYPES = {
    CHANGE_CART_OPEN: 'CHANGE_CART_OPEN',
    SET_CART: 'SET_CART',
}

const addItem = (cartItems, product) => {
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
};

const removeItem = (cartItems, product) => {
    const matching = cartItems.find((item) => item.id === product.id);

    if (!matching) {
        return cartItems;
    }
    matching.quantity--;

    if (matching.quantity === 0) {
        return cartItems.filter((item) => item.id !== product.id);
    }
    return [...cartItems];
}

const clearItem = (cartItems, product) => {
    return cartItems.filter((item) => item.id !== product.id);
}

const deriveCartState = (cartItems) => {
    return {
        cartItems,
        itemCount: cartItems
            .map((item) => item.quantity)
            .reduce((acc, q) => acc + q, 0),
        totalValue: cartItems
            .map((item) => item.price * item.quantity)
            .reduce((acc, p) => acc + p, 0)
    }
}

const cartReducer = (state, action) => {
    const {type, payload} = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.CHANGE_CART_OPEN:
            return {
                ...state,
                cartOpen: payload
            }
        default:
            throw new Error(`unknown action type ${type} in cart reducer`)
    }
}

export const CartProvider = ({children}) => {
    const [{cartOpen, cartItems, itemCount, totalValue}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const setCartOpen = (value) => {
        dispatch(createAction(CART_ACTION_TYPES.CHANGE_CART_OPEN, value))
    }
    const updateCartState = (cartItems) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_CART, deriveCartState(cartItems)))
    }
    const addItemToCart = (product) => {
        updateCartState(addItem(cartItems, product))
    }
    const removeItemFromCart = (product) => {
        updateCartState(removeItem(cartItems, product))
    };
    const clearItemFromCart = (product) => {
        updateCartState(clearItem(cartItems, product))
    };

    const value = {
        cartOpen,
        setCartOpen,
        cartItems,
        addItemToCart,
        removeItemFromCart,
        clearItem: clearItemFromCart,
        itemCount,
        totalValue,
    };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
