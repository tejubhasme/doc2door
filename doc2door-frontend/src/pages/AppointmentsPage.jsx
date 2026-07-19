import { useEffect, useState } from 'react'
import { api } from '../api/client'

export default function AppointmentsPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/api/appointments/me')
      setItems(data)
    } catch (err) {
      console.error('Failed to load appointments:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const cancel = async (id) => {
    try {
      await api.post(`/api/appointments/${id}/cancel`)
      load()
    } catch (err) {
      console.error('Failed to cancel appointment:', err)
    }
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">My Appointments</h1>
      {loading ? 'Loading...' : (
        <div className="grid gap-3">
          {items.map(a => (
            <div key={a.appointmentId} className="bg-white p-4 rounded shadow flex justify-between items-center">
              <div>
                <div className="font-semibold">#{a.appointmentId} with Dr. {a.doctor?.name}</div>
                <div className="text-sm text-gray-600">{new Date(a.appointmentDate).toLocaleString()} • {a.status}</div>
              </div>
              {(a.status === 'PENDING' || a.status === 'ACCEPTED') && (
                <button onClick={() => cancel(a.appointmentId)} className="px-3 py-1 bg-red-500 text-white rounded">Cancel</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
