import { useContext, useState, use, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import "./signupPage.css";
import { signupForm } from "../../utils/inputs";
import { FormInput } from "../../components/formInput/FormInput";

export const SignupPage = () => {
  const { dispatch, user } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState(null);

  const [values, setValues] = useState({
    email:"",
    username: "",
    lastname: "",
    gender:"",
    birthday:"",
    password:"",
    confirmPassword:""
  });

  const onHandleChange = (e, input) => {
    setValues((prev) => {
      return { ...prev, [input.name]: e.target.value };
    });
  };



  console.log(values);

  const handleClick = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:3000/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, surname, email, password, gender }),
    });

    const data = await response.json();
    if (!response.ok) {
      setError(data);
      setName("");
      setSurname("");
      setEmail("");
      setPassword("");
      console.log(error);
    }
    if (response.ok) {
      setName("");
      setSurname("");
      setEmail("");
      setPassword("");
      console.log("success");
      localStorage.setItem("user", JSON.stringify(data));
      dispatch({ type: "LOGIN", payload: data });
    }
  };

  return (
    <div className="signupPage">
      <form className="signupPage-form" action="">
        {signupForm.map((input) => {
          return (
          
            <FormInput
              key={input.id}
              {...input}
              onHandleChange={onHandleChange}
            />
          
          );
        })}
        <button onClick={handleClick}>SignUp</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};
