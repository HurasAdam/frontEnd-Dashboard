import "./newProject.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import { useFetch } from "../../hooks/useFetch";
import Select from "react-select";

export const NewProject = () => {
  const [newProject, setNewProject] = useState({});
  const [userList, setUserList] = useState([]);
  const [selecedtUsers, setSelecedtUsers] = useState([]);
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const handleNewProject = (e, prop) => {
    const value = e.target.value;
    newProject[prop] = value;
    console.log(newProject);
  };

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = async () => {
    const response = await fetch("http://127.0.0.1:3000/api/user/");

    const json = await response.json();

    const arr = json.map((user) => {
      return { value: user.id, label: user.email };
    });

    setUserList(arr);
  };

  const handleAddProject = async () => {
    const response = await fetch("http://127.0.0.1:3000/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify({
        ...newProject,
        createdBy: user.email,
        contributors: selecedtUsers,
      }),
    });
    if (response.ok) {
      navigate("/projects");
    }
  };

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
            <Select
              options={userList}
              isMulti
              isSearchable
              onChange={setSelecedtUsers}
            ></Select>
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
