import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function Navbar(){
  const { user, logout } = useAuth()
  return (
    <nav className="bg-white/90 backdrop-blur shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/home" className="font-bold text-xl">Doc2Door</Link>
        <div className="flex items-center gap-4">
          <Link to="/home" className="hover:underline">Home</Link>
          <Link to="/doctors" className="hover:underline">Get a Doctor</Link>
          <Link to="/profile" className="hover:underline">Profile</Link>
          {user ? (
            <button onClick={logout} className="text-sm px-3 py-1 rounded bg-red-50">Logout</button>
          ) : (
            <Link to="/login" className="text-sm px-3 py-1 rounded bg-blue-600 text-white">Login</Link>
          )}
        </div>
      </div>
    </nav>
  )
}