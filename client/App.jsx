import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
// import Arena from './pages/Arena'
import Login from './pages/Login'
// import Lesson from './pages/Lesson'
// import Arena from './pages/Arena'
// import NotFound from './pages/NotFound'
import Leaderboard from './pages/Leaderboard'


function App() {
  return (
    <BrowserRouter>
    <Routes>
      {/* <Route path="/battle-arena" element= {<Arena/>}/> */}
      <Route path="/login" element= {<Login/>}/>
      {/* <Route path="/login" element= {<Lesson/>}/> */}
      {/* <Route path="/Arena" element= {<Arena/>}/> */}
      {/* <Route path="/NotFound" element= {<NotFound/>}/> */}
      <Route path="/Leaderboard" element= {<Leaderboard/>}/>
    </Routes>
    </BrowserRouter>
  )
}
export default App