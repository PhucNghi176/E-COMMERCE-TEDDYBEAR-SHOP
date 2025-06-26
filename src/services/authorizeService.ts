import { ILogin, IToken } from "@/types";
import { ApiResponseHandler } from "@/utils/ApiResponseHandler";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL_AUTHORIZE;

export const authorizeService = {
    login: async (data: ILogin): Promise<IToken> => {
        const response = await fetch(`${BASE_URL}v1/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return ApiResponseHandler.handleResponse(response);
    }
}

