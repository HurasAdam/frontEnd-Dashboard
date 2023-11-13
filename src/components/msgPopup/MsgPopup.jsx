import "../../components/msgPopup/msgPopup.css"
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
export const MsgPopup=({showMsgPopup,setShowMsgPopup})=> {

const handleClose=(e,popupSetter)=>{
e.preventDefault()
    popupSetter((prevState)=>{
        return{...prevState,visible:false,message:"",success:null}
    })
}

if(showMsgPopup?.success){
    return  (<div className="msgPopup-container__success">
          <div class="progress-bar-container">
    <div class="progress-bar"></div>
  </div>
        <span>{showMsgPopup?.message}</span>
        <div  className="popup__btn__wrapper">
        <CloseOutlinedIcon 
       onClick={(e)=>handleClose(e,setShowMsgPopup)}
       className="popup__btn"/>
        </div>
   
    </div>)
}
else{
    return (<div className="msgPopup-container__error">
                  <div class="progress-bar-container">
    <div class="progress-bar"></div>
  </div>
         <span>{showMsgPopup?.message}</span>
         <CloseOutlinedIcon 
         onClick={(e)=>handleClose(e,setShowMsgPopup)}
         className="popup__btn"/>
    </div>)
}
  
}
