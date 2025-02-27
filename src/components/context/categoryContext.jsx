
import { createContext, useEffect, useState } from "react";
import { getCategories } from "../../utils/api";

export const categoryContext = createContext();
export const CategoryWrapper = ({children}) => {
    const [category, setCategory] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const result = getCategories();
            setCategory(result);
        }
        fetchApi();
    },[]);
    return (
        <categoryContext.Provider value = {{category, setCategory}}>
            {children}
        </categoryContext.Provider>
    )
}