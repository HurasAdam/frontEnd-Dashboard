export const newProjectFormConfig = ({
  visibility_options,
  users,
  refetch,
  setValues,
  values,
}) => {
  const inputs = [
    {
      id: 1,
      name: "title",
      type: "text",
      placeholder: "Proejct Title...",
      errorMessage:
        "Project title must be between 4 and 20 characters long and contain only letters and numbers",
      label: "Project Title",
      required: true,
      className: "newProject-form",
      pattern: "^[a-zA-Z0-9]{4,20}$",
      onChange: (e) => {
        setValues((prev) => {
          return { ...prev, title: e.target.value };
        });
      },
    },
    {
      id: 3,
      name: "flex",
      type: "Selects-flex",
      label: "flex",
      className: "container-flex",

      selects: [
        {
          id: 5,
          name: "visibility",
          type: "visibility",

          label: "Project Visibility",
          required: true,
          className: "newProject-form",
          selectProps: {
            onChange:(e)=>{
              console.log(e.target.value)
              setValues((prev)=>{
                return({...prev,visibility:e.target.value})
              })
            },
            placeholder:'none',
            options: visibility_options && visibility_options,
            // getOptionLabel: (option) => `${option.name} ${option.surname}`,
            // getOptionValue: (option) => option._id,
            onFocus: refetch,
          },
        },
        {
          id: 5,
          name: "leader",
          type: "select",
      
          label: "Project Leader",
          required: true,
          className: "newProject-form",
          selectProps: {
            onChange: (e) => {
        console.log(e.target.value)
        setValues((prev)=>{
          return({...prev,leader:e.target.value})
        })

            },

            options: users && users,
            placeholder:'none',
            // getOptionLabel: (option) => `${option.name} ${option.surname}`,
            // getOptionValue: (option) => option._id,
            onFocus: refetch,
          },
        },
      ],
    },
    {
      id: 3,
      type: "file",

      label: "Attach Files",
      className: "newProject-form",
      attachedFiles: {
        files: values.files,
        onClick: (e, index) => {
          e.preventDefault();
          console.log(index);
          const updatedFiles = [...values?.files];
          updatedFiles.splice(index, 1);
          setValues({ ...values, files: updatedFiles });
        },
      },
      onChange: (e) => {
        setValues((prev) => {
          return {
            ...prev,
            files: [...prev?.files, e.target.files[0]],
          };
        });
      },
    },

    {
      id: 2,
      name: "description",
      type: "textArea",
      placeholder: "Project Description...",
      pattern: "/^.{12,400}$/",
      errorMessage:
        "Project title must be between 4 and 20 characters long and contain only letters and numbers",
      label: "Project Description",
      required: true,
      className: "newProject-form",
      onChange: (e) => {
        setValues((prev) => ({
          ...prev,
          description: e.target.value,
        }));
      },
    },
  ];

  return inputs;
};
