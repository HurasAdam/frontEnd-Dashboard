export const newProjectFormConfig = ({users,refetch,setValues}) => {
  const inputs = [
    {
      id: 1,
      name: "title",
      type: "text",
      placeholder: "Proejct Title",
      errorMessage: "Project title is required",
      label: "Project Title",
      required: true,
      onChange:(e) => {    
        setValues((prev) => {
          return { ...prev, title: e.target.value }})}
    },
    {
      id: 2,
      name: "description",
      type: "textArea",
      placeholder: "Project Description...",
      label: "Project Description",
      required: true,
      onChange: (e) => {
        setValues((prev) => ({
          ...prev,
          description: e.target.value,
        }));
      }
    },
    {
      id: 3,
      name: "contributors",
      type: "multipleSelect",
      placeholder: "Asign Member",
      label: "Asign Member",
      required: true,
      multiSelectProps: {
        isMulti: true,
        isSearchable: true,
        onChange: (selectedOptions) => {
            const selectedUsers = selectedOptions.map((option) => option._id);
            setValues((prev)=>({...prev,contributors:selectedUsers}))
          },
        
        options:users&&users,
        getOptionLabel: (option) => `${option.name} ${option.surname}`,
        getOptionValue: (option) => option._id,
        onFocus:refetch,
        
      },
    },
  ];

  return inputs;
};
