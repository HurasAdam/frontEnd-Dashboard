import { DataGrid } from "@mui/x-data-grid";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import "./projectList.css";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ThemeContext } from '../../contexts/ThemeContext';
import { PaginationNavbar } from "../../components/PaginationNavBar/PaginationNavbar";

import { useQuery,useMutation,useQueryClient } from "react-query";
import axios from 'axios';
import {getProjectList} from "../../features/projectApi/projectApi"


export const ProjectsList = () => {
  const [pageState, setPageState] = useState({
    page: 1,
    total: 0,
    pageSize: 10,
    projects: 0,
  });


 
  const prev = pageState.page <= 1 || pageState.total <= 1;
  const next = pageState.total <= 1 || pageState.page === pageState.total;

  // const [data, isLoading, error] = useFetch(
  //   `http://127.0.0.1:3000/api/projects?page=${pageState.page}`
  // );
  const { user } = useContext(AuthContext);
const {theme}=useContext(ThemeContext)
const queryClient=useQueryClient()

const handleSelectPage = (e, action) => {
  e.preventDefault();
  setPageState({ ...pageState, page: action });
};

console.log(user)
  
  // useEffect(() => {
  //   if (data) {
  //     setPageState({
  //       ...pageState,
  //       total: data.total,
  //       pageSize: data.pageSize,
  //       projects: data.projects
  //     });
  //   }
  // }, [data]);
// REACT QUERY//
const {isLoading,isError,error,
data:projects}=useQuery(["projects",pageState.page],()=>getProjectList(user.accessToken,pageState.page),{

})


console.log(projects&&projects)


  const columns = [
    { field: "title", headerName: "Title", width: 300, flex: 0.4 },
    {field:"projectLeader",headerName:'PM',width:300,renderCell:(params)=>{
      return(
        <>
        <div className='userListUser'>
        <img className='userListUserImg' src={params.row.projectLeader.userAvatar} alt="" />
       <span> {`${params.row.projectLeader.name} ${params.row.projectLeader.surname}`}</span>
        </div>
        </>
      )
    }},
    {
      field: "createdAt",
      headerName: "Date",
      width: 140,
      flex: 0.5,
      valueFormatter: ({ value }) =>
        `${value.Day}/${value.Month}/${value.Year}`,
    },
 
    {
      field: "action",
      headerName: "Action",
      width: "130",
      renderCell: (params) => {
        return (
          <>
            <Link to={`/projects/${params.row.id}/`}>
              <VisibilityOutlinedIcon className="TicketListActionIcon"  />
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <div className="projectList" id={theme.mode} >
      <div className="actionWrapper">
        <span className="projectListHeaderTitle">Current Projects</span>
        {user.role === "admin" ? (
          <Link to="/NewProject">
            <button id={theme.mode} className="newProjectButton">New project</button>
          </Link>
        ) : null}
      </div>
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      {projects && (
        <DataGrid 
        
        
          className="DataGrid"
          id={theme.mode}
          autoHeight={false}
          rowHeight={40}
          rows={projects.projects}
          columns={columns}
          checkboxSelection={false}
          disableSelectionOnClick
          hideFooter={true}
          pageSize={14}
          rowsPerPageOptions={[10]}
     
         
        />
      )}
      <PaginationNavbar pageState={pageState} max={projects?.total} handleSelectPage={handleSelectPage} theme={theme}/>
    </div>
  );
};
