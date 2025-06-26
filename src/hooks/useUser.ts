import { useLocalStorage } from "./useLocalStorage";
import { IToken, User } from "@/types";

export const login = () => {
    const [user, setUser] = useLocalStorage<User | null>("user", null);
    return { user, setUser };
}
