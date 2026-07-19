import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api/client'

export default function HomePage() {
  const [city, setCity] = useState('')
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/api/doctors', { params: { city: city || undefined }})
      setDoctors(data)
    } catch (err) {
      console.error('Failed to load doctors:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input className="border p-2 rounded" placeholder="Filter by city" value={city} onChange={e=>setCity(e.target.value)} />
        <button onClick={load} className="px-3 py-2 bg-blue-600 text-white rounded">Search</button>
      </div>
      {loading ? 'Loading...' : (
        <div className="grid md:grid-cols-2 gap-4">
          {doctors.map(d => (
            <div key={d.doctorId} className="bg-white p-4 rounded shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{d.name}</h3>
                  <div className="text-sm text-gray-600">{d.specialization} • {d.city}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${d.fees}</div>
                  <div className="text-xs text-gray-500">{d.experienceYears} yrs exp</div>
                </div>
              </div>
              <div className="mt-3 flex justify-between">
                <div className={`text-xs ${d.available? 'text-green-700':'text-red-600'}`}>{d.available? 'Available':'Unavailable'}</div>
                <Link to={`/book/${d.doctorId}`} className="px-3 py-1 bg-emerald-600 text-white rounded">Book</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
