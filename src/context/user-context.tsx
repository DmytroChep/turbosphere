import {
    createContext,
    type ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import type { IUser } from "../shared/types/user";

interface LoginCredentials {
    email: string;
    password: string;
};
interface RegisterCredentials {
    username: string;
    email: string;
    password: string;
    avatar: string;

}
interface IUserContext {
    token: string;
    user: IUser | null;
    registration: (userData: RegisterCredentials) => Promise<void | string>;
    login: (userData: LoginCredentials) => Promise<void | string>;
}
const UserContext = createContext<IUserContext | null>(null);

export function useUserContext() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("context not defined");
    }
    return context;
}

interface UserContextProviderProps {
    children: ReactNode;
}

export function UserContextProvider(props: UserContextProviderProps) {
    const { children } = props;

    const [token, setToken] = useState<string>("");
    const [user, setUser] = useState<IUser | null>(null);

    async function registration(userData: RegisterCredentials) {
        try {
            const response = await fetch("http://localhost:8000/register", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
            const result = await response.json();
            if (response.status === 409) {
                return result.message;
            }
            setToken(result.token);
            localStorage.setItem("token", result.token);
        } catch {
            return "Bad backend";
        }
    }

    async function login(userData: LoginCredentials) {
        try {
            const response = await fetch("http://localhost:8000/login", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
            const result = await response.json();
            if (response.status === 422 || response.status === 404) {
                return result.message;
            }
            setToken(result.token);
            localStorage.setItem("token", result.token);
        } catch {
            return "Network error";
        }
    }

    async function me() {
        try {
            const response = await fetch("http://localhost:8000/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const result = await response.json();
            if (response.status === 404) {
                return result.message;
            }
            setUser(result);
        } catch {
            return "Network error";
        }
    }
    useEffect(() => {
        if (!token) return;
        me();
    }, [token]);

    useEffect(() => {
        const localStorageToken = localStorage.getItem("token");
        if (!localStorageToken) return;
        setToken(localStorageToken);
    }, []);

    return (
        <UserContext value={{ token, user, registration, login }}>
            {children}
        </UserContext>
    );
}
