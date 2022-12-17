import React , { createContext , useCallback } from "react";
import api from "../services/api";

interface SignInCredentials {
    email: string;
    password: string;
}

interface Props {
    children?: React.ReactNode;
}

interface AuthContextData {
    name: string;
    signIn(credentials: any): Promise<void>;

}

const AuthContext = createContext<AuthContextData>(
    {} as AuthContextData);

const AuthProvider: React.FC<Props> = ({ children }) => {
    const signIn = useCallback(async ({ email, password }:SignInCredentials ): Promise <void> => {
        const response = await api.post('sessions', {
            email ,
            password,
        });

        console.log(response.data);
    }, []);

    return (
        <AuthContext.Provider  value={{name: 'jhonattan', signIn}}>
            {children}
        </AuthContext.Provider>
    );
};

export {AuthContext, AuthProvider};