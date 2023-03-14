import "./projectDetails.css";
import { NavLink } from "react-router-dom";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import BugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const ProjectDetails = () => {
  const { projectId } = useParams();
  const [viewContributors, setViwewContributors] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const navigate = useNavigate();
  const [data, isLoading, error] = useFetch(
    `http://localhost:3000/api/projects/${projectId}`
  );

  console.log(data);
  const handleDelete = async () => {
    const respone = await fetch(
      `http://127.0.0.1:3000/api/notes/${projectId}`,
      {
        method: "DELETE",
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

  const handleDataUpdate = async () => {
    const response = await fetch(
      `http://127.0.0.1:3000/api/notes/${projectId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    if (response.ok) {
      navigate("/projects");
    }
  };

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
          <div className="projectDataContainerTop">
   
          </div>
          <div className="projecttDataBottom">
            <form action="">
              <div className="projectDataBottomItem">
                <label htmlFor="">Project title :</label>
                {data && (
                  <input
                    type="text"
                    required
                    placeholder={data.title}
                    onChange={(e) => handleInputChange(e, "title")}
                  />
                )}
              </div>
              <div className="projectDataBottomItem">
                <label htmlFor="">Status</label>
                {data && (
                  <input
                    type="text"
                    onChange={(e) => handleInputChange(e, "status")}
                    placeholder={data.status}
                  />
                )}
              </div>
              <div className="projectDataBottomItem">
                <label htmlFor="">Created At :</label>
                {data && (
                  <input
                    type="text"
                    onChange={(e) => handleInputChange(e, "priority")}
                    placeholder={data.createdAt}
                  />
                )}
              </div>
              <div className="projectDataBottomItem">
                <label htmlFor="">Project leader</label>
                {data && (
                  <input
                    type="text"
                    onChange={(e) => handleInputChange(e, "status")}
                    placeholder={data.createdBy}
                  />
                )}
              </div>
              <div className="projectDataBottomItem">
                <label htmlFor=""></label>
                {data && (
                  <input
                    type="text"
                    onChange={(e) => handleInputChange(e, "date")}
                    placeholder={data.updatedAt}
                  />
                )}
              </div>
              <div className="projectDataBottomItem">
                <label htmlFor="">Project Description</label>
                {data && (
                  <textarea
                    onChange={(e) => handleInputChange(e, "description")}
                  ></textarea>
                )}
              </div>
             {data&& <div className="contributorsList" >
                {data.contributors.map((obj)=>{
                  return(
                   <div className="contributorItem" key={obj._id}>
                    <span>{obj.email}</span>
                    <span>{obj._id}</span>
                    <span>{obj.role}</span>
                    <button>Remove</button>
                   </div>
                  )
                })}
              </div>}
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
