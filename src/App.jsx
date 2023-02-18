import { useState } from 'react'
import Sidebar from './components/sidebar/Sidebar'
import Topbar from './components/topbar/Topbar'
import './app.css'
import Home from './pages/home/Home'
import { BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import UserList from './pages/userList/UserList'
import { User } from './pages/user/User'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
<Topbar></Topbar>
<div className="container">
  <Sidebar/>
<Switch>
  <Route exact path='/'>
 <Home/>
 </Route>
 <Route path='/users'>
<UserList/>
 </Route>
 <Route path='/user/:userId'>
<User/>
 </Route>
 </Switch>
</div>
   </Router>
  )
}

export default App
