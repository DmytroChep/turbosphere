import { useState } from "react";
import { ProductList } from "../../components/product-list";
import styles from "./page.module.css";
import { ICONS } from "../../shared";
import { SelectCategory } from "../../components/select-category";
export function ProductsPage() {
	const [selectedCategory, setSelectedCategory] = useState<"All" | number>(
		"All"
	);

	const [search, setSearch] = useState<string>("");

	function selectCategory(category: "All" | number) {
		setSelectedCategory(category);
	}

	return (
		<div className={styles.container}>
			<div className={styles.filterBlock}>
				<div className={styles.searchBlock}>
					<input
						type="text"
						placeholder="Find products..."
						className={styles.search}
						onChange={(event) => {
							const input = event.target.value;
							setSearch(input);
						}}
					/>
					<ICONS.SearchIcon className={styles.searchIcon} />
				</div>
				<SelectCategory
					selectCategory={selectCategory}
					selectedCategory={selectedCategory}
				></SelectCategory>
			</div>
			<ProductList
				selectedCategory={selectedCategory}
				search={search}
			></ProductList>
		</div>
	);
}
