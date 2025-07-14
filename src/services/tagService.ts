import { ApiResult } from "@/types";
import { Tag } from "@/hooks/useTags";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL_QUERY;

export const tagService = {
    getTags: async (): Promise<Tag[]> => {
        const response = await fetch(`${BASE_URL}v1/tags`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("123421423434");
        if (!response.ok) {
            throw new Error('Failed to fetch tags');
        }

        const result: ApiResult<Tag[]> = await response.json();

        if (result.isSuccess) {
            return result.value;
        } else {
            throw new Error(result.error.message || 'Failed to fetch tags');
        }
    },
};




