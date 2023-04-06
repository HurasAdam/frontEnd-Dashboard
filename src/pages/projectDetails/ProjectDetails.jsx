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
  const [userList, setUserList] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [check, setCheck] = useState();
  const [data, isLoading, error] = useFetch(
    `http://localhost:3000/api/projects/${projectId}/`
  );
  const [projectData, setProjectData] = useState({});

  const handleChange = (selectedOption) => {
    setProjectData({
      ...projectData,
      contributors: [...projectData.contributors, selectedOption],
    });
    setUserList(userList.filter((user) => user !== selectedOption));
  };
  useEffect(() => {
    getUserList();
  }, []);
  //get list of users for change PM select
  const getAllUsers = async () => {
    const response = await fetch(
      `http://127.0.0.1:3000/api/user?changePM=${data.projectLeader.email}&&project=${projectId}`,
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );

    const json = await response.json();
    const arr = json.map((user) => {
      return { value: user._id, label: user.email };
    });
    setCheck(arr);
  };

  console.log(projectData)
  useEffect(() => {
    if (data) {
      setProjectData({
        ...projectData,
        projectTitle: data.projectTitle,
        projectLeader: data.projectLeader,
        _id: data.id,
        contributors: data.contributors,
        createdAt: data.createdAt,
        description: data.description,
      });
    }
  }, [data]);

  const getUserList = async () => {
    const response = await fetch(
      `http://127.0.0.1:3000/api/user?project=${projectId}`,
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );

    const json = await response.json();
    setUserList(json);
  };

  const kekw = (confirm) => {
    if (confirm === "delete") {
      handleDelete();
    } else {
      setFetchError("inncorect command");
    }
  };
  const handleDelete = async () => {
    const response = await fetch(
      `http://127.0.0.1:3000/api/projects/${projectId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    try {
      if (response.status === 409) {
        throw Error(
          "Can not delete project due to other references.Check ticket list "
        );
      }
      if (response.ok) {
        setFetchError("");
        navigate("/projects");
      }
    } catch (Error) {
      setFetchError(Error.message);
    }
  };

  const handleDataUpdate = async (e) => {
    const response = await fetch(
      `http://127.0.0.1:3000/api/projects/${projectId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },

        body: JSON.stringify(projectData),
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
                setProjectData({
                  ...projectData,
                  contributors: [
                    ...projectData.contributors.filter(
                      (user) => user._id !== params.id
                    ),
                  ],
                })
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
                    defaultValue={projectData.projectTitle}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        projectTitle: e.target.value,
                      })
                    }
                    disabled={isDisabled}
                  />
                )}
              </div>
              <div className="projectDataBottomItem">
                <label htmlFor="">Created At :</label>
                {data && (
                  <input
                    type="text"
                    defaultValue={`${data.createdAt.Day}/${data.createdAt.Month}/${data.createdAt.Year}`}
                    disabled={true}
                  />
                )}
              </div>
              <div className="projectDataBottomItem">
                <label htmlFor="">Project leader</label>
                {data && (
                  <select
                    disabled={isDisabled}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        projectLeader: e.target.value,
                      })
                    }
                    id=""
                  >
                    <option disabled selected>
                      {data.projectLeader.name}
                    </option>
                    {check
                      ? check.map((user) => {
                          return (
                            <option value={user.value} key={user.value}>
                              {user.label}
                            </option>
                          );
                        })
                      : null}
                  </select>
                )}
              </div>
              <div className="projectDataBottomItem">
                <label htmlFor="">Project Description</label>
                {data && (
                  <textarea
                    defaultValue={projectData.description}
                    disabled={isDisabled}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        description: e.target.value,
                      })
                    }
                  ></textarea>
                )}
              </div>
              <div className="projectDataBottomItem">
                {projectData.contributors && (
                  <DataGrid
                    className="dataGrid"
                    autoHeight={true}
                    getRowId={(row) => row._id}
                    rowHeight={40}
                    rows={projectData.contributors}
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
                      kekw(confirmDelete);
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
                  {fetchError && <span className="error">{fetchError}</span>}
                </div>
              ) : (
                <div className="projectDataBottomItem-Btns">
                  {isDisabled ? (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setIsDisabled(false);
                        getAllUsers();
                      }}
                    >
                      Edit
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleDataUpdate();
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
