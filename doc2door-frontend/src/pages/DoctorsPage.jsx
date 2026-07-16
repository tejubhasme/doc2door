import { useEffect, useState } from 'react'
import { api } from '../api/client'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function DoctorsPage(){
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    let mounted = true
    api.get('/api/doctors').then(res=>{
      if(mounted){ setDoctors(res.data || []); setLoading(false) }
    }).catch(()=> setLoading(false))
    return ()=> mounted = false
  },[])

  if(loading) return <div className="p-6">Loading doctors...</div>

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Available Doctors</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {doctors.map(doc => (
          <motion.div key={doc.id} initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} whileHover={{scale:1.02}} className="bg-white shadow rounded-lg p-4 flex gap-4 items-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-xl font-bold">
              { (doc.firstName?.[0]||'D') + (doc.lastName?.[0]||'') }
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold text-lg">{doc.firstName} {doc.lastName}</div>
                  <div className="text-sm text-gray-500">{doc.speciality || doc.specialization || 'General'}</div>
                </div>
                <div className="text-sm">
                  <div className={`inline-flex items-center gap-2 ${doc.available ? 'text-green-600' : 'text-gray-400'}`}>
                    <span className={`w-3 h-3 rounded-full ${doc.available ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                    <span>{doc.available ? 'Online' : 'Offline'}</span>
                  </div>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-600">{doc.about || 'Experienced practitioner.'}</p>
              <div className="mt-3 flex gap-2">
                <Link to={`/book/${doc.id}`} className="px-3 py-1 text-sm bg-blue-600 text-white rounded">Book</Link>
                <Link to={`/doctors/${doc.id}`} className="px-3 py-1 text-sm border rounded">View</Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}