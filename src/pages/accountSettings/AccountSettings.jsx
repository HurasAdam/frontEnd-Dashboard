import "../accountSettings/accountSettings.css";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
export const AccountSettings = () => {
  const { theme, dispatch: themeSwitch } = useContext(ThemeContext);

  const toggleTheme = (e, THEME) => {
    
    let color 

    if(THEME==='light'){
      color='rgb(92, 92, 92)'
    }
    else if(THEME==='dark'){
      color='rgb(230, 234, 237)'
    }
    if(THEME==='purple'){
      color='white'
    }
    if(THEME==='green'){
      color=' rgb(236, 230, 230); '
    }

    themeSwitch({
      type: "LIGHT",
      payload: { mode: THEME,color:color },
    });
    localStorage.setItem("mode", THEME);
    localStorage.setItem("color", color);
  };



  return (
    <div className="accountSettings">
      <div className="accountSettingsTitle">Account settings</div>
      <div className="accountSettingsContent">
        <div className="accountSettings-right">
          <div className="accountSettings-right-title"></div>
          <form action="">
            <div className="accountSettings-right-item">
              <label htmlFor="">notifications</label>
              <select name="" id=""></select>
            </div>
            <div className="accountSettings-right-item">
              <label htmlFor="">email</label>
              <select name="" id=""></select>
            </div>
            <div className="accountSettings-right-item">
              <label htmlFor="">password</label>
              <select name="" id=""></select>
            </div>
            <div className="accountSettings-right-item">
              <label htmlFor="">messages</label>
              <select name="" id=""></select>
            </div>
          </form>
        </div>
        <div className="accountSettings-left">
          <div className="accountSettings-left-title"></div>
    
          <div className="accountSettings-left-item">
            <span>Theme color</span>
            <div className="themeOptionsWrapper">
              <ul>
                <li>
                  <span className="violet"></span>
                </li>
                <li>
                  <span className="silver"></span>
                </li>
                <li>
                  <span className="moon"></span>
                </li>
                <li>
                  <span className="orange"></span>
                </li>
              </ul>
            </div>
          </div>
          <div className="accountSettings-left-item">
            <span>Theme color</span>
            <div className="themeOptionsWrapper">
              <ul>
                <li onClick={(e)=>toggleTheme(e,'dark')} className="dark">
                  <span className={`dark ${theme.mode==='dark'?'active':''}`}></span>
                </li>
                <li onClick={(e)=>toggleTheme(e,'light')} className="light">
                  <span className={`light ${theme.mode==='light'?'active':''}`}></span>
                </li>
                <li onClick={(e)=>toggleTheme(e,'purple')} className="purple">
                  <span className={`purple ${theme.mode==='purple'?'active':''}`}></span>
                </li>
                <li onClick={(e)=>toggleTheme(e,'green')} className={`green ${theme.mode==='green'?'active':''}`}>
                  <span className="green"></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
