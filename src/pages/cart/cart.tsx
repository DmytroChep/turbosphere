import styles from "./cart.module.css";
import { Button } from '../../shared/button'
import { useContext } from "react";
import { CartContext } from "../../context/cart-context";
import { ProductInCart } from "../../components/product-in-cart/product-in-cart";

export function CartPage() {

    const cartContext = useContext(CartContext)

    if (!cartContext){
        return null
    }
    
    const {items, getTotalPrice, removeAll} = cartContext
    
    return (
        <div className= {styles.cartContainer}>
            <h1>Cart</h1>

            <div className={styles.cartProductList}>
                <div className = {styles.listOfProducts}>
                    {
                        items.map((product) => {
                            return (<ProductInCart key={product.id} productInCart={product}/>)
                        })
                    }
                </div>

                {/* <div className={styles.cartButtons}>
                    <Button variant="buy"/>
                    <Button variant="cart" onClick={removeAll}/>
                </div> */}
            </div>

            <div className={styles.cartFooter}>
                <h2>Total price: {getTotalPrice()}</h2>

                <Button variant="buy">Buy All</Button>
                <Button variant="cart" onClick={removeAll}>Delete All</Button>
            </div>
        </div>
    )
}