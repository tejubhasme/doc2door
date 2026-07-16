import { useState } from 'react'
import { api } from '../api/client'
import { useNavigate } from 'react-router-dom'

export default function SignupPage() {
  const [role, setRole] = useState('PATIENT')
  const [form, setForm] = useState({ name:'', email:'', password:'', phone:'', address:'', city:'', specialization:'', fees:'', experienceYears:'' })
  const [msg, setMsg] = useState('')
  const [err, setErr] = useState('')
  const navigate = useNavigate()

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault(); setErr(''); setMsg('')
    try {
      if (role === 'PATIENT') {
        await api.post('/api/auth/patient/signup', { name: form.name, email: form.email, password: form.password, phone: form.phone, address: form.address, city: form.city })
      } else {
        await api.post('/api/auth/doctor/signup', { name: form.name, email: form.email, password: form.password, phone: form.phone, specialization: form.specialization, fees: Number(form.fees), experienceYears: Number(form.experienceYears), city: form.city })
      }
      setMsg('Signup successful. You can login now.')
      setTimeout(()=>navigate('/login'), 800)
    } catch (e) {
      setErr(e.response?.data?.message || 'Signup failed')
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-xl font-semibold mb-4">Sign up</h1>
      <div className="flex gap-4 mb-4">
        <label className="flex items-center gap-2"><input type="radio" checked={role==='PATIENT'} onChange={()=>setRole('PATIENT')} /> Patient</label>
        <label className="flex items-center gap-2"><input type="radio" checked={role==='DOCTOR'} onChange={()=>setRole('DOCTOR')} /> Doctor</label>
      </div>
      {msg && <div className="mb-2 text-green-700">{msg}</div>}
      {err && <div className="mb-2 text-red-600">{err}</div>}
      <form onSubmit={submit} className="grid grid-cols-2 gap-3">
        <input className="border p-2 rounded col-span-2" name="name" placeholder="Name" value={form.name} onChange={onChange} required />
        <input className="border p-2 rounded col-span-1" name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} required />
        <input className="border p-2 rounded col-span-1" name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} required />
        <input className="border p-2 rounded" name="phone" placeholder="Phone" value={form.phone} onChange={onChange} required />
        <input className="border p-2 rounded" name="city" placeholder="City" value={form.city} onChange={onChange} required />
        {role==='PATIENT' && (
          <input className="border p-2 rounded col-span-2" name="address" placeholder="Address" value={form.address} onChange={onChange} required />
        )}
        {role==='DOCTOR' && (
          <>
            <input className="border p-2 rounded" name="specialization" placeholder="Specialization" value={form.specialization} onChange={onChange} required />
            <input className="border p-2 rounded" name="fees" placeholder="Fees" value={form.fees} onChange={onChange} required />
            <input className="border p-2 rounded col-span-2" name="experienceYears" placeholder="Experience Years" value={form.experienceYears} onChange={onChange} required />
          </>
        )}
        <button className="bg-blue-600 text-white py-2 rounded col-span-2">Create account</button>
      </form>
    </div>
  )
}


