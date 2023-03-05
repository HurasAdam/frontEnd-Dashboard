import { createContext, useEffect, useReducer } from "react"
import { authReducer } from "../reducers/authReducer"

export const AuthContext= createContext()
export const AuthContextProvider=({children})=>{

    useEffect(()=>{

const user= JSON.parse(localStorage.getItem('user'))

if(user){
    dispatch({type:"LOGIN",payload:user})
}
    },[])
    

const [state,dispatch]=useReducer(authReducer,{user:null})
    return(
        <AuthContext.Provider value={{...state,dispatch}} >
            {children}
        </AuthContext.Provider>
    )
}