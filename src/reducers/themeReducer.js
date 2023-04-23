export const themeReducer=(state,action)=>{


    switch(action.type){
        case"LIGHT":
        return{theme:{mode:action.payload.mode,color:action.payload.color}}

        case"DARK":
        return{theme:action.payload};
    
    }
}