import { createContext, useState, Dispatch, SetStateAction } from "react";

interface AuthContextInterface {
    email: string | null;
    setEmail: Dispatch<SetStateAction<string | null>>;
    accessToken: string | null;
    setAccessToken: Dispatch<SetStateAction<string | null>>;
    isAuthenticated: boolean;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    loadingAuth: boolean;
    setLoadingAuth: Dispatch<SetStateAction<boolean>>;
    errors: Array<string>;
    setErrors: Dispatch<SetStateAction<Array<string>>>;
    userId: number | null;
    setUserId: Dispatch<SetStateAction<number | null>>;
    userName: string | null;
    setUserName: Dispatch<SetStateAction<string | null>>;
}

const defaultValues = {
    email: null,
    setEmail: () => { },
    accessToken: null,
    setAccessToken: () => { },
    isAuthenticated: false,
    setIsAuthenticated: () => { },
    loading: false,
    setLoading: () => { },
    loadingAuth: true,
    setLoadingAuth: () => { },
    errors: [],
    setErrors: () => { },
    userId: null,
    setUserId: () => { },
    userName: null,
    setUserName: () => { }
}

export const AuthContext = createContext<AuthContextInterface>(defaultValues);

interface AuthProviderInterface {
    children: JSX.Element;
}

export const AuthProvider = ({ children }: AuthProviderInterface) => {
    const [email, setEmail] = useState<string | null>(defaultValues.email);
    const [accessToken, setAccessToken] = useState<string | null>(
        defaultValues.accessToken
    );
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        defaultValues.isAuthenticated
    );
    const [loading, setLoading] = useState<boolean>(defaultValues.loading);
    const [loadingAuth, setLoadingAuth] = useState<boolean>(
        defaultValues.loadingAuth
    );
    const [errors, setErrors] = useState<Array<string>>(defaultValues.errors);
    const [userId, setUserId] = useState<number | null>(defaultValues.userId);
    const [userName, setUserName] = useState<string | null>(defaultValues.userName);

    return (
        <AuthContext.Provider
            value={{
                email,
                setEmail,
                accessToken,
                setAccessToken,
                isAuthenticated,
                setIsAuthenticated,
                loading,
                setLoading,
                loadingAuth,
                setLoadingAuth,
                errors,
                setErrors,
                userId,
                setUserId,
                userName,
                setUserName
            }}
        >
            {children}
        </AuthContext.Provider>

    )
}   