import axios from "axios";
import { createContext, useState } from "react";
import { getLocalStorageToken } from "../shared/auth";

export const AuthContext = createContext();

export function AuthContextProvider(props) {
    const [user,setUser] = useState(null)
    
    const setUserDetails = (user) => {
        setUser(user);
        axios.defaults.headers = {authorization: `Bearer ${getLocalStorageToken()}`}
    }
    
    const context = {
        user,
        setUserDetails 
    }
    
    return <AuthContext.Provider value={context} >
        {props.children}
    </AuthContext.Provider>
}

