import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/Header.css'

const navItems = [
  { path: '/', label: 'Arena', end: true },
  { path: '/FAQ', label: 'FAQ' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/account', label: 'Account' },
]

function Header() {
  const [open, setOpen] = useState(false)

  const closeMenu = () => setOpen(false)

  return (
    <header className="site-header">
      <div className="header-inner">
        <NavLink to="/" className="brand" onClick={closeMenu}>
          <div className="logo-mark" aria-hidden="true">
            <div className="logo-knot" />
          </div>
          <div className="brand-label">
            <span className="brand-title">Entropy Arena</span>
            <span className="brand-subtitle">Build safer passwords</span>
          </div>
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

          <NavLink
            to="/login"
            className={({ isActive }) =>
              `nav-link nav-link--login ${isActive ? 'active' : ''}`
            }
            onClick={closeMenu}
          >
            Log in
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header
