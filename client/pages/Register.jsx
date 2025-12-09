import RegisterSection from '../components/userAccount/Register.jsx'
import '../styles/Register.css'

function Register() {
  return (
    <main className="register-page">
      <div className="register-card">
        <header className="register-header">
          <h1 className="register-title">Create your account</h1>
          <p className="register-subtitle">
            Save your best runs, track your progress, and climb the leaderboard.
          </p>
        </header>
        <RegisterSection />
      </div>
    </main>
  )
}

export default Register

