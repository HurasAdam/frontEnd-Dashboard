import "../accountSettings/accountSettings.css";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { useContext, useState } from "react";

import { ThemeContext } from "../../contexts/ThemeContext";
export const AccountSettings = ({ triggerCredentials, fire, userData }) => {
  const { theme, dispatch: themeSwitch } = useContext(ThemeContext);
  const [toggleTab, setToggleTab] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(false);

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

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (
      changePassword.newPassword.value !==
      changePassword.repeatNewPassword.value
    ) {
      setChangePassword({
        ...changePassword,
        errorMessage: "repeated password does not match the new password.",
      });
    }
    if (
      !changePassword.oldPassword.value ||
      !changePassword.newPassword.value ||
      !changePassword.repeatNewPassword.value
    ) {
      setChangePassword({
        ...changePassword,
        errorMessage: "All fields need to be filled",
      });
    }
  };

  return (
    <div className="accountSettings">
      <div className="accountSettingsTitle">Account settings</div>
      <div className="accountSettingsContent">
        <div className="accountSettings-right">
          <div className="sectionToggleContainer">
            <button
              className={`toggleSectionBtn ${!toggleTab ? "active" : ""}`}
              disabled={!toggleTab ? true : false}
              onClick={(e) => {
                e.preventDefault;
                setToggleTab(!toggleTab);
              }}
            >
              Password
            </button>
            <button
              className={`toggleSectionBtn ${toggleTab ? "active" : ""}`}
              disabled={toggleTab ? true : false}
              onClick={(e) => {
                e.preventDefault;
                setToggleTab(!toggleTab);
              }}
            >
              Email
            </button>
          </div>
          {!toggleTab ? (
            <form>
              <div className="accountSettings-right-item">
                <div className="changePasswordTitleWrapper">
                  <LockOpenOutlinedIcon />
                  <span>Change Password</span>
                </div>

                <div className="changePasswordDataWrapper-item">
                  <span>new password</span>
                  <input
                    type={!isPasswordHidden ? "password" : "text"}
                
                  />
                  {!isPasswordHidden ? (
                    <VisibilityOutlinedIcon
                      onClick={(e) => setIsPasswordHidden(true)}
                      className="unhidePassword"
                    />
                  ) : (
                    <VisibilityOffOutlinedIcon
                      onClick={(e) => setIsPasswordHidden(false)}
                      className="unhidePassword"
                    />
                  )}
                </div>
                <div className="changePasswordDataWrapper-item">
                  <span>repeat new password</span>
                  <input
                    type={!isPasswordHidden ? "password" : "text"}
                    onChange={(e) =>
                      triggerCredentials(
                        "password",
                        "repeatNewPassword",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="statusMessageContainer">
                  <span>{}</span>
                </div>
                <div className="changePasswordButtonsWrapper">
                  <button
                    // disabled={
                    //   userData.userCredentials.password.newPassword === "" ||
                    //   userData.userCredentials.email.repeatNewPassword === ""
                    //     ? true
                    //     : false
                    // }
                    // onClick={(e) => {
                    //   e.preventDefault();
                    //   fire(
                    //     "password",
                    //     "newPassword",
                    //     "repeatNewPassword",
                    //     "error"
                    //   );
                    // }}
                  >
                    save
                  </button>
                </div>
              </div>
            </form>
          ) : (
            // EMAIL SECTION
            <form>
              <div className="accountSettings-right-item">
                <div className="changePasswordTitleWrapper">
                  <AlternateEmailOutlinedIcon />
                  <span>Change Email</span>
                </div>
                <div className="changePasswordDataWrapper-item">
                  <span>current email</span>
                  <input
                    disabled={true}
                    type="email"
                    name="email"
                  
                  />
                </div>

                <div className="changePasswordDataWrapper-item">
                  <span>new email</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="type in new email"
                 
                  />
                </div>
                <div className="changePasswordDataWrapper-item">
                  <span>repeat new email</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="repeat new email"
            
                  />
                </div>
                <div className="statusMessageContainer">
                  <span></span>
                </div>
                <div className="changePasswordButtonsWrapper">
                  <button
           
                  >
                    save
                  </button>
                </div>
              </div>
            </form>
          )}
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
