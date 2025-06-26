import { SearchParamsPaginated } from "@/types";
import { useFetch } from "./useAPiCall";
import { productService } from "@/services/productService";

export const useProducts = (
    searchParams: SearchParamsPaginated
) => {
    // Create a cleaned version of searchParams
    const cleanedParams = {
        ...searchParams,
        searchTerm: searchParams.searchTerm?.trim() || ''
    };
    
    return useFetch(['products', cleanedParams], () => productService.getProducts(cleanedParams))
}