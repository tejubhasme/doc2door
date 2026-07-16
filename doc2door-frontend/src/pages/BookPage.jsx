import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { api } from '../api/client'

export default function BookPage() {
  const { doctorId } = useParams()
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [address, setAddress] = useState('')
  const [msg, setMsg] = useState('')
  const [err, setErr] = useState('')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault(); setErr('')
    try {
      const appointmentDate = new Date(`${date}T${time}:00`)
      await api.post('/api/appointments/book', { doctorId: Number(doctorId), appointmentDate, patientAddress: address })
      setMsg('Appointment booked!')
      setTimeout(()=>navigate('/appointments'), 800)
    } catch (e) { setErr(e.response?.data?.message || 'Booking failed') }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-6">
      <h1 className="text-xl font-semibold mb-4">Book Appointment</h1>
      {msg && <div className="text-green-700 mb-2">{msg}</div>}
      {err && <div className="text-red-600 mb-2">{err}</div>}
      <form onSubmit={submit} className="space-y-3">
        <input type="date" className="w-full border p-2 rounded" value={date} onChange={e=>setDate(e.target.value)} required />
        <input type="time" className="w-full border p-2 rounded" value={time} onChange={e=>setTime(e.target.value)} required />
        <input className="w-full border p-2 rounded" placeholder="Address" value={address} onChange={e=>setAddress(e.target.value)} required />
        <button className="w-full bg-emerald-600 text-white py-2 rounded">Confirm Booking</button>
      </form>
    </div>
  )
}


