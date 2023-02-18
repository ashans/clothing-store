import {createSelector} from "reselect";
import {CartItem} from "./cart.types";
import {CartState} from "./cart.reducer";

const cartReducer = (state): CartState => state.cart;

const selectCartItems = createSelector(
    [cartReducer],
    (cartState) => cartState.cartItems
)

export const selectCartState = createSelector(
    [selectCartItems],
    (cartItems) => deriveCartState(cartItems)
)

export const selectCartOpen = (state): boolean => state.cart.cartOpen

const deriveCartState = (cartItems: CartItem[]) => {
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