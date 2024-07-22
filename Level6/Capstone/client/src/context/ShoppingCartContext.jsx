import React, { createContext, useState } from 'react';

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
    const [shoppingCartItems, setShoppingCartItems] = useState([]);

    const addToCart = (item) => {
        setShoppingCartItems((prevItems) => [...prevItems, item]);
    };

    return (
        <ShoppingCartContext.Provider value={{ shoppingCartItems, addToCart }}>
            {children}
        </ShoppingCartContext.Provider>
    );
};
