import { useEffect, useState } from 'react'
import { api } from '../api/client'

export default function ProfilePage(){
  const [profile, setProfile] = useState(null)
  useEffect(()=>{
    api.get('/api/auth/me').then(r=>setProfile(r.data)).catch(()=>{})
  },[])
  if(!profile) return <div className="p-6">Loading profile...</div>
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-xl font-semibold mb-2">Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div><b>Name:</b> {profile.firstName} {profile.lastName}</div>
        <div><b>Email:</b> {profile.email}</div>
        <div><b>Role:</b> {profile.role}</div>
        <div><b>Phone:</b> {profile.phone || '—'}</div>
      </div>
    </div>
  )
}