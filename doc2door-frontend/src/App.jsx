import { Routes, Route, Navigate, Link } from 'react-router-dom'
import { AuthProvider, useAuth } from './auth/AuthContext'
import LoginPage from './pages/LoginPage'
import DoctorsPage from './pages/DoctorsPage'
import ProfilePage from './pages/ProfilePage'
import Navbar from './components/Navbar'
import SignupPage from './pages/SignupPage'
import HomePage from './pages/HomePage'
import BookPage from './pages/BookPage'
import AppointmentsPage from './pages/AppointmentsPage'
import DoctorDashboard from './pages/DoctorDashboard'

const PrivateRoute = ({ children, roles }) => {
  const { token, role } = useAuth()
  if (!token) return <Navigate to="/login" />
  if (roles && !roles.includes(role)) return <Navigate to="/login" />
  return children
}

const NavBar = () => {
  const { token, role, logout } = useAuth()
  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/home" className="font-semibold">Doc2Door</Link>
        <div className="flex gap-4 items-center">
          {role === 'PATIENT' && <Link to="/appointments">My Appointments</Link>}
          {role === 'DOCTOR' && <Link to="/doctor-dashboard">Dashboard</Link>}
          {token ? (
            <button onClick={logout} className="px-3 py-1 bg-red-500 text-white rounded">Logout</button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup" className="px-3 py-1 bg-blue-600 text-white rounded">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <NavBar />
      <div className="max-w-5xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          <Route path="/book/:doctorId" element={<PrivateRoute roles={["PATIENT"]}><BookPage /></PrivateRoute>} />
          <Route path="/appointments" element={<PrivateRoute roles={["PATIENT"]}><AppointmentsPage /></PrivateRoute>} />
          <Route path="/doctor-dashboard" element={<PrivateRoute roles={["DOCTOR"]}><DoctorDashboard /></PrivateRoute>} />
        </Routes>
      </div>
    </AuthProvider>
  )
}
