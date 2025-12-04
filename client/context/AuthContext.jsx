import { createContext, useContext, useEffect, useState } from 'react'
import { loginUser, registerUser } from '../api/auth.js'

const AuthContext = createContext(null)
const STORAGE_KEY = 'entropy_arena_user'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [initialised, setInitialised] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setUser(parsed)
      }
    } catch {
      // ignore bad localStorage data
    } finally {
      setInitialised(true)
    }
  }, [])

  const login = async (credentials) => {
    const data = await loginUser(credentials)
    const nextUser = data.user
    setUser(nextUser)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser))
    } catch {
      // ignore storage errors
    }
    return nextUser
  }

  const register = async (formData) => {
    const data = await registerUser(formData)
    return data.user
  }

  const logout = () => {
    setUser(null)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore storage errors
    }
  }

  const value = {
    user,
    isAdmin: Boolean(user?.is_admin),
    initialised,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

