import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
    cart: {
        shippingAddress: localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {},
        cartItems: localStorage.getItem('cartItems') && localStorage.getItem('cartItems') !== 'undefined' ? JSON.parse(localStorage.getItem('cartItems')) : [],
        paymentMethod: localStorage.getItem('paymentMethodName') ? localStorage.getItem('paymentMethodName') : ''
    }
}



function reducer(state, action) {
    switch(action.type) {
        case 'CART_ADD_ITEM':
            const newItem = action.payload;
            const itemInCart = state.cart.cartItems.find(
                (item) => item._id === newItem._id
            );

            var cartItems;
            if (itemInCart) {
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
        case 'USER_SIGNIN':
            return {
                ...state,
                userInfo: action.payload
            };
        case 'USER_SIGNOUT':
            return {
                ...state,
                userInfo: null,
                cart: {
                    ...state.cart,
                    shippingAddress: {},
                    paymentMethod: ''
                }
            };
        case 'SAVE_SHIPPING_ADDRESS':
            return {
                ...state,
                cart: {
                    ...state.cart,
                    shippingAddress: action.payload
                }
            };
        case 'SAVE_PAYMENT_METHOD':
            return {
                ...state,
                cart: {
                    ...state.cart,
                    paymentMethod: action.payload
                }
            };
        default:
            return state;
    }
}

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = {state, dispatch};
    return <Store.Provider value={value}>{props.children}</Store.Provider>;
}