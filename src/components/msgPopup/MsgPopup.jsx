import "../../components/msgPopup/msgPopup.css"



export const MsgPopup=({showMsgPopup})=> {
  return (
    <div className="msgPopup-container">{showMsgPopup.message}</div>
  )
}
