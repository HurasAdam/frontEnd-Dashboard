import "./ticketsList.css";
import { DataGrid } from '@mui/x-data-grid';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";


export const TicketsList = () => {




  const [data,isLoading,error]=useFetch('http://127.0.0.1:3000/api/notes/')
  const columns = [
    { field: 'id', headerName: 'ID', width: 200,flex:0.9 },
    { field: 'title', headerName: 'Title', width: 200,flex:0.9 },
    { field: 'type', headerName: 'Type', width: 100,flex:0.9 },
    {field: 'status',headerName: 'Status',width: 90,flex:0.9},
    {field: 'priority',headerName: 'Priority',width: 90,flex:0.9},
    {field:'createdAt',headerName:'Date',width: 160,flex:0.9},
    {field:'action',headerName:'Action',width:'100', renderCell:(params)=>{
      return(
<>
<Link to={`/tickets/${params.row.id}/`}>
<VisibilityOutlinedIcon className="TicketListActionIcon"/>
</Link>
</>
      ) }
    }
    
  ];


  return (
    <div className="ticketsList">
      <div className="actionWrapper">
        <span className="ticketListHeaderTitle">Current Tickets</span>
        <Link to="/Newticket">
          <button >New ticket</button>
        </Link>
      </div>
      {error&&<div>{error}</div>}
      {isLoading&& <div>Loading...</div>}
      {data&&<DataGrid className="dataGrid"   autoHeight={true}
      rowHeight={40}
      
        rows={data}
        columns={columns} 
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection={false}
        disableSelectionOnClick
        
      />}

    </div>
  );
};
