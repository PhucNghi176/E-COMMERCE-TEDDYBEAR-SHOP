import { IToken, User } from "@/types";

//return as User type
export const decodeJwt = (token: IToken | null) => {
    if (token === null) {
        return null;
    }
    const base64Url = token.token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

    // Giải mã base64 an toàn cho Unicode
    try {
        // Chuyển base64 thành binary string
        const binaryString = atob(base64);

        // Chuyển binary string thành mảng bytes
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        // Chuyển mảng bytes thành string UTF-8
        const decodedString = new TextDecoder("utf-8").decode(bytes);

        // Parse JSON
        return JSON.parse(decodedString) as User;
    } catch (error) {
        console.error("Error decoding JWT:", error);
        return null;
    }
};