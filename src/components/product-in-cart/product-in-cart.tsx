import { CartContext, type CartItem } from "../../context/cart-context";
import { Button } from "../../shared";
import styles from './product-in-cart.module.css'
import { useContext } from "react";

interface IProductInCart {
	productInCart: CartItem;
}

export function ProductInCart(props: IProductInCart) {
	const { productInCart } = props;
    const context = useContext(CartContext)
    if (!context){
        return null
    }
    
    const {incrementCount, decrementCount, removeFromCart} = context
    
    function incrementCountFunc(){
		incrementCount(productInCart.id)
	}

	function decrementCountFunc(){
		decrementCount(productInCart.id)
	}


    function removeFromCartFunc(){
		removeFromCart(productInCart.id)
	}
    
	return (
		<div className = {styles.productInCart}>
            <img src={productInCart.image} className={styles.image} alt=""/>

			<div className={styles.productDetails}>
				<p className={styles.productName}>
					<span>Name: </span>
					{productInCart.name}
				</p> 

				<p className={styles.productDescription}>
					<span>Description: </span>
					{productInCart.description}
				</p>

				<p className={styles.productCategory}>
					<span>Category: </span>
					{/* {productInCart.category} */}
				</p>

				<p className={styles.productPrice}> 
					<span>Price: </span>
					{productInCart.price}
				</p>

				<div className={styles.productCount}>
					<p>
						<span>Number of items: </span>
						{productInCart.count}
					</p>
				</div>

				<div className={styles.productActions}>
                    <Button variant='buy' onClick={incrementCountFunc}>+</Button>
                    <Button variant='buy' onClick={decrementCountFunc}>-</Button>

				</div>
			</div>
			<div className={styles.productSecondActions}>
			

                <Button variant="buy">Buy</Button>
                <Button variant="buy">Go to</Button>
                <Button variant="buy" onClick={removeFromCartFunc}>Delete</Button>

			</div>
		</div>
	);
}
