export const inputs = [
  {
    id: 1,
    name: "email",
    type: "email",
    placeholder: "Email",
    errorMessage: "Invalid Email",
    label: "Email",
    required: true,
    pattern: " /^[a-zA-Z0-9. _-]+@[a-zA-Z0-9. -]+. [a-zA-Z]{2,4}$/",
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
  },
];

export const signupForm = [
    {
        id: 1,
        name: "email",
        type: "email",
        placeholder: "Email",
        errorMessage: "Invalid Email",
        label: "Email",
        required: true,
        pattern: " /^[a-zA-Z0-9. _-]+@[a-zA-Z0-9. -]+. [a-zA-Z]{2,4}$/",
        
      },
  {
    id: 2,
    name: "username",
    type: "text",
    placeholder: "Username",
    errorMessage: "Username should be 3-16 characters and shouldn't include any special character!",
    label: "Username",
    required: true,
    
  },
  {
    id: 3,
    name: "lastname",
    type: "text",
    placeholder: "Lastname",
    errorMessage: "Username should be 3-16 characters and shouldn't include any special character or numbers!",
    label: "Lastname",
    required: true,
    
  },
  {
    id:4,
    name:'gender',
    type:'radio',
    placeholder:'Gender',
    errorMessage:'Gender is required',
    label:"Gender",
    options:[
        {value:'male',label:'Male'},
        {value:'female',label:'Female'}
    ],
    required:true
  },

  {
    id: 5,
    name: "birthday",
    type: "date",
    label: "Birthday",
    required: true,
  },
  {
    id: 6,
    name: "password",
    type: "password",
    label: "Password",
    required: true,
  },
  {
    id: 7,
    name: "confirmPassword",
    type: "password",
    label: "Confirm Password",
    required: true,
    patternFunction: (value, values) => new RegExp(`^${values.password}$`).test(value),
  },

];
