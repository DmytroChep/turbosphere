import { useEffect, useState } from "react";
import { Product } from "../product";
import styles from "./product-list.module.css";
import { ProductListProps } from "./product-list.types";
import { useProducts } from "../../hooks";
import type { IProduct  } from "../../shared";

export function ProductList({ search, selectedCategory }: ProductListProps) {
	const { products, loading, error } = useProducts();
	const [filteredProducts, setFilteredProducts] = useState<IProduct[]>(products);

	useEffect(() => {
		if (selectedCategory === "All") {
			const searchProducts = products.filter((product) => {
				return product.name
					.toLowerCase()
					.startsWith(search.toLocaleLowerCase());
			});
			setFilteredProducts(searchProducts);
		} else {
			const newProducts = products.filter((product) => {
				return product.categoryId === selectedCategory;
			});
			const searchProducts = newProducts.filter((product) => {
				return product.name
					.toLowerCase()
					.startsWith(search.toLocaleLowerCase());
			});
			setFilteredProducts(searchProducts);
		}
	}, [search, selectedCategory, products]);

	return (
		<div className={styles.productsBlock}>
			{loading ? (
				<p>Loading...</p>
			) : error ? (
				error
			) : (
				<>
					<p className={styles.productTitle}>
						Found {filteredProducts.length} products
					</p>
					<div className={styles.products}>
						{filteredProducts.map((product) => {
							return (
								<Product product={product} key={product.id} />
							);
						})}
					</div>
				</>
			)}
		</div>
	);
}
