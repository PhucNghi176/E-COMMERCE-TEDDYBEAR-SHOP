import { getToken } from "@/hooks/useLocalStorage";
import { ApiResponseHandler } from "@/utils/ApiResponseHandler";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL_COMMAND;

export const mediaService = {
    uploadImage: async (image: File) => {
        const token = getToken();
        const formData = new FormData();
        formData.append('file', image);
        
        const headers: Record<string, string> = {};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        const response = await fetch(`${BASE_URL}v1/images/upload`, {
            method: 'POST',
            headers,
            // Don't set Content-Type header - let browser set it with boundary
            body: formData
        });
        return ApiResponseHandler.handleResponse(response);
    }
}