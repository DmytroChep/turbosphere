import { useEffect, useState } from "react";
import { IProduct } from "../shared";

export function useProductById(productId: number){
    const [error, setError] = useState<string | null>(null)
    const [ product, setProduct ] = useState<IProduct | null>(null)
    useEffect(() => {
        async function getProductById(){
            try{
                const response = await fetch(`http://localhost:8000/product/${productId}`);
                const result = await response.json();
                if (response.status === 404){
                    setError(result)
                } else {
					setProduct(result)
                }
            }catch(error){
                console.log(error);
            }
        }
        getProductById();
    }, [productId])
    return { product, error}

}