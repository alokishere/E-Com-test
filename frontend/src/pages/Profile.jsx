import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const Profile = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))

  if (!user) {
    return <Navigate to="/login" />
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    window.location.reload()
  }

  const styles = {
    container: {
      padding: '32px',
      maxWidth: '480px',
      margin: '60px auto',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
      backgroundColor: '#ffffff',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      color: '#1f2937',
      border: '1px solid #f3f4f6'
    },
    header: {
      marginBottom: '24px',
      textAlign: 'center'
    },
    title: {
      margin: '0 0 8px 0',
      fontSize: '28px',
      fontWeight: '800',
      color: '#111827',
      letterSpacing: '-0.025em'
    },
    section: {
      marginTop: '24px',
      padding: '20px',
      backgroundColor: '#f9fafb',
      borderRadius: '12px',
      border: '1px solid #f3f4f6'
    },
    sectionTitle: {
      fontSize: '12px',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      color: '#6b7280',
      marginBottom: '16px',
      fontWeight: '700'
    },
    infoRow: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '8px 0',
      borderBottom: '1px solid #f1f5f9'
    },
    label: {
      color: '#64748b',
      fontSize: '14px'
    },
    value: {
      color: '#0f172a',
      fontWeight: '600',
      fontSize: '14px'
    },
    buttonGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      marginTop: '32px'
    },
    actionBtn: {
      padding: '12px 24px',
      borderRadius: '8px',
      fontWeight: '600',
      fontSize: '15px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      border: 'none',
      textAlign: 'center'
    },
    primaryBtn: {
      backgroundColor: '#2563eb',
      color: 'white',
    },
    secondaryBtn: {
      backgroundColor: '#10b981',
      color: 'white',
    },
    logoutBtn: {
      backgroundColor: '#fff',
      color: '#ef4444',
      border: '1px solid #fee2e2',
      marginTop: '8px'
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Account Dashboard</h1>
        <p style={{ color: '#6b7280', margin: 0 }}>Manage your profile and preferences</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Personal Details</h2>
        <div style={styles.infoRow}>
          <span style={styles.label}>Username</span>
          <span style={styles.value}>{user.username}</span>
        </div>
        <div style={styles.infoRow}>
          <span style={styles.label}>Mobile Number</span>
          <span style={styles.value}>{user.mobile}</span>
        </div>
        <div style={{ ...styles.infoRow, borderBottom: 'none' }}>
          <span style={styles.label}>Account Role</span>
          <span style={{ ...styles.value, color: user.isAdmin ? '#2563eb' : '#10b981' }}>
            {user.isAdmin ? 'Administrator' : 'Customer'}
          </span>
        </div>
      </div>

      <div style={styles.buttonGroup}>
        {user.isAdmin ? (
          <button 
            onClick={() => navigate('/admin/create-product')} 
            style={{ ...styles.actionBtn, ...styles.primaryBtn }}
          >
            Create New Product
          </button>
        ) : (
          <button 
            onClick={() => navigate('/products')} 
            style={{ ...styles.actionBtn, ...styles.secondaryBtn }}
          >
            Shop Now
          </button>
        )}
        
        <button onClick={handleLogout} style={{ ...styles.actionBtn, ...styles.logoutBtn }}>
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default Profile