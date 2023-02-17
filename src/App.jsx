import { useState } from 'react'
import Sidebar from './components/sidebar/Sidebar'
import Topbar from './components/topbar/Topbar'
import './app.css'
import Home from './pages/home/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
<Topbar></Topbar>
<div className="container">
  <Sidebar/>
 <Home/>

</div>
    </div>
  )
}

export default App
