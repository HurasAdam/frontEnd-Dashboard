
import { DataGrid } from "@mui/x-data-grid";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import "./projectList.css";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";


export const ProjectsList = () => {
  const [pageState,setPageState]=useState(0)

    const [data,isLoading,error]=useFetch(`http://127.0.0.1:3000/api/projects?page=${pageState}`)
const {user}=useContext(AuthContext)



// useEffect(()=>{

// if(data){
//   setPageState((old)=>({...old,isLoading:false,data:data.projects,total:data.total,pageSize:data.itemPerPage}))
// }
 


 
// },[data])


  const columns = [
  
    { field: "title", headerName: "Title", width: 300, flex: 0.4 },
    { field: "status", headerName: "Status", width: 50, flex: 0.2 },
    { field: "createdAt", headerName: "Date", width: 140, flex: 0.5 },
    {
      field: "action",
      headerName: "Action",
      width: "100",
      renderCell: (params) => {
        return (
          <>
            <Link to={`/projects/${params.row.id}/`}>
              <VisibilityOutlinedIcon className="TicketListActionIcon" />
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <div className="projectList">
      <div className="actionWrapper">
        <span className="projectListHeaderTitle">Current Projects</span>
        {user.role==='admin'?
        <Link to="/NewProject">
         
        
          <button>New project</button>

        </Link>
:null}
      </div>
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      {data && (
        <DataGrid
pagination={true}
          autoHeight={true}
          rowHeight={40}
          rowCount={data.total}
          rows={data.projects}
          columns={columns}
          paginationMode="server"
          page={pageState}
          pageSize={data.itemPerPage}
          checkboxSelection={false}
          disableSelectionOnClick
          onPageChange={()=>setPageState(pageState+1)}
         
          
        />
      )}
    </div>
  );
};
