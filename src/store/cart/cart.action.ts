import {ActionWithPayload, createAction, withMatcher} from "../../utils/reducers/action.util";
import {CART_ACTION_TYPES, CartItem} from "./cart.types";
import {CategoryItem} from "../categories/categories.types";

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.CHANGE_CART_OPEN, boolean>
export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART, CartItem[]>

const addItem = (cartItems: CartItem[], product: CategoryItem): CartItem[] => {
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

const removeItem = (cartItems: CartItem[], product: CartItem) => {
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

export const setCartOpen = withMatcher((val: boolean): SetIsCartOpen => createAction(CART_ACTION_TYPES.CHANGE_CART_OPEN, val))
export const setCartItems = withMatcher((cartItems:CartItem[]): SetCartItems => createAction(CART_ACTION_TYPES.SET_CART, cartItems));
export const addItemToCart = (cartItems: CartItem[], product: CategoryItem): SetCartItems => {
    return setCartItems(addItem(cartItems, product));
}
export const removeItemFromCart = (cartItems: CartItem[], product: CartItem): SetCartItems => {
    return setCartItems(removeItem(cartItems, product));
}
export const clearItemFromCart = (cartItems: CartItem[], product: CartItem): SetCartItems => {
    return setCartItems(clearItem(cartItems, product));
}
