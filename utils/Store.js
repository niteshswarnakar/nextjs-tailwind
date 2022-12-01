import { createContext, useReducer } from "react";

//export Store object
export const Store = createContext();

//initialise store
const intialState = {
  cart: {
    cartItems: [],
  },
};

//ruducer function to handle actions
function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD_ITEM": {
      const newItem = action.payload;

      //this payload recieved is also good
      console.log("second time newItem payload recieved in layout : ", newItem);

      const existItem = state.cart.cartItems.find(
        (item) => item.slug === newItem.slug
      );

      // existItem item has quantity 1 and newItem has quantity 2 which is perfectly fine
      console.log("second time ExistItem from layout : ", existItem);

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

      console.log("dispatched cartItems : ", cartItems);

      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case 'DELETE_CART_ITEM':
      const item_to_be_removed = action.payload
      const cartItems = state.cart.cartItems.filter(item=>{
        return (item_to_be_removed.slug !==item.slug)
      })

      return {...state, cart:{...state.cart,cartItems}}
    

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
