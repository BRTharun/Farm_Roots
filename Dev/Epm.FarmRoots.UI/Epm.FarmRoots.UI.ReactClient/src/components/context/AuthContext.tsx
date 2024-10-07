import React, {createContext, useState, ReactNode, useCallback, useContext} from "react";

interface User {
    name: string;
    email: string;
    phone : string;
    role: string;
}

interface AuthContextType {
    user : User | null;
    register : (name : string, email: string, phone: string, password : string, role: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider : React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const register = useCallback (async (name : string, email: string, phone: string, role: string ) => {
        console.log("Registering user:", name, email, phone, role);
        setUser({name, email, phone, role});
    },[]);

    return (
        <AuthContext.Provider value={{user, register}}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};


export default AuthContext;