import {CategoryItem} from "../categories/categories.types";

export enum CART_ACTION_TYPES {
    CHANGE_CART_OPEN = 'cart/CHANGE_CART_OPEN',
    SET_CART = 'cart/SET_CART',
}

export type CartItem = CategoryItem & {
    quantity: number;
}