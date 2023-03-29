import './userList.css';
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { userRows } from '../../dummyData';
import { Link } from 'react-router-dom';
import {useState} from 'react';
import { useFetch } from '../../hooks/useFetch';

const UserList=({setUserData})=>{

    const [data, error, isLoading] = useFetch("http://127.0.0.1:3000/api/user");
    const [xd,setData]=useState(userRows);
    console.log(data)
const handleEditUser=(id)=>{
    const targetedUser=data.filter((user)=>user.id===id)
    const [user]=targetedUser
   
    setUserData(user)
}

    const handleDelete =(id)=>{
setData(data.filter((item)=>item.id!==id))
    }

    const columns = [
        { field: '_id', headerName: 'ID', width: 70,flex: 1 },
        { field: `name`, headerName: ' Username', width: 250,flex: 1, renderCell:(params)=>{
            return(
                <div className='userListUser'>
                    <img className='userListUserImg' src={params.row.userAvatar} alt="" />
                    {`${params.row.name} ${params.row.surname}`}
                </div>
            )
        } },
        { field: 'email', headerName: 'Email', width: 180,flex: 1 },
        
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
          
       
               {data&& <DataGrid  className='dataGrid'
                autoHeight={true}
               getRowId={(row)=>row._id}
        rows={data}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />}
            </div>
       
    )
}

export default UserList;