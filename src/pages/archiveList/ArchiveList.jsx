import { DataGrid } from '@mui/x-data-grid';
import { PaginationNavbar } from "../../components/PaginationNavBar/PaginationNavbar";
import '../archiveList/archiveList.css'
import { useFetch } from '../../hooks/useFetch';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {ObjectDateToString} from '../../utils/ObjectDateToString'
import { ThemeContext } from '../../contexts/ThemeContext'
export const ArchiveList =()=>{
  const {theme}=useContext(ThemeContext)
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
  


  const [data,isLoading,error]=useFetch('http://127.0.0.1:3000/api/notes/archived')
  console.log(data)
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
    {field:'createdAt',headerName:'Date',width: 160,flex:0.5,valueFormatter: ({value} ) =>ObjectDateToString(value.split(',')[0] ) },
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

return(

<div className="archiveList">
 
{error&&<div>{error}</div>}
      {isLoading&& <div>Loading...</div>}
      {pageState.tickets?<DataGrid className="DataGrid"   autoHeight={false}
      rowHeight={40}
     hideFooterSelectedRowCount={true}
      
        rows={pageState.tickets}
        columns={columns} 
        pageSize={15}
        rowsPerPageOptions={[10]}
        checkboxSelection={false}
        disableSelectionOnClick
        hideFooter={true}
   
        
      />:null}
<PaginationNavbar pageState={pageState} handleSelectPage={handleSelectPage} theme={theme}/>
    </div>
)
}
