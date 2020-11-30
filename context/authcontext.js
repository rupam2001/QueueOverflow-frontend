import React, { useState } from 'react';
const AuthContext = React.createContext(null)


export default function AuthContextProvider(props) {

    const [isLogin, setIsLogin] = useState(false);


    return (
        <AuthContext.Provider
            value={{
                isLogin, setIsLogin
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}