import { useContext } from "react";
import styles from "./product.module.css";
// import { ProductProps } from "./product.types";
import { CartContext } from "../../context/cart-context"
import { Link } from "react-router-dom";
import type { IProductProps } from "./product.types";
import { Button } from "../../shared";


export function Product(props: IProductProps) {
	const { product } = props;

	const cartContext = useContext(CartContext);
	
	if (!cartContext){
        return null
    }
	console.log(cartContext.items)

	const {incrementCount, decrementCount, addToCart} = cartContext
	
	function incrementCountFunc(){
		incrementCount(product.id)
	}

	function decrementCountFunc(){
		decrementCount(product.id)
	}

	return (
		<div className={styles.block}>
			<img src={product.image} alt="No" className={styles.image} />
			<p className={styles.title}>{product.name}</p>
			<p className={styles.price}>${product.price}</p>
			<div className={styles.counter}>
				<Button variant="count" onClick={decrementCountFunc} className={styles.buttonIcon}>
					-
				</Button>
				<Button  variant="count" onClick={incrementCountFunc} className={styles.buttonIcon}>
					+
				</Button>
			</div>
			<button className={styles.buttonMore}>
				<Link to={`/product/${product.id}`}>More</Link>
			</button>
		</div>
	);
}
