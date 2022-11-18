import {createSelector} from "reselect";

const cartReducer = state => state.cart;

const selectCartItems = createSelector(
    [cartReducer],
    (cartState) => cartState.cartItems
)

export const selectCartState = createSelector(
    [selectCartItems],
    (cartItems) => deriveCartState(cartItems)
)

export const selectCartOpen = state => state.cart.cartOpen

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