import { useRef, useState } from "react";
import { ICONS } from "../../shared";
import styles from "./search.module.css";
import { useProducts } from "../../hooks";
import { Modal } from "../../shared/modal/modal";


export function Search() {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const closeModal = () => setIsModalOpen(false)
	const { products } = useProducts();
	const [filteredProducts, setFilteredProducts] = useState(products);

	function handleInputFocus() {
		setIsModalOpen(!isModalOpen);
	}

	const modalContainerRef = useRef<HTMLDivElement>(null);
	return (
		<div className={styles.searchBlock} ref={modalContainerRef}>
			<input
				onFocus={handleInputFocus}
				placeholder="Find products..."
				className={styles.searchBar}
				type="text"
				onClick={(event) => {
					event.stopPropagation()
				}}
				onChange={(event)=>{
					const text = event.target.value
					const productsInFilter = products.filter((product) =>{
						return product.name.startsWith(text)
					})
					setFilteredProducts(productsInFilter)
				}}
			/>
			<ICONS.SearchIcon className={styles.searchIcon} />
			<Modal
				className={styles.modal}
				isOpen={isModalOpen}
				onClose={closeModal}
				doCloseOnOutsideClick={true}
				
				container={
					modalContainerRef.current ? modalContainerRef.current : undefined
				}>
					{
					filteredProducts.map((product) => {
						return (
							<div key={product.id} className={styles.productItem}>
								<ICONS.SearchIcon className={styles.productSearch} /> 
								<img
									src={product.image}
									alt="Product"
									className={styles.productImage}
								/>
								<p className={styles.productName}>{product.name}</p>
							</div>
						)
					})}

			</Modal>
		</div>
	);
}
