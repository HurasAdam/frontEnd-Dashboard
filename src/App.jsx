import { useContext, useState, useEffect } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./app.css";
import Home from "./pages/home/Home";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { UserList } from "./pages/userList/UserList";
import { User } from "./pages/user/User";
import { NewUser } from "./pages/newUserPage/NewUser";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { TicketsList } from "./pages/TicketsList/TicketsList";
import { TicketDetails } from "./pages/TicketDetails/TicketDetails";
import { NewTicket } from "./pages/newTicket/NewTicket";
import { SignupPage } from "./pages/signupPage/SignupPage";
import { AuthContext } from "./contexts/AuthContext";
import { ProjectsList } from "./pages/projectList/ProjectList";
import { ProjectDetails } from "./pages/projectDetails/ProjectDetails";
import { Contributors } from "./components/contributorsLayout/Contributors";
import { NewProject } from "./pages/newProject/NewProject";
import { AdminPanel } from "../src/pages/adminPanel/AdminPanel";
import { SettingsPage } from "./pages/settingsPage/SettingsPage";
import ManageUsers from "../src/pages/manageUsers/ManageUsers";
import { UserCard } from "./components/userCard/UserCard";
import { ManageUser } from "./pages/manageUser/ManageUser";
import { ThemeContext } from "../src/contexts/ThemeContext";
import { ArchiveList } from "./pages/archiveList/ArchiveList";
function App() {
  const { user } = useContext(AuthContext);
  const [EditTicketData, setEditTicketData] = useState();
  const { theme } = useContext(ThemeContext);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const mediaQuery = window.matchMedia("(min-width: 768px)");
  //hide scroll when menu ios open
  useEffect(() => {
    if (isMenuActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuActive]);

  useEffect(() => {
    const handleMediaQueryChange = (e) => {
      if (e.matches) {
        setIsMenuActive(false);
      }
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, [mediaQuery]);

  return (
    <BrowserRouter>
      <Topbar isMenuActive={isMenuActive} setIsMenuActive={setIsMenuActive} />

      <div className="container" id={theme.mode}>
        <Sidebar isMenuActive={isMenuActive} setIsMenuActive={setIsMenuActive} />
        <Routes>
          <Route
            exact
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          ></Route>
          <Route
            path="/users"
            element={user ? <UserList /> : <Navigate to="/login" />}
          ></Route>
          <Route
            path="/userDetails/:userId"
            element={user ? <UserCard /> : <Navigate to="/login" />}
          ></Route>
          <Route
            path="/user/:userId"
            element={user ? <ManageUser /> : <Navigate to="/login" />}
          ></Route>
          <Route
            path="/newUser"
            element={user ? <NewUser /> : <Navigate to="/login" />}
          ></Route>
          <Route
            exact
            path="/tickets"
            element={user ? <TicketsList /> : <Navigate to="/login" />}
          ></Route>
          <Route
            exact
            path="/projects"
            element={user ? <ProjectsList /> : <Navigate to="/login" />}
          ></Route>
              <Route
            exact
            path="/archive"
            element={user ? <ArchiveList /> : <Navigate to="/login" />}
          ></Route>
          <Route
            exact
            path="/NewProject"
            element={user ? <NewProject /> : <Navigate to="/login" />}
          ></Route>
          <Route
            path="/projects/:projectId"
            element={user ? <ProjectDetails /> : <Navigate to="/login" />}
          >
            {" "}
          </Route>
          <Route
            path="/manageRoles"
            element={user ? <AdminPanel /> : <Navigate to="/login" />}
          >
            {" "}
          </Route>
          <Route
            path="/manageUsers"
            element={user ? <ManageUsers /> : <Navigate to="/login" />}
          >
            {" "}
          </Route>
          <Route
            path="/settings"
            element={user ? <SettingsPage /> : <Navigate to="/login" />}
          >
            {" "}
          </Route>
          <Route
            path="/tickets/:ticketId"
            element={user ? <TicketDetails /> : <Navigate to="/login" />}
          ></Route>
          <Route
            exact
            path="/Newticket"
            element={user ? <NewTicket /> : <Navigate to="/login" />}
          ></Route>
          <Route
            path="/login"
            element={!user ? <LoginPage /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/signup"
            element={!user ? <SignupPage /> : <Navigate to="/" />}
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
