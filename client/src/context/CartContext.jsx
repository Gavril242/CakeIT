// src/context/CartContext.js
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product, bakeryId, bakeryName) => {
        setCart((prevCart) => {
            const existingBakery = prevCart.find((item) => item.bakeryId === bakeryId);

            if (existingBakery) {
                const existingProduct = existingBakery.products.find((item) => item.id === product.id);

                if (existingProduct) {
                    return prevCart.map((item) =>
                        item.bakeryId === bakeryId
                            ? {
                                ...item,
                                products: item.products.map((prod) =>
                                    prod.id === product.id
                                        ? { ...prod, quantity: prod.quantity + 1 }
                                        : prod
                                ),
                            }
                            : item
                    );
                } else {
                    return prevCart.map((item) =>
                        item.bakeryId === bakeryId
                            ? { ...item, products: [...item.products, { ...product, quantity: 1 }] }
                            : item
                    );
                }
            } else {
                return [
                    ...prevCart,
                    {
                        bakeryId,
                        bakeryName,
                        products: [{ ...product, quantity: 1 }],
                    },
                ];
            }
        });
    };

    const removeFromCart = (productId, bakeryId) => {
        setCart((prevCart) =>
            prevCart
                .map((item) =>
                    item.bakeryId === bakeryId
                        ? {
                            ...item,
                            products: item.products.filter((product) => product.id !== productId),
                        }
                        : item
                )
                .filter((item) => item.products.length > 0)
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
