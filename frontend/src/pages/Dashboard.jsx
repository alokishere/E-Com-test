import React from 'react'
import { Navigate } from 'react-router-dom'

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"))

  if (!user) {
    return <Navigate to="/login" />
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    window.location.reload()
  }

  const containerStyle = {
    padding: '24px',
    maxWidth: '400px',
    margin: '40px auto',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    fontFamily: 'system-ui, sans-serif'
  }

  const buttonStyle = {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#e11d48',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600'
  }

  return (
    <div style={containerStyle}>
      <h1 style={{ marginTop: 0, fontSize: '24px' }}>Dashboard</h1>
      <div style={{ display: 'grid', gap: '12px', color: '#374151' }}>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Mobile:</strong> {user.mobile}</p>
        <p><strong>Role:</strong> {user.isAdmin ? 'Admin' : 'User'}</p>
      </div>
      <button onClick={handleLogout} style={buttonStyle}>Logout</button>
    </div>
  )
}

export default Dashboard