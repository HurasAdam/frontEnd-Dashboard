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
import { MemberList } from "../../components/memberList/MemberList";

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

  const handleAsignMember = (member) => {
    setValues((prev) => {
      return { ...prev, contributors: [...prev.contributors, member] };
    });
  };

  //select state
  const [selecedtUsers, setSelecedtUsers] = useState([]);
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  // const [values,setValues]=useState({
  //   options:users&&users,

  // })

  const inputs = newProjectFormConfig({ users: users, refetch, setValues });

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

  const removeAsignedMember = (contributor) => {
    setValues((prev) => {
      const filteredContributors = prev?.contributors.filter(
        (user) => user._id !== contributor._id
      );
      return { ...prev, contributors: filteredContributors };
    });
  };

  return (
    <div className="newProject" id={theme.mode}>
      <form>
        <span className="newProject-title">New Project</span>

        {inputs.map((input) => {
          return <FormInput {...input} />;
        })}
        {values && values?.contributors.length>0 ? 
         (  <div className="asigned-member-list">
            {values &&
              values?.contributors.map((contributor) => {
                return (
                  <div className="asigned-member-item">
                    <span> {`${contributor.name} ${contributor.surname}`}</span>
                    <span> {contributor.role}</span>

                    <div className="asigned-member-avatar">
                      <img src={contributor?.userAvatar?.url} alt="" />
                    </div>

                    <button onClick={(e) => removeAsignedMember(contributor)}>
                      X
                    </button>
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="asigned-member-list__placeholder">
            <span>No members yet...</span>
           <img src="/public/img/empty.png" alt="" />
          </div>
        )}
      </form>
      <MemberList
        values={values}
        users={users}
        title={"Sugessted Members"}
        handleAsignMember={handleAsignMember}
      />
    </div>
  );
};
