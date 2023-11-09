import "./projectDetails.css";
import { NavLink } from "react-router-dom";
import Select from "react-select";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import BugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import { useSocketListen } from "../../hooks/useSocketListen";
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
import { handleUpdateProject } from "../../shared/handleUpdateProject";
import { getProjectContributorList } from "../../features/userApi/userApi";
import { getAdminUsers } from "../../features/userApi/userApi";
import { mutationHandler } from "../../shared/mutationHandler";
import { handleDeleteProject } from "../../shared/handleDeleteProject";
import axios from "axios";
import { io } from "socket.io-client";
import { Description } from "@mui/icons-material";
// ----------------------------------IMPORTS-------------------------//


export const ProjectDetails = () => {
  const { projectId } = useParams();
  const queryClient= useQueryClient()  

useSocketListen(
  {
    event:"CollectionUpdate",
    queryKey:"project"
  }
)
  const [updateError, setUpdateError] = useState(null);
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [isDeleted, setIsDeleted] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [check, setCheck] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contributors, setContributors] = useState([]);
  const [avalibleContributors, setAvalibleContributors] = useState([]);
  const [leader, setLeader] = useState("");
 const [leaderList,setLeaderList]=useState([])
  const { isLoading, isError, error, data } = useQuery(["project"], () =>
    getProject(projectId),{
      refetchOnWindowFocus:false
    })

  const { data: users, refetch } = useQuery(
    ["contributorList"],
    () => getProjectContributorList(projectId),
    {
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: (userList) => {
        const avalibleContributorList = userList.filter(
          (user) => !contributors.some((c) => user._id === c.id)
        );
        setAvalibleContributors(avalibleContributorList);
      },
    }
  );

const {data:pmList,refetch:refetchPmList}=useQuery(["pmList"],()=>getAdminUsers(),
{
  refetchOnWindowFocus: false,
  enabled: false,
  onSuccess: (userList) => {
    setLeaderList(userList)
  },
}
)

const xd = leaderList.filter((user)=>user._id!==leader._id)

const updateMutation=mutationHandler(updateProject,()=>queryClient.invalidateQueries(["project"]))
const deleteMutation= mutationHandler(deleteProject,()=>navigate("/projects"))

  useEffect(() => {
    if (data) {
      setTitle(data?.title);
      setDescription(data?.description);
      setContributors(data?.contributors);
      setLeader(data?.projectLeader);
    }
  }, [data]);


  const handleChange = (selectedOption, callback) => {
    setContributors([...contributors, selectedOption]);
    callback(selectedOption);
  };

  const handleUpdateSelectList = (selectedUser) => {
  setAvalibleContributors(avalibleContributors.filter((user)=>user._id!==selectedUser._id))
  
  };

  function handleContributorRemove(e, selectedUser) {
    e.preventDefault();

    const updatedContributorList = contributors.filter(
      (user) => user._id !== selectedUser.id
    );

    setContributors(updatedContributorList);
  }

  const test=(event)=>{
    const selectedOptionIndex = event.target.selectedIndex;
    const selectedOptionValue = event.target.value;
    const selectedOptionLabel = event.target.options[selectedOptionIndex].textContent
    
setLeader({_id:selectedOptionValue,name:selectedOptionLabel})
    
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
              onClick={(e) => handleContributorRemove(e, params)}
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
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        disabled={isDisabled}
                      />
                    )}
                  </div>
                  <div className="projectDataBottomItem">
                    <label htmlFor="">Project Description</label>
                    {data && (
                      <textarea
                        value={description}
                        disabled={isDisabled}
                        onChange={(e) => setDescription(e.target.value)}
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
                   onChange={(e)=>test(e)}
                onFocus={refetchPmList}
                      >
                        <option selected hidden={!isDisabled}>
                          {`${leader.name}`}
                        </option>
                        
                        {leaderList
                          ? xd.map((user) =>  {
                              return (
                                <option
                                  value={user._id}
                                  key={user._id}
                                 dataset={user.name}
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
                      <label htmlFor="">{data?.createdAt}</label>
                    </div>
                  }
                </div>
              </div>
              <div className="projectDataBottomItem">
                {contributors.length > 0 && (
                  <DataGrid
                    className="DataGrid"
                    autoHeight={true}
                    getRowId={(row) => row.id || row._id}
                    rowHeight={40}
                    rows={contributors}
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
                  options={avalibleContributors}
                  isSearchable
                  getOptionLabel={(option) =>
                    `${option.name} ${option.surname}`
                  }
                  getOptionValue={(option) => option._id}
                  onChange={(selectedOption) =>
                    handleChange(selectedOption, handleUpdateSelectList)
                  }
                  onFocus={() => {
                    refetch();
                  }}
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
                    handleDeleteProject(projectId,deleteMutation,confirmDelete)
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
                        //  getProjectContributorList(user.token,projectId)
                        //  .then((updatedContributorList) => {
                        //   // Zaktualizuj stan komponentu z nową listą kontrybutorów
                        //  setUserList(updatedContributorList)
                        setIsDisabled(false);
                      }}
                    >
                      Edit
                    </button>
                  ) : (
                    <button onClick={(e)=>handleUpdateProject(e,{data,title,description,contributors,leader},updateMutation,projectId)}>Save</button>
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
