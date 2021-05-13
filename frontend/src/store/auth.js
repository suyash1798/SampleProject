import axios from "axios";
import { createContext, useState } from "react";
import { getLocalStorageToken } from "../shared/auth";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

export function AuthContextProvider(props) {
    const [user,setUser] = useState(null)
    console.log('here')
    const setUserDetails = (user) => {
        setUser(user);
        axios.defaults.headers = {authorization: `Bearer ${getLocalStorageToken()}`}
    }
    
    if(!user && getLocalStorageToken()){
        const {data} = jwt_decode(getLocalStorageToken())
        console.log(data);
        setUserDetails(data);    
    }
    
    const context = {
        user,
        setUserDetails 
    }
    
    return <AuthContext.Provider value={context} >
        {props.children}
    </AuthContext.Provider>
}

