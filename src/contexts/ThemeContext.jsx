
import { createContext, useEffect, useReducer } from "react"
import {themeReducer} from "../reducers/themeReducer"
export const ThemeContext=createContext();

export const ThemeContextProvider=({children})=>{

useEffect(()=>{
const mode = localStorage.getItem('mode')
const color = localStorage.getItem('color')

if(mode){
    dispatch({ type: "LIGHT", payload: {mode:mode,color:color} });
}
},[])

const [state,dispatch]=useReducer(themeReducer,{theme:{mode:'light',color:'rgb(92, 92, 92)'}});
    return (
        <ThemeContext.Provider value={{...state,dispatch}}>
            {children}
        </ThemeContext.Provider>
    )

}

    
