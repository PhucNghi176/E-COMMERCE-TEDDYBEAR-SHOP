import { ILogin } from "@/types";
import { useFetch } from "./useAPiCall";
import { authorizeService } from "@/services/authorizeService";

export const useAuthorize = (data: ILogin) => {
    return useFetch(['authorize', data], () => authorizeService.login(data));
}
