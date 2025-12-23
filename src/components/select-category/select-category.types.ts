export interface SelectCategoryProps {
	selectCategory: (category: "All" | number) => void;
	selectedCategory: "All" | number;
}

