import { useEffect, useState } from 'react'
import { api } from '../api/client'

export default function DoctorDashboard() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const load = async () => {
    setLoading(true)
    const { data } = await api.get('/api/appointments/doctor/me')
    setItems(data); setLoading(false)
  }
  useEffect(()=>{ load() }, [])

  const action = async (id, action) => { await api.post(`/api/appointments/${id}/doctor-action`, { action }); load() }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Doctor Dashboard</h1>
      {loading? 'Loading...' : (
        <div className="grid gap-3">
          {items.map(a => (
            <div key={a.appointmentId} className="bg-white p-4 rounded shadow flex justify-between items-center">
              <div>
                <div className="font-semibold">#{a.appointmentId} — {a.patient?.name}</div>
                <div className="text-sm text-gray-600">{new Date(a.appointmentDate).toLocaleString()} • {a.status} • {a.patientAddress}</div>
              </div>
              <div className="flex gap-2">
                {a.status==='PENDING' && (
                  <>
                    <button onClick={()=>action(a.appointmentId,'ACCEPT')} className="px-3 py-1 bg-emerald-600 text-white rounded">Accept</button>
                    <button onClick={()=>action(a.appointmentId,'REJECT')} className="px-3 py-1 bg-gray-300 rounded">Reject</button>
                  </>
                )}
                {a.status==='ACCEPTED' && (
                  <>
                    <button onClick={()=>action(a.appointmentId,'COMPLETE')} className="px-3 py-1 bg-blue-600 text-white rounded">Complete</button>
                    <button onClick={()=>action(a.appointmentId,'CANCEL')} className="px-3 py-1 bg-red-500 text-white rounded">Cancel</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


