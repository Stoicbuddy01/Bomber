import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import darkTheme from './theme'
import api, { setAuthToken } from './api'
import { useTranslation } from 'react-i18next'
import i18n from './i18n'

// Layout Components
import Layout from './components/Layout/Layout'
import Sidebar from './components/Layout/Sidebar'
import Header from './components/Layout/Header'

// Auth Components
import Auth from './components/Auth/Auth'
import LandingPage from './components/Landing/LandingPage'

// Dashboard Components
import AdminDashboard from './components/Dashboard/AdminDashboard'
import VetDashboard from './components/Dashboard/VetDashboard'
import FarmerDashboard from './components/Dashboard/FarmerDashboard'

// Loading Component
import LoadingSpinner from './components/Common/LoadingSpinner'

// Test Component
import TailwindTest from './components/Test/TailwindTest'

const App = () => {
  const [user, setUser] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
        setUserRole(parsedUser.userType)
      } catch (error) {
        console.error('Error parsing user data:', error)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
        setUserRole(null)
      }
    }
    setLoading(false)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setAuthToken(null)
    setUser(null)
    setUserRole(null)
    setShowAuth(false)
  }

  const handleLoginClick = () => {
    setShowAuth(true)
  }

  const handleBackToLanding = () => {
    setShowAuth(false)
  }

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language)
  }

  if (loading) {
    return <LoadingSpinner />
  }

  // Temporarily show Tailwind test for debugging
  if (window.location.search.includes('test=tailwind')) {
    return <TailwindTest />
  }

  if (!user) {
    return (
      <ThemeProvider theme={darkTheme}>
        <div className="min-h-screen bg-gray-900">
          {showAuth ? (
            <Auth onBackToLanding={handleBackToLanding} />
          ) : (
            <LandingPage onLoginClick={handleLoginClick} />
          )}
        </div>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <div className="min-h-screen bg-gray-900">
          <Layout>
            <Sidebar 
              isOpen={sidebarOpen} 
              onClose={() => setSidebarOpen(false)}
              userRole={userRole}
            />
            <div className="flex-1 flex flex-col">
              <Header 
                user={user}
                onMenuClick={() => setSidebarOpen(true)}
                onLogout={handleLogout}
                onLanguageChange={handleLanguageChange}
              />
              <main className="flex-1 p-6">
                <Routes>
                  <Route path="/" element={
                    userRole === 'admin' ? <AdminDashboard /> :
                    userRole === 'vet' ? <VetDashboard /> :
                    <FarmerDashboard />
                  } />
                  <Route path="/admin/*" element={
                    userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/" />
                  } />
                  <Route path="/vet/*" element={
                    userRole === 'vet' ? <VetDashboard /> : <Navigate to="/" />
                  } />
                  <Route path="/farmer/*" element={
                    userRole === 'farmer' ? <FarmerDashboard /> : <Navigate to="/" />
                  } />
                </Routes>
              </main>
            </div>
          </Layout>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
