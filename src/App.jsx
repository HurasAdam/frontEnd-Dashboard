import { useState } from 'react'
import Sidebar from './components/sidebar/Sidebar'
import Topbar from './components/topbar/Topbar'
import './app.css'
import Home from './pages/home/Home'
import { BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import UserList from './pages/userList/UserList'
import { User } from './pages/user/User'
import { NewUser } from './pages/newUserPage/NewUser'
function App() {
  
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
 </Switch>
</div>
   </Router>
  )
}

export default App
