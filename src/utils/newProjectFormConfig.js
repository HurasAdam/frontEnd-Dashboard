export const newProjectFormConfig = ({users,refetch,setValues,values}) => {
  const inputs = [
    {
      id: 1,
      name: "title",
      type: "text",
      placeholder: "Proejct Title...",
      errorMessage: "Project title must be between 4 and 20 characters long and contain only letters and numbers",
      label: "Project Title",
      required: true,
      className:"newProject-form",
      pattern:"^[a-zA-Z0-9]{4,20}$",
      onChange:(e) => {    
        setValues((prev) => {
          return { ...prev, title: e.target.value }})}
          
    },
    {id:3,
      type:"file",
  
    label:"Attach Files",
    className:"newProject-form",
    attachedFiles:{
  files:values.files,
  onClick:(e, index) => {
    e.preventDefault();
  
    const updatedFiles = [...values?.files];
    updatedFiles.splice(index, 1);
    setValues({ ...values, files: updatedFiles });
  }
    },
    onChange:(e)=>{
      setValues((prev)=>{
        return {
          ...prev,
          files: [...prev?.files, e.target.files[0]],
        }
      })
    }
    },
    
    {
      id: 2,
      name: "description",
      type: "textArea",
      placeholder: "Project Description...",
 pattern:"/^.{12,400}$/",
      errorMessage: "Project title must be between 4 and 20 characters long and contain only letters and numbers",
      label: "Project Description",
      required: true,
      className:"newProject-form",
      onChange: (e) => {
        setValues((prev) => ({
          ...prev,
          description: e.target.value,
        }));
      }
    },
    // {
    //   id: 3,
    //   name: "contributors",
    //   type: "multipleSelect",
    //   placeholder: "Asign Member",
    //   label: "Asign Member",
    //   required: true,
    //   className:"newProject-form",
    //   multiSelectProps: {
    //     isMulti: true,
    //     isSearchable: true,
    //     onChange: (selectedOptions) => {
    //         const selectedUsers = selectedOptions.map((option) => option._id);
    //         setValues((prev)=>({...prev,contributors:selectedUsers}))
    //       },
        
    //     options:users&&users,
    //     getOptionLabel: (option) => `${option.name} ${option.surname}`,
    //     getOptionValue: (option) => option._id,
    //     onFocus:refetch,
        
    //   },
    // },

  ];

  return inputs;
};
