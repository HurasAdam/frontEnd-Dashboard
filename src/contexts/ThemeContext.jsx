
import { createContext, useReducer } from "react"
import {themeReducer} from "../reducers/themeReducer"
export const ThemeContext=createContext();

export const ThemeContextProvider=({children})=>{



const [state,dispatch]=useReducer(themeReducer,{theme:{mode:'light',color:'rgb(92, 92, 92)'}});
    return (
        <ThemeContext.Provider value={{...state,dispatch}}>
            {children}
        </ThemeContext.Provider>
    )

}

    
