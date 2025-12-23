import { useEffect, useState } from "react";
import type { ICategory } from "../shared";

export function useCategories() {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const response = await fetch("http://localhost:8000/categories");
                const data = await response.json();
                if (response.status === 500) {
                    setError("Bad backend");
                } else {
                    setCategories(data);
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
        fetchCategories();
    }, []);
    return { categories, loading, error };
}