export const themeReducer=(state,action)=>{


    switch(action.type){
        case"LIGHT":
        return{theme:{sidebar:state.theme.sidebar,mode:action.payload.mode}}

        case"DARK":
        return{theme:{mode:state.theme.mode,sidebar:action.payload.sidebar}}
    
    }
}
