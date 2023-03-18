import { useContext, useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./app.css";
import Home from "./pages/home/Home";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import UserList from "./pages/userList/UserList";
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
import { SettingsPage } from "./pages/settingsPage/SettingsPage";
function App() {
  const {user}=useContext(AuthContext)
  const [EditTicketData, setEditTicketData] = useState();
  const [userData, setUserData] = useState();
  return (
    <BrowserRouter>
      <Topbar />

      <div className="container">
        <Sidebar />
        <Routes>
          <Route exact path="/" element={user?<Home />:<Navigate to='/login'/>}></Route>
          <Route path="/users"element={user?<UserList setUserData={setUserData} />:<Navigate to='/login'/>}></Route>
          <Route path="/user/:userId" element={user?<User userData={userData} />:<Navigate to='/login'/>}></Route>
          <Route path="/newUser" element={user?<NewUser />:<Navigate to='/login'/>}></Route>
          <Route exact path="/tickets" element={user?<TicketsList />:<Navigate to='/login'/>}></Route>
          <Route exact path="/projects" element={user?<ProjectsList />:<Navigate to='/login'/>}></Route>
          <Route exact path="/NewProject" element={user?<NewProject/>:<Navigate to='/login'/>}></Route>
          <Route path="/projects/:projectId" element={user?<ProjectDetails />:<Navigate to='/login'/>}> </Route>
          <Route  path="/settings" element={<SettingsPage/>}> </Route>

  
          <Route path="/tickets/:ticketId" element={user?<TicketDetails/>:<Navigate to='/login'/>}></Route>
          <Route exact path="/Newticket" element={user?<NewTicket />:<Navigate to='/login'/>}></Route>
          <Route path="/login" element={!user?<LoginPage/>:<Navigate to='/'/>}></Route>
          <Route path="/signup" element={!user?<SignupPage/>:<Navigate to='/'/>}></Route>
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
