import { useLocalStorage } from "./useLocalStorage";
import { User } from "@/types";

export const useUser = () => {
    const [user, setUser] = useLocalStorage<User | null>("user", null);
    return { user, setUser };
}