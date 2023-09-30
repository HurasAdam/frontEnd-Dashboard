import "./projectDetails.css";
import { NavLink } from "react-router-dom";
import Select from "react-select";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import BugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useQuery, useMutation, useQueryClient, useQueries } from "react-query";
import {
  getProject,
  deleteProject,
  updateProject,
} from "../../features/projectApi/projectApi";

import { getUserList,getProjectContributorList } from "../../features/userApi/userApi";
import axios from "axios";
import { QueryClient } from "@tanstack/react-query";
export const ProjectDetails = () => {
  const { projectId } = useParams();
  const [updateError, setUpdateError] = useState(null);
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [isDeleted, setIsDeleted] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [check, setCheck] = useState();
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription,setProjectDescription]=useState('');
  const [projectContributors,setProjectContributors]=useState([]);
  const [projectLeader,setProjectLeader]=useState('');
  const [userList,setUserList]=useState([]);
  const {isLoading,isError,error,data}=useQuery(["project"],()=>getProject(user.token, projectId))
  const {data:users}=useQuery(["contributorList"],()=>getProjectContributorList(),{
    refetchOnWindowFocus:false,
    enabled:false
  })

useEffect(()=>{
setProjectTitle(data?.projectTitle);
setProjectDescription(data?.projectDescription);
setProjectContributors(data?.contributors);
setProjectLeader(data?.projectLeader)

},[data])


console.log(users)




  //   const [data, isLoading, error] = useFetch(
  //     `http://localhost:3000/api/projects/${projectId}/`
  //   );





  const handleChange = (selectedOption) => {
    // setProjectData({
    //   ...projectData,
    //   contributors: [...projectData.contributors, selectedOption],
    // });
    // setUserList(userList.filter((user) => user !== selectedOption));
//  setProjectData({...projectData,contributors:[...projectData.contributors,selectedOption._id]})
console.log(selectedOption._id)
  };


  // const { isLoading, isError, error, data } = useQueries([
  //   {
  //     queryKey: "project",
  //     queryFn: () => getProject(user.token, projectId),
  //   },


  // ]);



  //get list of users for change PM select
  // const getAllUsers = async () => {
  //   const response = await fetch(
  //     `http://127.0.0.1:3000/api/user?changePM&&project=${projectId}`,
  //     {
  //       headers: { Authorization: `Bearer ${user.token}` },
  //     }
  //   );

  //   const json = await response.json();
  //   console.log(json);
  //   const arr = json.map((user) => {
  //     return { value: user._id, name: user.name + " " + user.surname };
  //   });
  //   setCheck(arr);
  // };

  // useEffect(() => {
  //   if (data) {
  //     setProjectData({
  //       ...projectData,
  //       projectTitle: data.projectTitle,
  //       projectLeader: {
  //         id: data.projectLeader.projectLeaderId,
  //         name: data.projectLeader.name + " " + data.projectLeader.surname,
  //       },
  //       _id: data.projectId,
  //       contributors: data.contributors,
  //       createdAt: data.createdAt,
  //       description: data.description,
  //     });
  //   }
  // }, [data]);

  // const getUserList = async () => {
  //   const response = await fetch(
  //     `http://127.0.0.1:3000/api/user?project=${projectId}`,
  //     {
  //       headers: { Authorization: `Bearer ${user.token}` },
  //     }
  //   );

  //   const json = await response.json();
  //   setUserList(json);
  // };

  // const kekw = (confirm) => {
  //   if (confirm === "delete") {
  //     deleteMutation.mutate();
  //   } else {
  //     setFetchError("inncorect command");
  //   }
  // };
  // const handleDelete = async () => {
  //   const response = await fetch(
  //     `http://127.0.0.1:3000/api/projects/${projectId}`,
  //     {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     }
  //   );
  //   try {
  //     if (response.status === 409) {
  //       throw Error(
  //         "Can not delete project due to other references.Check ticket list "
  //       );
  //     }
  //     if (response.ok) {
  //       setFetchError("");
  //       navigate("/projects");
  //     }
  //   } catch (Error) {
  //     setFetchError(Error.message);
  //   }
  // };

  // const handleSelectChange = (event) => {
  //   const selectedOptionIndex = event.target.selectedIndex;
  //   const selectedOptionValue = event.target.value;
  //   const selectedOptionLabel =
  //     event.target.options[selectedOptionIndex].textContent;

  //   setProjectData({
  //     ...projectData,
  //     projectLeader: { id: selectedOptionValue, name: selectedOptionLabel },
  //   });
  // };

  // const handleDataUpdate = async (e) => {
  //   const response = await fetch(
  //     `http://127.0.0.1:3000/api/projects/${projectId}`,
  //     {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${user.token}`,
  //       },

  //       body: JSON.stringify({
  //         ...projectData,
  //         projectLeader: projectData.projectLeader?.id,
  //       }),
  //     }
  //   );
  //   if (response.ok) {
  //     navigate("/projects");
  //   }
  // };


function handleContributorRemove(e){
e.preventDefault();
console.log('dziala')

}

  const columns = [
    { field: "name", headerName: "Name", width: 200, flex: 0.7 },
    { field: "surname", headerName: "Surname", width: 200, flex: 0.7 },
    { field: "email", headerName: "Email", width: 200, flex: 0.7 },
    { field: "role", headerName: "Role", width: 300, flex: 0.9 },
    {
      field: "action",
      headerName: "Action",
      width: "100",
      renderCell: (params) => {
        return (
          <>
            <button
            className="contributorRemoveBtn"
              disabled={isDisabled}
              onClick={(e) =>handleContributorRemove(e)}
            >
              Remove
            </button>
          </>
        );
      },
    },
  ];

  return (
     <div className="projectDetails">
       <div className="projectHeaderContainer">
        <span className="projectHeaderIcon">
          <AssessmentOutlinedIcon className="headerIcon" />
        </span>
        <h3 className="projecttHeaderTitle">Project Details</h3>
       </div>
      <div className="projectDataContainer">
        <div className="projectDataContainerLeft" id={theme.mode}>
           <div className="projectDataContainerTop"></div>
           <div className="projecttDataBottom">
             <form action="">
               <div className="projectDataBottomItemsWrapper">
                 <div className="projectDataBottomItemsLeft">
                   <div className="projectDataBottomItem">
                    <label htmlFor="">Project title :</label>
                   {data && (
                    <input
                      type="text"
                         required
                     defaultValue={data?.projectTitle}
                        onChange={(e) =>
                          setProjectTitle( e.target.value,)
                       }
                         disabled={isDisabled}
                       />
                     )}
                   </div>
                   <div className="projectDataBottomItem">
                   <label htmlFor="">Project Description</label>
                     {data && (
                       <textarea
                         defaultValue={data?.description}
                         disabled={isDisabled}
                         onChange={(e) =>
                          setProjectDescription(
                           e.target.value,
                           )
                         }
                     ></textarea>
                     )}
                   </div>
                 </div>
                 <div className="projectDataBottomItemsRight">
                   <div className="projectDataBottomItem">
                     <label htmlFor="">Project leader</label>
                     {data && (
                       <img
                         className="projectDataBottomItem-img"
                         src={data.projectLeader.userAvatar}
                         alt=""
                       />
                     )}
                     {data && (
                       <select
                         defaultValue={data?.projectLeader?.name}
                         disabled={isDisabled}
                         // onChange={(e) =>
                         //   setProjectData({
                         //     ...projectData,
                         //     projectLeader: e.target.dataset

                         //   })
                         // }
                     
                       >
                         <option selected hidden={!isDisabled}>
                           {`${data?.projectLeader?.name}`}
                         </option>
                         {check
                           ? check.map((user) => {
                               return (
                                 <option
                                   value={user.value}
                                   key={user.value}
                                   data-name={`${user.name}`}
                                   disabled={
                                     user.value === projectData.projectLeader.id
                                 }
                                   selected={
                                     user.value === projectData.projectLeader.id
                                   }
                                 >
                                   {user.name}
                                 </option>
                               );
                             })
                           : null}
                       </select>
                   )}
                   </div>
                  {
                     <div className="projectDataBottomItem">
                       <label htmlFor="">Created At :</label>
                       {data &&data[0]&& (
                         <input
                           type="text"
                           defaultValue={`${data[0].createdAt.Day}/${data[0].createdAt.Month}/${data.createdAt.Year}`}
                           disabled={true}
                         />
                       )}
                     </div>
                   }
                 </div>
               </div>
               <div className="projectDataBottomItem">
                 {data?.contributors && (
                   <DataGrid
                     className="DataGrid"
                     autoHeight={true}
                     getRowId={(row) => row.contributorId}
                     rowHeight={40}
                     rows={data?.contributors}
                     columns={columns}
                     pageSize={5}
                     rowsPerPageOptions={[10]}
                     checkboxSelection={false}
                     disableSelectionOnClick
                     hideFooter={true}
                  />
                 )}
               </div>
               <div className="projectDataBottomItem">
                 <label>Add member</label>
               <Select
                   isDisabled={isDisabled}
                   className="selectList"
                   options={userList&&userList}
                   isSearchable
                   getOptionLabel={(option) =>
                     `${option.name} ${option.surname}`
                   }
                   getOptionValue={(option) => option._id}
                   onChange={handleChange}
               
                 />
              </div>

               {isDeleted ? (
               <div>
                   <p>
                     Are your sure you want to delete this project? Insert Delete
                     to confirm
                   </p>
                   <input
                     onChange={(e) => setConfirmDelete(e.target.value)}
                     type="text"
                   />
                   <button
                     onClick={(e) => {
                       e.preventDefault();
                       kekw(confirmDelete, user.token, projectId);
                     }}
                   >
                     Confirm
                   </button>
                 <button
                     onClick={(e) => {
                       e.preventDefault();
                       setIsDeleted(false);
                       setFetchError(false);
                     }}
                   >
                     Cancel
                   </button>
                 </div>
               ) : (
                 <div className="projectDataBottomItem-Btns">
                   {isDisabled ? (
                     <button
                       onClick={(e) => {
                         e.preventDefault();
                         getProjectContributorList(user.token,projectId)
                         .then((updatedContributorList) => {
                          // Zaktualizuj stan komponentu z nową listą kontrybutorów
                         setUserList(updatedContributorList)
                         setIsDisabled(false);
                         
                       })}}
                   >
                       Edit
                     </button>
                   ) : (
                     <button
                      onClick={(e) => {
                         e.preventDefault();
                         updateMutation.mutate();
                        
                       setIsDisabled(!isDisabled);
                     }}
                    >
                     Save
                    </button>
                 )}
                 <button
                   onClick={(e) => {
                     e.preventDefault();
                     setIsDeleted(true);
                  }}
                >
                 Delete
                 </button>
               </div>
             )}
              {fetchError && <span className="error">{fetchError}</span>}
            </form>
          </div>
         <div>
           <Outlet />
           </div>
       </div>
      </div>
   </div>
   );
};
