import "./newProject.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import Select from "react-select";
import { ThemeContext } from "../../contexts/ThemeContext";
import { createProject } from "../../features/projectApi/projectApi";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { getUsers } from "../../features/userApi/userApi";
import { useMutation, useQuery } from "react-query";
import { mutationHandler } from "../../shared/mutationHandler";
import { newProjectFormConfig } from "../../utils/newProjectFormConfig";
import { FormInput } from "../../components/formInput/FormInput";
import { MemberList } from "../../components/memberList/MemberList";
import { handlePopup } from "../../shared/handlePopup";

export const NewProject = () => {
  const [showMsgPopup, setShowMsgPopup] = useState({
    visible: false,
    message: "",
    success: null,
  });

  const [values, setValues] = useState({
    title: "",
    description: "",
    contributors: [],
    files: [],
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
    { title, description, contributors, files },
    mutation,
    popupSetter
  ) => {
    e.preventDefault();
    const isTitleValid = /^[a-zA-Z0-9]{4,20}$/.test(title);
    const isDescriptionValid = /^.{12,400}$/.test(description);
    const errorObj = {};

    // if(!isTitleValid){
    //   errorObj.title="title is not valid"
    // }
    // if(!isDescriptionValid){
    //   errorObj.description="description is not valid"
    // }

    // if(Object.keys(errorObj).length>0){
    // return errorObj
    // }
    // else{
    const contributorsId = contributors.map((contributor) => contributor._id);
    mutation.mutate({ title, description, contributors: contributorsId });
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

  const inputs = newProjectFormConfig({
    users: users,
    refetch,
    setValues,
    values,
  });

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
        <div className="newProject-header">
          <span>New Project</span>
          <button
            onClick={(e) =>
              handleCreateProject(
                e,
                values,
                createProjectMutation,
                setShowMsgPopup
              )
            }
          >
            Create
          </button>
        </div>

        {inputs.map((input) => {
          return <FormInput {...input} />;
        })}
        {values && values?.contributors.length > 0 ? (
          <div className="asigned-member-list">
            {values &&
              values?.contributors.map((contributor) => {
                return (
                  <div className="asigned-member-item">
                    <img src={contributor?.userAvatar?.url} alt="" />
                    <div className="member-info">
                      <p>{contributor.name}</p>
                      <p>{contributor.role}</p>
                      
                    <ClearOutlinedIcon
                      className="remove-asigned-member"
                      onClick={(e) => removeAsignedMember(contributor)}
                    />
                    </div>

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
