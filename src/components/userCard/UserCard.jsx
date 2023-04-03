import { useParams } from "react-router-dom"
import { User } from "../../pages/user/User"
import "../userCard/userCard.css"

export const UserCard=()=>{
    const { userId } = useParams();
    
    return(
        <div className="userCard">

            <User isEditLocked={false}></User>
      
        </div>
    )
}

