
import { createContext, useEffect, useReducer } from "react"
import {themeReducer} from "../reducers/themeReducer"
export const ThemeContext=createContext();

export const ThemeContextProvider=({children})=>{

useEffect(()=>{
const mode = localStorage.getItem('mode')
const sidebar = localStorage.getItem('sidebar')


if(mode){
    dispatch({ type: "LIGHT", payload: {mode:mode} });
}
if(sidebar){
    dispatch({type:'DARK',payload:{mode:state.mode,sidebar:sidebar}})
}
},[])

const [state,dispatch]=useReducer(themeReducer,{theme:{mode:'light',sidebar:''}});
    return (
        <ThemeContext.Provider value={{...state,dispatch}}>
            {children}
        </ThemeContext.Provider>
    )

}

    
