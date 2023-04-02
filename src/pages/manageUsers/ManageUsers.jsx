import UserList from "../userList/UserList"
import "./manageUsers.css"
import { Link } from "react-router-dom"

export const ManageUsers=()=>{

    return(
        <div className="manageUsers">
<UserList></UserList>
        </div>
    )
}