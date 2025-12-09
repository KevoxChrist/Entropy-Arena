import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import '../styles/Header.css'
import { useAuth } from '../contexts/AuthContext.jsx'
import entropyLogo from '../assets/Entropy_Logo2.svg'

const navItems = [
  { path: '/', label: 'Home', end: true },
  { path: '/arena', label: 'Arena' },
  { path: '/faq', label: 'FAQ' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/account', label: 'Account' },
]

function Header() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const closeMenu = () => setOpen(false)

  const handleLogout = () => {
    logout()
    closeMenu()
    navigate('/')
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <NavLink to="/" className="brand" onClick={closeMenu}>
          <img
            src={entropyLogo}
            alt="Entropy Arena"
            className="brand-logo"
          />
        </NavLink>

        <button
          className="nav-toggle"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="hamburger" />
        </button>

        <nav className={`nav-links ${open ? 'open' : ''}`}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
              onClick={closeMenu}
            >
              {item.label}
            </NavLink>
          ))}

          {user ? (
            <button
              type="button"
              className="nav-link nav-link--login"
              onClick={handleLogout}
            >
              Log out
            </button>
          ) : (
            <>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `nav-link nav-link--login ${isActive ? 'active' : ''}`
                }
                onClick={closeMenu}
              >
                Register
              </NavLink>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `nav-link nav-link--login ${isActive ? 'active' : ''}`
                }
                onClick={closeMenu}
              >
                Log in
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
