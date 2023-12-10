import { useContext, useState, use, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import "./signupPage.css";
import { FormInput } from "../../components/formInput/FormInput";
import { settLocalStorage } from "../../utils/SettlocalStorage";
import { signupFormCofig } from "../../utils/signupFormCofig";

export const SignupPage = () => {
  const { dispatch, user } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState(null);

  const [values, setValues] = useState({
    email: "",
    name: "",
    surname: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });
  const formCofig= signupFormCofig(values)
 
  const onHandleChange = (e, input) => {
    setValues((prev) => {
      return { ...prev, [input.name]: e.target.value };
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:3000/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
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
      settLocalStorage(data)
      dispatch({ type: "LOGIN", payload: data });
    }
  };

  return (
    <div className="signupPage">
      <form className="signupPage-form" action="">
        {formCofig.map((input) => {
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
