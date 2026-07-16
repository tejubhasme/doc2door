import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [role, setRole] = useState(localStorage.getItem('role'))
  const [userId, setUserId] = useState(localStorage.getItem('userId'))
  const [name, setName] = useState(localStorage.getItem('name'))

  const login = (data) => {
    setToken(data.token)
    setRole(data.role)
    setUserId(String(data.id))
    setName(data.name)
    localStorage.setItem('token', data.token)
    localStorage.setItem('role', data.role)
    localStorage.setItem('userId', String(data.id))
    localStorage.setItem('name', data.name)
  }

  const logout = () => {
    setToken(null); setRole(null); setUserId(null); setName(null)
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('userId')
    localStorage.removeItem('name')
  }

  const value = { token, role, userId, name, login, logout }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)


