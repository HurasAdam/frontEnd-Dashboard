import { createContext, useEffect, useReducer } from "react";
import { authReducer } from "../reducers/authReducer";

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {


  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
  const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');
const userId=localStorage.getItem('userId');
const userAvatar= localStorage.getItem('userAvatar');

    if (accessToken) {
      dispatch({ type: "LOGIN", payload: {accessToken,refreshToken ,email:email,role:role,userId,userAvatar} });
    }

    

  }, []);

  const [state, dispatch] = useReducer(authReducer, { user: null });
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
