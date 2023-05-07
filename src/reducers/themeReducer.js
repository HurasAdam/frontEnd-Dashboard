export const themeReducer=(state,action)=>{


    switch(action.type){
        case"LIGHT":
        return{theme:{mode:action.payload.mode,sidebar:action.payload.sidebar}}

        case"DARK":
        return{theme:{mode:state.theme.mode,sidebar:action.payload.sidebar}}
    
    }
}
