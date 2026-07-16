import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/client'
import { useAuth } from '../auth/AuthContext'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('PATIENT')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const auth = useAuth()

  const submit = async (e) => {
    e.preventDefault(); setError('')
    try {
      const { data } = await api.post('/api/auth/login', { email, password, role })
      auth.login(data)
      navigate(role === 'DOCTOR' ? '/doctor-dashboard' : '/home')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-xl font-semibold mb-4">Login</h1>
      {error && <div className="mb-3 text-red-600">{error}</div>}
      <form onSubmit={submit} className="space-y-3">
        <div className="flex gap-4">
          <label className="flex items-center gap-2"><input type="radio" checked={role==='PATIENT'} onChange={()=>setRole('PATIENT')} /> Patient</label>
          <label className="flex items-center gap-2"><input type="radio" checked={role==='DOCTOR'} onChange={()=>setRole('DOCTOR')} /> Doctor</label>
        </div>
        <input className="w-full border p-2 rounded" placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input className="w-full border p-2 rounded" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  )
}


