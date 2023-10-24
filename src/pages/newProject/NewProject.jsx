import "./newProject.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import Select from "react-select";
import { ThemeContext } from '../../contexts/ThemeContext'
import {createProject} from "../../features/projectApi/projectApi"
import { getUsers } from "../../features/userApi/userApi";
import { useMutation, useQuery } from "react-query";
export const NewProject = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription]=useState('');
  const [contributors, setContributors] = useState([]);
  
  const {isLoading,isError,error,data:users,refetch}=useQuery(["people"],()=>getUsers(),{
    refetchOnWindowFocus:false,
    enabled:false
  })

  const mutation = useMutation(createProject,{
    onSuccess:(data)=>{
      navigate(`/projects/${data.id}`)
      console.log(data.id)
    
    }
  })
  



  const handleCreateProject=(e)=>{
e.preventDefault();
mutation.mutate({title,description})

  }




  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor:'rgb(238, 240, 240)',
     
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor:  'rgb(238, 240, 240)' ,
    }),
  };












  //select state
  const [selecedtUsers, setSelecedtUsers] = useState([]);
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
  const {theme}=useContext(ThemeContext)

  //handle new project inputs
  // const handleNewProject = (e, prop) => {
  //   const value = e.target.value;
  //   newProject[prop] = value;
  //   console.log(newProject);
  // };




  // useEffect(() => {
  //   getUserList();
  // }, []);

  //get list of users 
  // const getUserList = async () => {
  //   const response = await fetch("http://127.0.0.1:3000/api/user/",{
  //     headers:{'Authorization': `Bearer ${user.token}`},
  //   });

  //   const json = await response.json();

  //   const arr = json.map((user) => {
  //     return { value: user._id, label: user.email };
  //   });

  //   setUserList(arr);
  // };

  //Add new project 
  const handleAddProject = async () => {
    const response = await fetch("http://127.0.0.1:3000/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${user.accessToken}`
      },
      body: JSON.stringify(objectToSend),
    });
    if (response.ok) {
      navigate("/projects");
    }
  };



  return (
    <div className="newProject" id={theme.mode}>
        <div className="newProjectTop">
          <span>New Project</span>
         
        </div>
      <div className="newProjectConent" id={theme.mode}>
      <div className="newProjectContentTopButton">
      <Link to="/Projects">
            <button>X</button>
          </Link>
      </div>
        <div className="newProjectBottom">
          <div className="newProjectItem">
            <label className="newProjectItemLabel" htmlFor="">
              Project Title
            </label>
            <input type="text" onChange={(e)=>setTitle(e.target.value)} />
          </div>

          <div className="newProjectItemDescripion">
            <label className="newProjectItemLabel" htmlFor="">
              Description
            </label>
            <textarea
              name=""
              id=""
              rows={25}
              onChange={(e) =>setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="newProjectItem">
            <label className="newProjectItemLabel" htmlFor="">
              Asign Members
            </label>
            <Select 
             
            className="newProjectMemberSelect"
              options={users&&users}
              isMulti
              isSearchable
              styles={customStyles}
              onChange={setContributors}
              onFocus={refetch}
              getOptionLabel={(option) =>
                `${option.name} ${option.surname}`
              }
              getOptionValue={(option) => option._id}
          
            ></Select>
          </div>
        </div>
        <div className="newProjectAction">
          <button
          
          onClick={handleCreateProject}
          className="newProjectSave">
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
