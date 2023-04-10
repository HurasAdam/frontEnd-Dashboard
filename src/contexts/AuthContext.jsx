import { createContext, useEffect, useReducer } from "react";
import { authReducer } from "../reducers/authReducer";

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  useEffect(() => {
    const user = localStorage.getItem("token");
  const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');
const userId=localStorage.getItem('userId');
const userAvatar= localStorage.getItem('userAvatar');

    if (user) {
      dispatch({ type: "LOGIN", payload: {token:user,email:email,role:role,userId,userAvatar} });
    }
  }, []);

  const [state, dispatch] = useReducer(authReducer, { user: null });
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
