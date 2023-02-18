import './userList.css';
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { userRows } from '../../dummyData';


const UserList=()=>{
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'userName', headerName: ' Username', width: 150, renderCell:(params)=>{
            return(
                <div className='userListUser'>
                    <img className='userListUserImg' src={params.row.avatar} alt="" />
                    {params.row.userName}
                </div>
            )
        } },
        { field: 'email', headerName: 'Email', width: 180 },
        {
          field: 'status',
          headerName: 'Status',
         
          width: 120,
        },
        {
            field:'transaction',
            headerName:'Transaction Vol',
            width:150,
        },
        {
            field:'action',
            headerName:'Action',
            width:150,
            renderCell:(params)=>{
                return(
                    <>
                    <button className="userListEdit">Edit</button>
                    <DeleteOutlineIcon className="userListDelete"/>
                    </>
                )
            }
        }
      ];
      
    
    return(
        <div className="userList">
          
       
                <DataGrid  className='dataGrid'
        rows={userRows}
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