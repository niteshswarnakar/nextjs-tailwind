import { createContext, useReducer } from "react";
import Cookies from "js-cookie";

//export Store object
export const Store = createContext();

//initialise store
const intialState = {
  cart: Cookies.get("cart")
    ? JSON.parse(Cookies.get("cart"))
    : { cartItems: [] },
};

//ruducer function to handle actions
function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD_ITEM": {
      const newItem = action.payload;

      const existItem = state.cart.cartItems.find(
        (item) => item.slug === newItem.slug
      );

      //problem is here , this cartItems is coming undefined
      const cartItems = existItem
        ? state.cart.cartItems.map((item) => {
            if (item.slug === existItem.slug) {
              return newItem;
            } else {
              return item;
            }
          })
        : [...state.cart.cartItems, newItem];
      Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case "DELETE_CART_ITEM": {
      const item_to_be_removed = action.payload;
      const cartItems = state.cart.cartItems.filter((item) => {
        return item_to_be_removed.slug !== item.slug;
      });
      Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    default:
      return state;
  }
}

//wrapper component to provide state globally

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, intialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
