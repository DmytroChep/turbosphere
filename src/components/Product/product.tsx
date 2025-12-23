import { useState } from "react";
import styles from "./product.module.css";
import { ProductProps } from "./product.types";
import { Link } from "react-router-dom";


export function Product(props: ProductProps) {
	const { product } = props;
	const [count, setCount] = useState<number>(1);
	function incrementCount() {
		setCount(count + 1);
	}
	function decrementCount() {
		if (count > 1) {
			setCount(count - 1);
		}
	}
	return (
		<div className={styles.block}>
			<img src={product.image} alt="No" className={styles.image} />
			<p className={styles.title}>{product.name}</p>
			<p className={styles.price}>${product.price}</p>
			<div className={styles.counter}>
				<p>Count: {count}</p>
				<button onClick={decrementCount} className={styles.buttonIcon}>
					-
				</button>
				<button onClick={incrementCount} className={styles.buttonIcon}>
					+
				</button>
			</div>
			<button className={styles.buttonMore}>
				<Link to={`/product/${product.id}`}>More</Link>
			</button>
		</div>
	);
}
