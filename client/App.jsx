import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import './App.css'
import { AuthProvider } from './contexts/AuthContext'
import Home from './pages/Home'
import Arena from './pages/Arena'
import Login from './pages/LogIn'
import Register from './pages/Register'
import FAQ from './pages/FAQ'
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
        <Route path="/" element= {<Home/>}/>
        <Route path="/arena" element= {<Arena/>}/>
        <Route path="/login" element= {<Login/>}/>
        <Route path="/register" element= {<Register/>}/>
        <Route path="/faq" element= {<FAQ/>}/>
        {/* <Route path="/FAQ/:lessonId" element={<FAQ />} /> */}
        {/* <Route path="/404" element= {<NotFound/>}/> */}
        <Route path="/leaderboard" element= {<Leaderboard/>}/>
        <Route path="/account" element={<AccountPage />} />
      </Routes>
      <Footer/>
      </BrowserRouter>
    </AuthProvider>
  )
}
export default App
