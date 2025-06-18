import { Product } from "@/hooks/useProducts";
import { ApiResult, PaginatedResponse, SearchParamsPaginated } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL_QUERY;
export const productService = {
    getProducts: async (searchParams: SearchParamsPaginated) => {
        // Build URL parameters more safely
        const params = new URLSearchParams();

        // Only add searchTerm if it has a value
        if (searchParams.searchTerm && searchParams.searchTerm.trim()) {
            params.append('searchTerm', searchParams.searchTerm.trim());
        }

        params.append('sortColumn', searchParams.sortColumn || 'createdAt');
        params.append('sortOrder', searchParams.sortOrder);
        params.append('pageIndex', searchParams.pageIndex.toString());
        params.append('pageSize', searchParams.pageSize.toString());

        const response = await fetch(`${BASE_URL}v1/products?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const result: ApiResult<PaginatedResponse<Product>> = await response.json();

        if (result.isSuccess) {
            return result.value;
        } else {
            throw new Error(result.error.message || 'Failed to fetch products');
        }
    }
}

