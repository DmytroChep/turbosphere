import { useNavigate } from "react-router-dom";
import { CartContext, type CartItem } from "../../context/cart-context";
import { Button, IMAGES, IProduct } from "../../shared";
import styles from './product-in-cart.module.css'
import { useContext } from "react";
interface IProductInCart {
	productInCart: CartItem;
}

export function ProductInCart(props: IProductInCart) {
	const { productInCart } = props;
    const context = useContext(CartContext)
	const navigate = useNavigate()
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
            <img src={IMAGES.cat} className={styles.image} alt=""/>

			<div className={styles.productDetails}>
				<p className={`${styles.productName} ${styles.productInfo}`}>
					<strong>Name: </strong>
					{productInCart.name}
				</p> 

				<p className={`${styles.productDescription} ${styles.productInfo}`}>
					<strong>Description: </strong>
					{productInCart.description}
				</p>

				<p className={`${styles.productCategory} ${styles.productInfo}`}>
					<strong>Category: </strong>
					{productInCart.category.name}
				</p>

				<p className={`${styles.productPrice} ${styles.productInfo}`}> 
					<strong>Price: </strong>
					{productInCart.price}
				</p>

				<div className={`${styles.productCount} ${styles.productInfo}`}>
					<p>
						<strong>Number of items: </strong>
						{productInCart.count}
					</p>
				</div>

				<div className={styles.productActions}>
                    <Button variant='count-red' onClick={incrementCountFunc}>+</Button>
                    <Button variant='count-green' onClick={decrementCountFunc}>–</Button>

				</div>
			</div>
			<div className={styles.productSecondActions}>
                <Button variant="buy">Buy</Button>
                <Button variant="buy" onClick={()=>{navigate(`/product/${productInCart.id}`)}}>Go to</Button>
                <Button variant="delete" onClick={removeFromCartFunc}>Delete</Button>
			</div>
		</div>
	);
}
