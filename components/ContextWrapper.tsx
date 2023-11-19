"use client";

import { createContext, useEffect, useState } from "react";
import { MainContext, CartItem, Product } from "@/types";

export const Context = createContext<MainContext>({
  isFetched: false,
  isNavEnabled: true,
  cartItems: [],
  setCartItems: () => {},
  setFetch: () => {},
  setNavView: () => {},
  addItemToCart: () => {},
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const maxAmount = 99;
  const [isFetched, setFetch] = useState(false);
  const [isNavEnabled, setNavView] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addItemToCart = (amount: number, product: Product) => {
    const cartItem: CartItem = { amount: amount, product };
    const foundItemIndex = cartItems.findIndex(
      (item) => item.product.id === product.id,
    );

    if (foundItemIndex !== -1) {
      const array = cartItems.slice();
      cartItem.amount += cartItems[foundItemIndex].amount;

      if (cartItem.amount > maxAmount) cartItem.amount = maxAmount;

      array[foundItemIndex] = cartItem;
      setCartItems(array);
      return;
    }

    setCartItems([cartItem, ...cartItems]);
  };

  useEffect(() => {
    setNavView(window.innerWidth > 1024);
  }, []);

  return (
    <Context.Provider
      value={{
        isFetched,
        isNavEnabled,
        cartItems,
        setCartItems,
        setFetch,
        setNavView,
        addItemToCart,
      }}
    >
      {children}
    </Context.Provider>
  );
}
