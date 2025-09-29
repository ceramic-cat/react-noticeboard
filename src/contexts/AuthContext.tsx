import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type User from '../interfaces/User'

interface AuthContextType {
  isLoggedIn: boolean
  user: User | null
  loading: boolean
  login: (user: User) => void
  logout: () => Promise<void>
  checkAuth: () => Promise<void> // refresh
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // check session validity on mount
  async function checkAuth() {
    try {
      const response = await fetch('/api/login', {
        method: 'GET',
        credentials: 'include' // includes cookies
      })

      if (response.ok) {
        const data = await response.json()
        setIsLoggedIn(true)
        setUser(data.user)
      } else {
        setIsLoggedIn(false)
        setUser(null)
      }
    }
    catch (error) {
      console.error('Auth check failed: ', error)
      setIsLoggedIn(false)
      setUser(null)
    }
    finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    checkAuth()
  }, [])

  function login(userData: User) {
    setIsLoggedIn(true)
    setUser(userData)
  }

  async function logout() {
    try {
      await fetch('/api/login', {
        method: 'DELETE'
      })
    }
    catch (error) {
      console.error('Logout failed: ', error)
    }
    // clear state even if request fails
    finally {
      setIsLoggedIn(false)
      setUser(null)
    }
  }
  return (
    <AuthContext.Provider value={{ isLoggedIn, user, loading, login, logout, checkAuth }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}