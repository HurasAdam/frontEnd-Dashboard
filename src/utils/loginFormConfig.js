export const loginFormConfig =(values)=>{
  const inputs=[
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Invalid Email",
      label: "Email",
      required: true,
      pattern: " /^[a-zA-Z0-9. _-]+@[a-zA-Z0-9. -]+. [a-zA-Z]{2,4}$/",
      className:'loginPage-form'
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Password is required",
      label: "Password",
      required: true,
      pattern:
        "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$",
        className:'loginPage-form'
    },
  ];
  return inputs
} 

 
