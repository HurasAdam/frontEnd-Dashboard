import { useState } from 'react'
import Sidebar from './components/sidebar/Sidebar'
import Topbar from './components/topbar/Topbar'
import './app.css'
import Home from './pages/home/Home'
import { BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import UserList from './pages/userList/UserList'
import { User } from './pages/user/User'
import { NewUser } from './pages/newUserPage/NewUser'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { TicketsList } from './pages/TicketsList/TicketsList'
import { TicketDetails } from './pages/TicketDetails/TicketDetails'
import { NewTicket } from './pages/newTicket/NewTicket'

function App() {
  




  const [EditTicketData,setEditTicketData]=useState()
const [userData ,setUserData]=useState()
  return (
    <Router>
    


<Topbar/>

<div className="container">
  <Sidebar/>
<Switch>
  <Route exact path='/'>
 <Home/>
 </Route>
 <Route path='/users'>
<UserList setUserData={setUserData}/>
 </Route>
 <Route path='/user/:userId'>
<User userData={userData}/>
 </Route>
 <Route path='/newUser'>
<NewUser/>
 </Route>
 <Route exact path='/tickets'>
<TicketsList/>
 </Route>
 <Route path='/tickets/:ticketId'>
<TicketDetails />
 </Route>
 <Route exact path='/Newticket'>
<NewTicket />
 </Route>
<Route path='/'>
  <LoginPage/>
</Route>
 </Switch>
</div>
   </Router>
  )
}

export default App
