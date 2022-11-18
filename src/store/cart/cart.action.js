import {createAction} from "../../utils/reducers/action.util";
import {CART_ACTION_TYPES} from "./cart.types";

export const addItemToCart = (cartItems, product) => createAction(CART_ACTION_TYPES.SET_CART, addItem(cartItems, product))
export const removeItemFromCart = (cartItems, product) => createAction(CART_ACTION_TYPES.SET_CART, removeItem(cartItems, product))
export const clearItemFromCart = (cartItems, product) => createAction(CART_ACTION_TYPES.SET_CART, clearItem(cartItems, product))
export const setCartOpen = (val) => createAction(CART_ACTION_TYPES.CHANGE_CART_OPEN, val)

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