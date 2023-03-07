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
          <Route path="/users"element={<UserList setUserData={setUserData} />}></Route>
          <Route path="/user/:userId" element={<User userData={userData} />}></Route>
          <Route path="/newUser" element={<NewUser />}></Route>
          <Route exact path="/tickets" element={<TicketsList />}></Route>
          <Route exact path="/projects" element={<ProjectsList />}></Route>
          <Route path="/tickets/:ticketId" element={<TicketDetails />}></Route>
          <Route exact path="/Newticket" element={<NewTicket />}></Route>
          <Route path="/login" element={!user?<LoginPage/>:<Navigate to='/'/>}></Route>
          <Route path="/signup" element={!user?<SignupPage/>:<Navigate to='/'/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
