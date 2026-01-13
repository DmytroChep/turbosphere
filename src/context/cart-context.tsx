import  { createContext, useState, type ReactNode } from "react";
import type { IProduct } from "../shared";

interface CartItem extends IProduct{
    count: number
}

interface ICartContext {
    items: CartItem[];
    addToCart: (cartItem: CartItem) => void;
    removeFromCart: (id: number) => void

}

export const CartContext = createContext<ICartContext | null>(null)

interface CartContextProviderProps {
    children: ReactNode
}

export function CartContextProvider(props: CartContextProviderProps){
    const {children} = props
    const [items, setItems] = useState<CartItem[]>([])
    function addToCart(product: CartItem){
        // если условие True - возвращает индекс элемента 
        // иначе -1
        const productIndex = items.findIndex((item)=> {
            return item.id === product.id
        })
        if (productIndex!==-1){
            
            const productInCart = items.at(productIndex)
            const newItems = items.map((product)=>{
                if (product.id===productInCart?.id){
                    return {
                        ...product,
                        count:product.count+1
                        
                    }

                }
                return product
            })
            setItems(newItems)
        }else{
            const newItems = [...items, product]
            setItems(newItems)
        }
            
            
    }
    function removeFromCart(id: number){
        // const result = items.filter((item) => {return item.id!==id})
    }
    return (
        <CartContext value={{items, addToCart, removeFromCart}}>
            {children}
        </CartContext>    
    )
}