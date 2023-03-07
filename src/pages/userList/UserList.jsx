import './userList.css';
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { userRows } from '../../dummyData';
import { Link } from 'react-router-dom';
import {useState} from 'react';


const UserList=({setUserData})=>{

    const [data,setData]=useState(userRows);
    
const handleEditUser=(id)=>{
    const targetedUser=data.filter((user)=>user.id===id)
    const [user]=targetedUser
   
    setUserData(user)
}

    const handleDelete =(id)=>{
setData(data.filter((item)=>item.id!==id))
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70,flex: 1 },
        { field: 'userName', headerName: ' Username', width: 250,flex: 1, renderCell:(params)=>{
            return(
                <div className='userListUser'>
                    <img className='userListUserImg' src={params.row.avatar} alt="" />
                    {params.row.userName}
                </div>
            )
        } },
        { field: 'email', headerName: 'Email', width: 180,flex: 1 },
        {
          field: 'status',
          headerName: 'Status',
         
          width: 120,flex: 1
        },
        {
            field:'role',
            headerName:'Role',
            width:150,flex: 1
        },
        {
            field:'action',
            headerName:'Action',
            width:150,flex: 1,
            renderCell:(params)=>{
                return(
                    <>
               <Link to={{
                pathname:`/user/${params.row.id}`,}}>
                    <button onClick={()=>handleEditUser(params.row.id)} className="userListEdit">Edit</button>
                    </Link>
                    <DeleteOutlineIcon className="userListDelete " onClick={()=>handleDelete(params.row.id)}/>
                    </>
                )
            }
        }
      ];
      
    
    return(
        <div className="userList">
          
       
                <DataGrid  className='dataGrid'
                autoHeight={true}
        rows={data}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
            </div>
       
    )
}

export default UserList;