import  { createContext, useState, type ReactNode } from "react";
import type { IProduct } from "../shared";

export interface CartItem extends IProduct{
    count: number
}

interface ICartContext {
    items: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    getTotalPrice: () => number;
    incrementCount: (id: number) => void;
    decrementCount: (id: number) => void;
    removeAll: () => void;
}

export const CartContext = createContext<ICartContext | null>(null)

interface CartContextProviderProps {
    children: ReactNode
}

export function CartContextProvider({ children }: CartContextProviderProps) {
    const [items, setItems] = useState<CartItem[]>([]);

    function addToCart(item: CartItem) {
        const isInCart = items.findIndex((cartItem) => cartItem.id === item.id);

        if (isInCart !== -1) {
            const itemInCart = items.at(isInCart);
            if (!itemInCart) return;
            incrementCount(itemInCart.id);
        } else {
            const newItems = [...items, item];
            setItems(newItems);
        }
    }

    function removeFromCart(id: number) {
        const newItems = items.filter((item) => {
            return item.id !== id;
        });
        setItems(newItems);
    }

    function getTotalPrice(): number {
        const totalPrice = items.reduce((sum, currentItem) => {
            const itemTotal = currentItem.price * currentItem.count;
            return sum + itemTotal;
        }, 0);
        return totalPrice;
    }

    function incrementCount(id: number) {
        const newItems = items.map((item) => {
            if (item.id === id) {
                return { ...item, count: item.count + 1 };
            }
            return item;
        });
        setItems(newItems);
        console.log(newItems)
    }
    function decrementCount(id: number) {
        const item = items.find(item => item.id === id)
        if (item && item.count - 1 === 0) {
            removeFromCart(id)
            return
        }
        const newItems = items.map((item) => {
            if (item.id === id) {
                return { ...item, count: item.count - 1 };
            }
            return item;
        });
        setItems(newItems);
    }
    function removeAll() {
        setItems([]);
    }

    return (
        <CartContext
            value={{
                items,
                addToCart,
                removeFromCart,
                getTotalPrice,
                incrementCount,
                decrementCount,
                removeAll,
            }}
        >
            {children}
        </CartContext>
    );
}
