import "../../components/msgPopup/msgPopup.css"

export const MsgPopup=({showMsgPopup})=> {
const {message,success} = showMsgPopup
if(success){
    return  (<div className="msgPopup-container__success">{message}</div>)
}
else{
    return (<div className="msgPopup-container__error">{message}</div>)
}
  
}
