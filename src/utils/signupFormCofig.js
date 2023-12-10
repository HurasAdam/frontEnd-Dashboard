export const signupFormCofig = (values)=>{

    const inputs=
        [
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
            name: "name",
            type: "text",
            placeholder: "Username",
            errorMessage:
              "Username should be 3-16 characters and shouldn't include any special character!",
            label: "Username",
            required: true,
          },
          {
            id: 3,
            name: "surname",
            type: "text",
            placeholder: "Lastname",
            errorMessage:
              "Username should be 3-16 characters and shouldn't include any special character or numbers!",
            label: "Lastname",
            required: true,
          },
          {
            id: 4,
            name: "gender",
            type: "radio",
            placeholder: "Gender",
            errorMessage: "Gender is required",
            label: "Gender",
            options: [
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
            ],
            required: true,
          },
         
          {
            id: 5,
            name: "password",
            type: "text",
            label: "Password",
            required: true,
            errorMessage:"Password should be at least 8 characters and contains atleast  1 uppercase 1 lowercase and 1 special character",
          label: "Password",
            pattern:
              "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$",
          },
          {
            id: 6,
            name: "confirmPassword",
            type: "text",
            label: "Confirm Password",
            errorMessage: "Password doesnt match",
            required: true,
            pattern: values.password,
          },
        ];
      return inputs
      }