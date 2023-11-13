import "../../components/msgPopup/msgPopup.css"

export const MsgPopup=({showMsgPopup})=> {
// const {message,success} = showMsgPopup


if(showMsgPopup?.success){
    return  (<div className="msgPopup-container__success">{showMsgPopup?.message}</div>)
}
else{
    return (<div className="msgPopup-container__error">{showMsgPopup?.message}</div>)
}
  
}
