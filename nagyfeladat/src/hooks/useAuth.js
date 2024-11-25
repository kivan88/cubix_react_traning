import React, {useCallback, useContext, useState} from 'react';

const AuthContext = React.createContext();
AuthContext.displayName = 'AuthContext';

export function AuthContextProvider({children}) {
    const [authToken, setAuthToken] = useState(false);
    const [user, setUser] = useState({});

    const handleLoginResult = useCallback(
        (loginResult) => {
        setAuthToken(loginResult.token);
        setUser(loginResult.user);
    }, [setAuthToken, setUser]);

    // useEffect(() => {
    //     const user = localStorage.getItem('user');
    //     if (user) {
    //         setUser(JSON.parse(user));
    //     }
    //     setLoading(false);
    // }, []);

    const logout = useCallback(() => {
        handleLoginResult({token: false, user: {}});
    }, [handleLoginResult]);

    return (
        <AuthContext.Provider value={{authToken, user, handleLoginResult, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}