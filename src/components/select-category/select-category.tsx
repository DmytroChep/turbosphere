import styles from "./select-category.module.css";
import type { SelectCategoryProps } from "./select-category.types";
import { useCategories } from "../../hooks";


export function SelectCategory({
	selectCategory,
	selectedCategory,
}: SelectCategoryProps) {
	const {categories} = useCategories()

	return (
		<div className={styles.selectCategory}>
			<p>Select category:</p>
			<label className={styles.labelSelectCategory}>
				<input
					type="radio"
					onChange={() => {
						selectCategory("All");
					}}
					value={"All"}
					name="category"
					checked={selectedCategory === "All" ? true : false}
				/>
				All
			</label>
			{categories.map((category) => {
				return (
					<label
						className={styles.labelSelectCategory}
						key={category.id}
					>
						<input
							type="radio"
							value={category.id}
							name="category"
							onChange={() => {
								selectCategory(category.id);
							}}
							checked={
								selectedCategory === category.id ? true : false
							}
						/>
						{category.name}
					</label>
				);
			})}
		</div>
	);
}
