import { SearchParamsPaginated } from "@/types";
import { useFetch } from "./useAPiCall";
import { productService } from "@/services/productService";

export interface Product {
    id: string;
    name: string;
    size?: string;
    quantity: number;
    price: number;
    color?: string[];
    imgUrl?: string[];
    productTags?: ProductTag[];
    createdAt: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface ProductTag {
    id: string;
    name: string;
}
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