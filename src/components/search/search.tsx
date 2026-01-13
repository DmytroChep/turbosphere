import { useRef, useState } from "react";
import { ICONS } from "../../shared";
import styles from "./search.module.css";
import { useProducts } from "../../hooks";
import { Modal } from "../../shared/modal/modal";


export function Search() {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const closeModal = () => setIsModalOpen(false)
	const { products } = useProducts();


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
					products.map((product) => {
						return (
							<div key={product.id}>
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
