import { ApiResult, ErrorResponse } from "@/types";
import toast from "react-hot-toast";

export interface ErrorMapping {
  [code: string]: string;
}

export class ApiResponseHandler {
  /**
   * Handles API response and throws appropriate errors based on error codes
   * @param result - The API result to process
   * @returns The value if successful
   * @throws Error with appropriate message if failed
   */
  static async handleResponse<T>(
    response: Response,
  ): Promise<T> {
    if (response.ok) {
      var result: ApiResult<T> = await response.json();
      return result.value;
    }
    var error: ErrorResponse = await response.json();
    toast.error(error.title + "\n " + error.detail, {
      icon: '🧸',
      style: {
        borderRadius: '12px',
        background: '#8B4513',
        color: '#fff',
      },
    });
    throw new Error(error.title + "\n " + error.detail);
  }
} 