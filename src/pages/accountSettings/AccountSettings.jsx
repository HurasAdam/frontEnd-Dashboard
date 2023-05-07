import "../accountSettings/accountSettings.css";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useContext, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
export const AccountSettings = () => {
  const { theme, dispatch: themeSwitch } = useContext(ThemeContext);
  const [changePassword, setChangePassword] = useState({
    
    oldPassword:{value:'',isHidden:true},
    newPassword:{value:'',isHidden:true},
    repeatNewPassword:{value:'',isHidden:true},
    errorMessage:{value:''}

  });

  const toggleTheme = (e, THEME) => {
  
    themeSwitch({
      type: "LIGHT",
      payload: { mode: THEME, sidebar: "default" },
    });
    localStorage.setItem("mode", THEME);
    console.log(theme);
  };

  const toggleSidebarColor = (e, color) => {
    console.log(color);
    themeSwitch({
      type: "DARK",
      payload: { sidebar: color },
    });
    localStorage.setItem("sidebar", color);
  };

  const handlePasswordChange= (e)=>{
    e.preventDefault();
if(changePassword.newPassword.value!==changePassword.repeatNewPassword.value){
  setChangePassword({...changePassword,errorMessage:'repeated password does not match the new password.'})
}
if(!changePassword.oldPassword.value||!changePassword.newPassword.value||!changePassword.repeatNewPassword.value){
  setChangePassword({...changePassword,errorMessage:'All fields need to be filled'})
}
  }

  return (
    <div className="accountSettings">
      <div className="accountSettingsTitle">Account settings</div>
      <div className="accountSettingsContent">
        <div className="accountSettings-right">
          <form>
          
            <div className="accountSettings-right-item">
            <div className="changePasswordTitleWrapper">
              <span>Password Change</span>
              </div>
             
                  <div className="changePasswordDataWrapper-item">
                    <span>old password</span>
                
                    <input type="text" onChange={(e)=>{e.preventDefault; setChangePassword({...changePassword,oldPassword:{...changePassword.oldPassword,value:e.target.value}})}} />
                    <VisibilityOutlinedIcon onClick={(e)=> setChangePassword({...changePassword,oldPassword:{...changePassword.oldPassword,isHidden:false}})} className="unhidePassword"/>
                  </div>
                  <div className="changePasswordDataWrapper-item">
                    <span>new password</span>
                    <input type="text" onChange={(e)=>{e.preventDefault; setChangePassword({...changePassword,newPassword:{...changePassword.newPassword,value:e.target.value}})}} />
                    <VisibilityOutlinedIcon className="unhidePassword"/>
                  </div>
                  <div className="changePasswordDataWrapper-item">
                    <span>repeat new password</span>
                    <input type="text"onChange={(e)=>{e.preventDefault();setChangePassword({...changePassword,repeatNewPassword:{...changePassword.repeatNewPassword,value:e.target.value}})}} />
                    <VisibilityOutlinedIcon className="unhidePassword"/>
                  </div>
                  <div className="changePasswordButtonsWrapper">
                    <button onClick={(e)=>handlePasswordChange(e)}>save</button>
               
                  </div>
            
           
            </div>
          </form>
        </div>
        <div className="accountSettings-left">
          <div className="accountSettings-left-title"></div>

          <div className="accountSettings-left-item">
            <span>Theme color</span>
            <div className="themeOptionsWrapper">
              <ul>
                <li onClick={(e) => toggleTheme(e, "dark")} className="dark">
                  <span
                    className={`theme-dark ${
                      theme.mode === "dark" ? "active" : ""
                    }`}
                  ></span>
                </li>
                <li onClick={(e) => toggleTheme(e, "light")} className="light">
                  <span
                    className={`theme-light ${
                      theme.mode === "light" ? "active" : ""
                    }`}
                  ></span>
                </li>
                <li
                  onClick={(e) => toggleTheme(e, "purple")}
                  className="purple"
                >
                  <span
                    className={`theme-purple ${
                      theme.mode === "purple" ? "active" : ""
                    }`}
                  ></span>
                </li>
                <li onClick={(e) => toggleTheme(e, "green")} className="green">
                  <span
                    className={`theme-green ${
                      theme.mode === "green" ? "active" : ""
                    }`}
                  ></span>
                </li>
              </ul>
            </div>
          </div>
          <div className="accountSettings-left-item">
            <span>Advanced cutomize</span>
            <div className="themeOptionsWrapper">
              {/*  */}

              {theme.mode === "dark" ? (
                <ul
                  className={`customize-sidebar ${
                    theme.mode === "dark" ? "show" : ""
                  }`}
                >
                  <li>
                    <span
                      onClick={(e) => toggleSidebarColor(e, "default")}
                      className={`dark-default ${
                        theme.sidebar === "default" ? "active" : ""
                      }`}
                    ></span>
                  </li>
                  <li>
                    <span
                      onClick={(e) => toggleSidebarColor(e, "dark-two")}
                      className={`dark-two ${
                        theme.sidebar === "dark-two" ? "active" : ""
                      }`}
                    ></span>
                  </li>
                  <li>
                    <span
                      onClick={(e) => toggleSidebarColor(e, "dark-three")}
                      className={`dark-three ${
                        theme.sidebar === "dark-three" ? "active" : ""
                      }`}
                    ></span>
                  </li>
                  <li>
                    <span
                      onClick={(e) => toggleSidebarColor(e, "dark-four")}
                      className={`dark-four ${
                        theme.sidebar === "dark-four" ? "active" : ""
                      }`}
                    ></span>
                  </li>
                </ul>
              ) : null}
              {/*  */}
              {theme.mode === "purple" ? (
                <ul
                  className={`customize-sidebar ${
                    theme.mode === "dark" ? "show" : ""
                  }`}
                >
                  <li>
                    <span
                      onClick={(e) => toggleSidebarColor(e, "default")}
                      className={`default ${
                        theme.sidebar === "default" ? "active" : ""
                      }`}
                    ></span>
                  </li>
                  <li>
                    <span
                      onClick={(e) => toggleSidebarColor(e, "purple-two")}
                      className={`purple-two ${
                        theme.sidebar === "purple-two" ? "active" : ""
                      }`}
                    ></span>
                  </li>
                  <li>
                    <span
                      onClick={(e) => toggleSidebarColor(e, "purple-three")}
                      className={`purple-three ${
                        theme.sidebar === "purple-three" ? "active" : ""
                      }`}
                    ></span>
                  </li>
                  <li>
                    <span
                      onClick={(e) => toggleSidebarColor(e, "purple-four")}
                      className={`purple-four ${
                        theme.sidear === "purple-four" ? "active" : ""
                      }`}
                    ></span>
                  </li>
                </ul>
              ) : null}
              {/*  */}
              {theme.mode === "light" ? (
                <ul
                  className={`customize-sidebar ${
                    theme.mode === "dark" ? "show" : ""
                  }`}
                >
                  <li>
                    <span
                      onClick={(e) => toggleSidebarColor(e, "default")}
                      className={`default ${
                        theme.sidebar === "default" ? "active" : ""
                      }`}
                    ></span>
                  </li>
                  <li>
                    <span
                      onClick={(e) => toggleSidebarColor(e, "light-two")}
                      className={`light-two ${
                        theme.sidebar === "light-two" ? "active" : ""
                      }`}
                    ></span>
                  </li>
                  <li>
                    <span
                      onClick={(e) => toggleSidebarColor(e, "light-three")}
                      className={`light-three ${
                        theme.sidebar === "light-three" ? "active" : ""
                      }`}
                    ></span>
                  </li>
                  <li>
                    <span
                      onClick={(e) => toggleSidebarColor(e, "light-four")}
                      className={`light-four ${
                        theme.sidebar === "light-four" ? "active" : ""
                      }`}
                    ></span>
                  </li>
                </ul>
              ) : null}
              {/*  */}
              {theme.mode === "green" ? (
                <ul
                  className={`customize-sidebar ${
                    theme.mode === "dark" ? "show" : ""
                  }`}
                >
                  <li>
                    <span
                      onClick={(e) => toggleSidebarColor(e, "moon")}
                      className="moon"
                    ></span>
                  </li>
                  <li>
                    <span
                      onClick={(e) => toggleSidebarColor(e, "orange")}
                      className="orange"
                    ></span>
                  </li>
                  <li>
                    <span
                      onClick={(e) => toggleSidebarColor(e, "orange")}
                      className="orange"
                    ></span>
                  </li>
                  <li>
                    <span
                      onClick={(e) => toggleSidebarColor(e, "violet")}
                      className="violet"
                    ></span>
                  </li>
                </ul>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
