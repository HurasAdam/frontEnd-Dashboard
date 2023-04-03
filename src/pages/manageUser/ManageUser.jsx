import {User} from"../user/User"
import "../manageUser/manageUser.css"
export const ManageUser=()=>{

    return(
        <div className="manageUser">
<User isEditLocked={true} link={`/manageUsers`}></User>
        </div>
    )
}