import { useEffect, useState } from "react";
import { IProduct } from "../shared";

export function useProducts() {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setLoading(true);
				const response = await fetch("http://localhost:8000/products/");
				const data = await response.json();
				if (response.status === 500) {
					setError("Bad backend");
				} else {
					setProducts(data);
				}
			} catch (error) {
				console.error(error);
				if (error instanceof Error) {
					setError(error.message);
				} else {
					setError("Unknown error!");
				}
			} finally {
				setLoading(false);
			}
		};
		fetchProducts();
	}, []);
	return { products, loading, error };
}
