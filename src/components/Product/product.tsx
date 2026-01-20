import { useContext } from "react";
import styles from "./product.module.css";
// import { ProductProps } from "./product.types";
import { CartContext } from "../../context/cart-context"
import { Link } from "react-router-dom";
import type { ProductProps } from "./product.types";


export function Product(props: ProductProps) {
	const { product } = props;

	const cartContext = useContext(CartContext);
	
	if (!cartContext){
        return null
    }
	console.log(cartContext.items)

	const {incrementCount, decrementCount} = cartContext
	
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
				{/* <p>Count: {count}</p> */}
				<button onClick={decrementCountFunc} className={styles.buttonIcon}>
					-
				</button>
				<button onClick={incrementCountFunc} className={styles.buttonIcon}>
					+
				</button>
			</div>
			<button className={styles.buttonMore}>
				<Link to={`/product/${product.id}`}>More</Link>
			</button>
		</div>
	);
}
