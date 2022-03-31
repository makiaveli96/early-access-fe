import React, { useState, createContext } from 'react'


export const AuthContext = createContext<any | undefined>(undefined);

function AuthContextApi(props) {

    const [ auth, setAuth ] = useState(false);
    const [ userDetails, setUserDetails ] = useState<any>({});

    const allValues = {
        auth, 
        setAuth, 
        userDetails, 
        setUserDetails, 
     };
     
    
    return (
        <AuthContext.Provider value={allValues}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextApi
