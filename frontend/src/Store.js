import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
    }
}

function reducer(state, action) {
    switch(action.type) {
        case 'CART_ADD_ITEM':
            const newItem = action.payload;
            console.log(`newitem=${JSON.stringify(newItem)}`);
            const itemInCart = state.cart.cartItems.find(
                (item) => item._id === newItem._id
            );

            var cartItems;
            if (itemInCart) {
                console.log('incart');
                cartItems = state.cart.cartItems.map((item) => 
                    item._id === itemInCart._id ? newItem : item
                );
            } else {
                cartItems = [...state.cart.cartItems, newItem];
            }
            //state.cart.cartItems.push(action.payload);
            state.cart.cartItems = cartItems;
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            return { ...state };
        case 'CART_REMOVE_ITEM':
            state.cart.cartItems = state.cart.cartItems.filter(
                (item) => item._id !== action.payload._id
            );
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            return { ...state };
        default:
            return state;
    }
}

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = {state, dispatch};
    return <Store.Provider value={value}>{props.children}</Store.Provider>;
}