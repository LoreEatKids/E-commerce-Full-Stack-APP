import { cartItem, cartType } from "../types/cartTypes";
import { CART_ACTIONS } from "./CartReducerActions";

export const initCartState: cartType = {
  totalQuantities: 0,
  totalPrice: "0.0€",
  cartItems: [],
};

export type ReducerAction = {
    type: string,
    payload?: cartItem | cartType,
} 

export const reducer = (state: cartType, action: ReducerAction): cartType => {
    switch (action.type) {
      case CART_ACTIONS.LOAD_CART: {
        if (action.payload) {
          return {
            ...state,
            ...action.payload,
          };
        }
        return state;
      }
      case CART_ACTIONS.EMPTY: {
        return initCartState;
      }
      case CART_ACTIONS.ADD: {
        if(!action.payload) {
            throw new Error("action.payload missing in ADD FUNCTION");
        }

        const {id, name, price, desc} = action.payload as cartItem;
        const filteredCart: cartItem[] = state.cartItems.filter(item => item.id !== id);
        const itemExist: cartItem | undefined = state.cartItems.find(item => item.id === id);
        const quantity: number = itemExist?.quantity ? itemExist.quantity + 1 : 1;

        return {...state, cartItems: [...filteredCart, {id, name, price, quantity, desc}]};
      }
      case CART_ACTIONS.REMOVE: {
        if (!action.payload) {
          throw new Error("action.payload missing in ADD FUNCTION");
        }

        const { id } = action.payload as cartItem;
        const filteredCart: cartItem[] = state.cartItems.filter(item => item.id !== id);

        return {...state, cartItems: [...filteredCart]};
      }
      case CART_ACTIONS.INC: {
        return state;
      }
      case CART_ACTIONS.DEC: {
        return state;
      }
      default:
        return state;
    }
}