import { createContext, useReducer } from "react"
import { authReducer } from "../reducers/authReducer"

export const AuthContext= createContext()
export const AuthContextProvider=({children})=>{

    

const [state,dispatch]=useReducer(authReducer,{user:null})
    return(
        <AuthContext.Provider value={{...state,dispatch}} >
            {children}
        </AuthContext.Provider>
    )
}