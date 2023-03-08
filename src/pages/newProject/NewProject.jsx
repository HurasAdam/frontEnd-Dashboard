import "./newProject.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import { useFetch } from "../../hooks/useFetch";
import Multiselect from "multiselect-react-dropdown";

export const NewProject = () => {
  const [data, isLoading, error] = useFetch("http://127.0.0.1:3000/api/user/");
  const [newProject, setNewProject] = useState({});
  const [selectValue, setSelectvalue] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleNewProject = (e, prop) => {
    const value = e.target.value;
    newProject[prop] = value;
    console.log(newProject);
  };

  const handleAddProject = async () => {
    const response = await fetch("http://127.0.0.1:3000/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newProject,
        author: user.email,
        contributors: selectValue.map((user) => data.find(user2.id)),
      }),
    });
    if (response.ok) {
      navigate("/projects");
    }
  };
  console.log(data);

  const handleSelect = (e) => {};

  return (
    <div className="newProject">
      <div className="newProjectConent">
        <div className="newProjectTop">
          <span>New Project</span>
          <Link to="/Projects">
            <button>X</button>
          </Link>
        </div>
        <div className="newProjectBottom">
          <div className="newProjectItem">
            <label className="newProjectItemLabel" htmlFor="">
              Project Title
            </label>
            <input type="text" onChange={(e) => handleNewProject(e, "title")} />
          </div>

          <div className="newProjectItemDescripion">
            <label className="newProjectItemLabel" htmlFor="">
              Description
            </label>
            <textarea
              name=""
              id=""
              rows={25}
              onChange={(e) => handleNewProject(e, "description")}
            ></textarea>
          </div>
          <div className="newProjectItem">
            <label className="newProjectItemLabel" htmlFor="">
              Asign Members
            </label>

            {data && (
              <select name="select" multiple className="multiselect">
                {data.map((option) => (
                  <option key={option.id}>{option.email}</option>
                ))}
              </select>
            )}
          </div>
        </div>
        <div className="newProjectAction">
          <button className="newProjectSave" onClick={handleAddProject}>
            Save
          </button>
          <button
            className="newProjectCancel"
            onClick={() => navigate("/Projects")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
