import React, { useState, createContext } from "react";

export const CartContext = createContext();

export function CartProvider(props) {
    const [cart, setCart] = useState([])
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {props.children}
    </CartContext.Provider>
  );
}