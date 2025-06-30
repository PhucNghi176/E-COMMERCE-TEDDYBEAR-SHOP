import { getToken } from "@/hooks/useLocalStorage";
import { ApiResult, PaginatedResponse, TeddyBear, SearchParamsPaginated, CreateTeddyBearRequest, UpdateTeddyBearRequest } from "@/types";

const BASE_URL_QUERY = process.env.NEXT_PUBLIC_API_URL_QUERY;
const BASE_URL_COMMAND = process.env.NEXT_PUBLIC_API_URL_COMMAND;


export const teddyBearService = {
    getTeddyBears: async (searchParams: SearchParamsPaginated) => {
        // Build URL parameters more safely
        const params = new URLSearchParams();

        // Only add searchTerm if it has a value
        if (searchParams.searchTerm && searchParams.searchTerm.trim()) {
            params.append('searchTerm', searchParams.searchTerm.trim());
        }

        // Add tags filter if provided
        if (searchParams.tags && searchParams.tags.trim()) {
            params.append('tags', searchParams.tags.trim());
        }

        params.append('sortColumn', searchParams.sortColumn || 'createdAt');
        params.append('sortOrder', searchParams.sortOrder);
        params.append('pageIndex', searchParams.pageIndex.toString());
        params.append('pageSize', searchParams.pageSize.toString());

        const response = await fetch(`${BASE_URL_QUERY}v1/products?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch teddy bears');
        }

        const result: ApiResult<PaginatedResponse<TeddyBear>> = await response.json();

        if (result.isSuccess) {
            return result.value;
        } else {
            throw new Error(result.error.message || 'Failed to fetch teddy bears');
        }
    },

    getTeddyBearById: async (id: string): Promise<TeddyBear> => {
        const response = await fetch(`${BASE_URL_QUERY}v1/products/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch teddy bear');
        }

        const result: ApiResult<TeddyBear> = await response.json();

        if (result.isSuccess) {
            return result.value;
        } else {
            throw new Error(result.error.message || 'Failed to fetch teddy bear');
        }
    },

    createTeddyBear: async (teddyBearData: CreateTeddyBearRequest): Promise<TeddyBear> => {
        const token = getToken();
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };
        
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${BASE_URL_COMMAND}v1/products`, {
            method: 'POST',
            headers,
            body: JSON.stringify(teddyBearData),
        });

        if (!response.ok) {
            throw new Error('Failed to create teddy bear');
        }

        const result: ApiResult<TeddyBear> = await response.json();

        if (result.isSuccess) {
            return result.value;
        } else {
            throw new Error(result.error.message || 'Failed to create teddy bear');
        }
    },

    updateTeddyBear: async (teddyBearData: UpdateTeddyBearRequest): Promise<TeddyBear> => {
        const token = getToken();
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };
        
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${BASE_URL_COMMAND}v1/products/${teddyBearData.id}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(teddyBearData),
        });

        if (!response.ok) {
            throw new Error('Failed to update teddy bear');
        }

        const result: ApiResult<TeddyBear> = await response.json();

        if (result.isSuccess) {
            return result.value;
        } else {
            throw new Error(result.error.message || 'Failed to update teddy bear');
        }
    },

    deleteTeddyBear: async (id: string): Promise<void> => {
        const token = getToken();
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };
        
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${BASE_URL_COMMAND}v1/products/${id}`, {
            method: 'DELETE',
            headers,
        });

        if (!response.ok) {
            throw new Error('Failed to delete teddy bear');
        }

        const result: ApiResult<void> = await response.json();

        if (!result.isSuccess) {
            throw new Error(result.error.message || 'Failed to delete teddy bear');
        }
    }
}; 