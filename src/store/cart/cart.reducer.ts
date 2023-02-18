import {CART_ACTION_TYPES, CartItem} from "./cart.types";
import {AnyAction} from "redux";
import {addItemToCart, setCartOpen} from "./cart.action";

export type CartState = {
    readonly cartOpen: boolean;
    readonly cartItems: CartItem[];
}
const CART_INITIAL_STATE: CartState = {
    cartOpen: false,
    cartItems: [],
}

export const cartReducer = (state = CART_INITIAL_STATE, action: AnyAction) => {
    if (setCartOpen.match(action)) {
        return {...state, cartOpen: action.payload};
    }
    if (addItemToCart.match(action)) {
        return {...state, cartItems: action.payload}
    }

    return state;
}
