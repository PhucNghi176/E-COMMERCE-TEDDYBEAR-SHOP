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
      const text = await response.text();
      if (text) {
        var result: ApiResult<T> = JSON.parse(text);
        return result.value;
      }
      throw new Error('Empty response from server');
    }

    // Handle 401 Unauthorized specifically
    if (response.status === 401) {
      toast.error('Not authorized - Please log in again', {
        icon: '🔒',
        style: {
          borderRadius: '12px',
          background: '#dc2626',
          color: '#fff',
        },
      });
      throw new Error('Not authorized');
    }

    const text = await response.text();
    if (text) {
      try {
        var error: ErrorResponse = JSON.parse(text);
        toast.error(error.title + "\n " + error.detail, {
          icon: '🧸',
          style: {
            borderRadius: '12px',
            background: '#8B4513',
            color: '#fff',
          },
        });
        throw new Error(error.title + "\n " + error.detail);
      } catch {
        throw new Error('Upload failed: ' + text);
      }
    }
    throw new Error('Upload failed with no response');
  }
} 