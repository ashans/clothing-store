import {ActionWithPayload, createAction, withMatcher} from "../../utils/reducers/action.util";
import {CART_ACTION_TYPES, CartItem} from "./cart.types";
import {CategoryItem} from "../categories/categories.types";

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.CHANGE_CART_OPEN, boolean>
export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART, CartItem[]>
export const addItemToCart = withMatcher((cartItems:CartItem[], product:CategoryItem): SetCartItems => createAction(CART_ACTION_TYPES.SET_CART, addItem(cartItems, product)))
export const removeItemFromCart = withMatcher((cartItems:CartItem[], product:CartItem): SetCartItems => createAction(CART_ACTION_TYPES.SET_CART, removeItem(cartItems, product)))
export const clearItemFromCart = withMatcher((cartItems:CartItem[], product: CartItem): SetCartItems => createAction(CART_ACTION_TYPES.SET_CART, clearItem(cartItems, product)))
export const setCartOpen = withMatcher((val: boolean): SetIsCartOpen => createAction(CART_ACTION_TYPES.CHANGE_CART_OPEN, val))

const addItem = (cartItems:CartItem[], product:CategoryItem): CartItem[] => {
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

const removeItem = (cartItems:CartItem[], product: CartItem) => {
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

const clearItem = (cartItems: CartItem[], product: CartItem): CartItem[] => {
    return cartItems.filter((item) => item.id !== product.id);
}