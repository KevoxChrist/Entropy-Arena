import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './contexts/AuthContext'
import Arena from './pages/Arena'
import Login from './pages/LogIn'
// import FAQ from './pages/FAQ'
import AccountPage from './pages/Account'
// import NotFound from './pages/NotFound' 
import Leaderboard from './pages/Leaderboard'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/Login" element= {<Login/>}/>
        {/* <Route path="/FAQ" element= {<FAQ/>}/> */}
        {/* <Route path="/FAQ/:lessonId" element={<FAQ />} /> */}
        <Route path="/" element= {<Arena/>}/>
        {/* <Route path="/404" element= {<NotFound/>}/> */}
        <Route path="/Leaderboard" element= {<Leaderboard/>}/>
        <Route path="/Account" element={<AccountPage />} />
      </Routes>
      <Footer/>
      </BrowserRouter>
    </AuthProvider>
  )
}
export default App
