import { useNavigate, useParams } from "react-router-dom";
import { useProductById } from "../../hooks/use-product-by-id";
import styles from "./page.module.css";
import { useContext, useEffect } from "react";
import { CartContext } from "../../context/cart-context";

export function OneProductPage() {
	const {id} = useParams()
	const {product, error} = useProductById(Number(id))
	const navigate = useNavigate()
	const context = useContext(CartContext)
	
	useEffect(() => {
		if (Number.isNaN(Number(id))) {
			navigate("/")
		}
	}, [id, navigate])

	if (!product) {
		return null
	}

	const productInCart = {
		...product,
		count: 0
	}
	
	function addToCartFunc() {
		if (!productInCart) {
			return null
		}
		context?.addToCart(productInCart)
	}



	if (error || !product){
		return (
			<h1>{error}</h1>
		)
	}
	
	return (
		<div className={styles.productCart}>
			<img
				className={styles.productImage}
				src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/250px-Cat_November_2010-1a.jpg"
				alt=""
			/>

			<div className={styles.productFullDescription}>
				<h2 className={styles.productTitle}>{product.name}</h2>
				<p className={styles.productDescription}>
					{product.description ? product.description : "no description"}
				</p>

				<div className={styles.productButtons}>
					<button className={styles.productButton} onClick={addToCartFunc} >Add to cart</button>
					<button className={styles.productButton}>Buy</button>
				</div>
			</div>
		</div>
	);
}