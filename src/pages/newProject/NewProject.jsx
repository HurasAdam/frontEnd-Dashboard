import "./newProject.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {AuthContext} from '../../contexts/AuthContext'
import { useContext } from "react";
export const NewProject = () => {
  const [newProject, setNewProject] = useState({});
const navigate=useNavigate()
 const {user}=useContext(AuthContext)
const handleNewProject = (e, prop) => {
    const value = e.target.value;
    newProject[prop] = value;
    console.log(newProject);
  };
  


const handleAddProject=async()=>{

    const response= await fetch('http://127.0.0.1:3000/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...newProject,author:user.email}),
      })   
     
      if(response.ok){
        navigate('/projects')
      }
}


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
              Title
            </label>
            <input type="text" onChange={(e) => handleNewProject(e, "title")} />
          </div>
          <div className="newProjectItem">
            <label className="newProjectItemLabel" htmlFor="">
              Priority
            </label>
            <input
              type="text"
              onChange={(e) => handleNewProject(e, "priority")}
            />
          </div>
          <div className="newProjectItem">
            <label className="newProjectItemLabel" htmlFor="">
              Type
            </label>
            <input type="text" onChange={(e) => handleNewProject(e, "type")} />
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
        </div>
        <div className="newProjectAction">
          <button className="newProjectSave" onClick={handleAddProject}>Save</button>
          <button className="newProjectCancel" onClick={()=>navigate('/Projects')}>Cancel</button>
        </div>
      </div>
    </div>
  );
};
