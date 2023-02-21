import "./ticketsList.css";
import { DataGrid } from '@mui/x-data-grid';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';



import { userRows, ticketRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const TicketsList = ({ setEditTicketData }) => {
  const [data, setData] = useState(null);
const [search,setSearch]=useState('')


const handleItemFilter=()=>{

if(search){
  setData(search)
}
else{

}
}

  useEffect(() => {
    getTicket();
  }, []);

  const getTicket = () => {
    fetch("http://127.0.0.1:3000/api/notes/")
      .then((res) => res.json())
      .then((res) => setData(res));
  };


  const handleEditUser = (id) => {
    const targetedUser = data.filter((user) => user.id === id);
    const [user] = targetedUser;
    setEditTicketData(user);
    console.log(user);
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 200,flex:0.9 },
    { field: 'title', headerName: 'Title', width: 200,flex:0.9 },
    { field: 'type', headerName: 'Type', width: 100,flex:0.9 },
    {field: 'status',headerName: 'Status',width: 90,flex:0.9},
    {field: 'priority',headerName: 'Priority',width: 90,flex:0.9},
    {field:'date',headerName:'Date',width: 160,flex:0.9},
    {field:'action',headerName:'Action',width:'150', renderCell:(params)=>{
      return(
<>
<Link to={`tickets/${params.row.id}/`}>
<VisibilityOutlinedIcon className="TicketListActionIcon" onClick={()=>handleEditUser(params.row.id)}/>
</Link>
<DeleteOutlineOutlinedIcon className="TicketListActionIcon delete"/>
</>
      ) }
    }
    
  ];


  return (
    <div className="ticketsList">
      <div className="actionWrapper">
        <span className="ticketListHeaderTitle">Current Tickets</span>
        <Link to="/Newticket">
          <button onClick={()=>handleEditUser()}>New ticket</button>
        </Link>
      </div>
      {data&&<DataGrid autoHeight={false}
      rowHeight={40}
      
        rows={data}
        columns={columns} 
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
        
      />}

    </div>
  );
};
