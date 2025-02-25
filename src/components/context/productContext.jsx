import { createContext, useEffect, useState } from "react";
import { getProducts } from "../../utils/api";

export const productContext = createContext();
export const ProductWrapper = ({ children }) => {
    const [product, setProduct] = useState([]);
    useEffect(() => {
        const fetchAPi = async () => {
            const result = getProducts();
            setProduct(result);
        }
        fetchAPi();
    }, []);
    return (
        <productContext.Provider value={{ product, setProduct }}>
            {children}
        </productContext.Provider>
    );
}