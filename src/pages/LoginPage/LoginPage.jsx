import "./loginPage.css";
import { useContext, useState, use, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { settLocalStorage } from "../../utils/SettlocalStorage";
import { ThemeContext } from "../../contexts/ThemeContext";
import { inputs } from "../../utils/inputs";
import { FormInput } from "../../components/formInput/FormInput";
export const LoginPage = () => {
  const { dispatch, user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const onHandleChange = (e, input) => {
    setValues((prev) => {
      return { ...prev, [input.name]: e.target.value };
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:3000/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data);
      setEmail("");
      setPassword("");
      console.log(error);
    }
    if (response.ok) {
      setEmail("");
      setPassword("");

      console.log("succes");
      settLocalStorage(data);
      dispatch({ type: "LOGIN", payload: data });
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:3000/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data);
      setEmail("");
      setPassword("");
      console.log(error);
    }
    if (response.ok) {
      setEmail("");
      setPassword("");

      console.log("succes");
      settLocalStorage(data);
      dispatch({ type: "LOGIN", payload: data });
    }
  };

  return (
    <div className="loginPage" id={theme.mode}>
      {/* <form className="loginPage-form" action="">
        <label htmlFor="">Email</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button onClick={handleClick}>Log in</button>
        {error && <div className="error">{error}</div>}
      </form> */}

      <form className="loginPage-form">
        <h1>Log in</h1>
        {inputs.map((input) => {
          return <FormInput {...input} onHandleChange={onHandleChange} />;
        })}
        <button onClick={(e) => handleLogin(e)}>LOG IN</button>
        {error&&<div className='error'>{error}</div>}
      </form>
    </div>
  );
};
