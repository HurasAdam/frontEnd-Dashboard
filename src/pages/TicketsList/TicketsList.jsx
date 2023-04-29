import "./ticketsList.css";
import { DataGrid } from '@mui/x-data-grid';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from '../../contexts/ThemeContext'
import { PaginationNavbar } from "../../components/PaginationNavBar/PaginationNavbar";
import { AuthContext } from "../../contexts/AuthContext";

export const TicketsList = () => {

const {theme}=useContext(ThemeContext)
const {user}=useContext(AuthContext)
const [pageState,setPageState]=useState({
  page: 1,
  total: 0,
  pageSize: 10,
  tickets:''
})

const handleSelectPage = (e, action) => {
  e.preventDefault();
  setPageState({ ...pageState, page: action });
};


// const getTicketList =async ()=>{

//   const response = await fetch(`http://127.0.0.1:3000/api/notes?page=${pageState.page}`,{
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${user.token}`,
//   }
//   })
//   const json =await response.json()
//   console.log(json)
//   setPageState({...pageState,
//     page:json.page,
//     total:json.total,
//     pageSize:json.pageSize,
//     tickets:json.tickets})
// }


  const [data,isLoading,error]=useFetch(`http://127.0.0.1:3000/api/notes?page=${pageState.page}`)

  useEffect(()=>{
    if(data){
      setPageState(data)
      
    }
    
    
    },[data])


  const columns = [
    
    { field: 'title', headerName: 'Title', width: 200,flex:0.9 },
    { field: 'type', headerName: 'Type', width: 100,flex:0.9 },
    {field: 'status',headerName: 'Status',width: 90,renderCell:(params)=>{
      return(
        <button className={params.row.status}>{params.row.status}</button>
      )
    }},
    {field: 'priority',headerName: 'Priority',width: 90,renderCell:(params)=>{
      return(
        <button className={params.row.priority}>{params.row.priority}</button>
      )
    }},
    {field:'createdAt',headerName:'Date',width: 160,flex:0.5,valueFormatter: ({value} ) => value.split(',')[0] },
    {field:'action',headerName:'Action',width:100, renderCell:(params)=>{
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
    <div className="ticketsList" id={theme.mode}>
      <div className="actionWrapper">
        <span className="ticketListHeaderTitle">Current Tickets</span>
        <Link to="/Newticket">
          <button className="newTicketButton" id={theme.mode} >New ticket</button>
        </Link>
      </div>
      {error&&<div>{error}</div>}
      {isLoading&& <div>Loading...</div>}
      {pageState.tickets?<DataGrid className="DataGrid"   autoHeight={false}
      rowHeight={40}
     hideFooterSelectedRowCount={true}
      
        rows={pageState.tickets}
        columns={columns} 
        pageSize={17}
        rowsPerPageOptions={[10]}
        checkboxSelection={false}
        disableSelectionOnClick
        hideFooter={true}
        
      />:null}
<PaginationNavbar pageState={pageState} handleSelectPage={handleSelectPage} theme={theme}/>
    </div>
  );
};
