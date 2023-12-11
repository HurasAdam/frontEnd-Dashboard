import "./newProject.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import Select from "react-select";
import { ThemeContext } from "../../contexts/ThemeContext";
import { createProject } from "../../features/projectApi/projectApi";
import { getUsers } from "../../features/userApi/userApi";
import { useMutation, useQuery } from "react-query";
import { mutationHandler } from "../../shared/mutationHandler";
import { newProjectFormConfig } from "../../utils/newProjectFormConfig";
import { FormInput } from "../../components/formInput/FormInput";

export const NewProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contributors, setContributors] = useState([]);

  const [values, setValues] = useState({
    title: "",
    description: "",
    contributors: [],
  });

  const {
    isLoading,
    isError,
    error,
    data: users,
    refetch,
  } = useQuery(["people"], () => getUsers(), {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  // const createMutation = useMutation(createProject,{
  //   onSuccess:(data)=>{
  //     navigate(`/projects`)
  //   }
  // })

  const handleCreateProject = (
    e,
    { title, description, contributors },
    mutation
  ) => {
    e.preventDefault();

    mutation.mutate({ title, description, contributors });
  };

  const createProjectMutation = mutationHandler(createProject, (data) => {
    navigate("/projects");
  });

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "rgb(238, 240, 240)",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: "rgb(238, 240, 240)",
    }),
  };





  //select state
  const [selecedtUsers, setSelecedtUsers] = useState([]);
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  // const [values,setValues]=useState({
  //   options:users&&users,

  // })

  const inputs = newProjectFormConfig({ users: users, refetch,setValues });

  //Add new project
  const handleAddProject = async () => {
    const response = await fetch("http://127.0.0.1:3000/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
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
   

      {inputs.map((input) => {
        return <FormInput {...input}
        className="newProject-form"
        />;
      })}
    </div>
  );
};
