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
export const ProjectDetails = () => {
  const { projectId } = useParams();

  const [updateError, setUpdateError] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [contributorsList, setContributorsList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [projectTitle, setProjectTitle] = useState();
  const [projectLeader, setProjectLeader] = useState();
  const [projectDescription, setProjectDescription] = useState();
  const [data, isLoading, error] = useFetch(
    `http://localhost:3000/api/projects/${projectId}/`
  );


  const handleChange=(selectedOption)=>{
setContributorsList([...contributorsList,selectedOption])
setUserList(userList.filter((user)=>user!==selectedOption))
  }
  useEffect(() => {
    getUserList();
  }, []);
  //get list of users
  const getUserList = async () => {
    const response = await fetch(
      `http://127.0.0.1:3000/api/user/avalibleContributors?project=${projectId}`
    );

    const json = await response.json();
console.log(json)

    setUserList(json);
  };

  

  useEffect(() => {
    displayProjectDetails();
  }, [data]);

  const displayProjectDetails = () => {
    if (data) {
      setContributorsList(data.contributors);
      setProjectTitle(data.title);
      setProjectLeader(data.createdBy);
      setProjectDescription(data.description);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault()
    const respone = await fetch(
      `http://127.0.0.1:3000/api/projects/${projectId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        }
      }
    );
    if (respone.ok) {
      navigate("/projects");
    }
  };

  const handleInputChange = (e, prop) => {
    const target = e.target;
    const value = target.value;
    data[prop] = value;
  };

  const handleDataUpdate = async (e) => {
    const response = await fetch(
      `http://127.0.0.1:3000/api/projects/${projectId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },

        body: JSON.stringify({
          title: projectTitle,
          createdBy: projectLeader,
          description: projectDescription,
          contributors: contributorsList,
        }),
      }
    );
    if (response.ok) {
      navigate("/projects");
    }
  };

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
            disabled={isDisabled}
              onClick={(e) =>
                setContributorsList(
                  contributorsList.filter((user) => user._id !== params.id)
                )
              }
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
        <div className="projectDataContainerLeft">
          <div className="projectDataContainerTop"></div>
          <div className="projecttDataBottom">
            <form action="">
              <div className="projectDataBottomItem">
                <label htmlFor="">Project title :</label>
                {data && (
                  <input
                    type="text"
                    required
                    defaultValue={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    disabled={isDisabled}
                  />
                )}
              </div>

              <div className="projectDataBottomItem">
                <label htmlFor="">Created At :</label>
                {data && (
                  <input
                    type="text"
                    onChange={(e) => handleInputChange(e, "priority")}
                    defaultValue={data.createdAt}
                    disabled={isDisabled}
                  />
                )}
              </div>
              <div className="projectDataBottomItem">
                <label htmlFor="">Project leader</label>
                {data && (
                  <input
                    type="text"
                    onChange={(e) => setProjectLeader(e.target.value)}
                    defaultValue={projectLeader}
                    disabled={isDisabled}
                  />
                )}
              </div>

              <div className="projectDataBottomItem">
                <label htmlFor="">Project Description</label>
                {data && (
                  <textarea
                    defaultValue={projectDescription}
                    disabled={isDisabled}
                    onChange={(e) => setProjectDescription(e.target.value)}
                  ></textarea>
                )}
              </div>

              <div className="projectDataBottomItem">
                {contributorsList && (
                  <DataGrid
                    className="dataGrid"
                    autoHeight={true}
                    getRowId={(row) => row._id}
                    rowHeight={40}
                    rows={contributorsList}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    checkboxSelection={false}
                    disableSelectionOnClick
                  />
                )}
              </div>
              <div className="projectDataBottomItem">
                <label>Add member</label>
                <Select
                isDisabled={isDisabled}
                  className="selectList"
                  options={userList}
                  isSearchable
                  getOptionLabel={option=>`${option.name} ${option.surname}`}
                  getOptionValue={option=>option._id}
                  onChange={handleChange}
                />
              </div>
              
              <div className="projectDataBottomItem-Btns">
                
                {isDisabled?
                (<button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsDisabled(false);
                  }}
                >
                  Edit
                </button>):

                (<button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDataUpdate();
                    setIsDisabled(!isDisabled)
                  }}
                >
                  Save
                </button>)}
<button onClick={handleDelete}>Delete</button>
              </div>
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
