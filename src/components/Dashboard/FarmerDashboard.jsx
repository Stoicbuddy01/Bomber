import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { 
  ChartBarIcon, 
  CameraIcon, 
  UserGroupIcon, 
  ClipboardDocumentListIcon,
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
  ExclamationTriangleIcon,
  SunIcon,
  CloudIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import api from '../../api'

// Import Farmer Pages
import ImageClassifier from '../Farmer/ImageClassifier'
import FarmerNetwork from '../Farmer/FarmerNetwork'
import ComplianceTracker from '../Farmer/ComplianceTracker'
import TrainingModules from '../Farmer/TrainingModules'

const FarmerDashboard = () => {
  const navigate = useNavigate()
  const [farmHealth, setFarmHealth] = useState({
    overallStatus: 'Good',
    livestockCount: 0,
    diseaseCases: 0,
    complianceScore: 0
  })
  const [loading, setLoading] = useState(true)
  const [currentView, setCurrentView] = useState('dashboard')

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/farmer/dashboard')
      setFarmHealth(response.data.farmHealth)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      setFarmHealth({
        overallStatus: 'Good',
        livestockCount: 245,
        diseaseCases: 2,
        complianceScore: 85
      })
    } finally {
      setLoading(false)
    }
  }

  const healthTrends = [
    { month: 'Jan', health: 85, production: 92 },
    { month: 'Feb', health: 88, production: 89 },
    { month: 'Mar', health: 82, production: 95 },
    { month: 'Apr', health: 90, production: 88 },
    { month: 'May', health: 87, production: 91 },
    { month: 'Jun', health: 93, production: 94 }
  ]

  const weatherAlerts = [
    { id: 1, type: 'humidity', message: 'High humidity expected - monitor ventilation', severity: 'medium', time: '2 hours ago' },
    { id: 2, type: 'temperature', message: 'Temperature drop expected tonight', severity: 'low', time: '6 hours ago' },
    { id: 3, type: 'storm', message: 'Thunderstorm warning - secure outdoor equipment', severity: 'high', time: '1 day ago' }
  ]

  const complianceDeadlines = [
    { id: 1, document: 'Health Certificate', dueDate: '2024-01-25', status: 'pending', daysLeft: 10 },
    { id: 2, document: 'Biosecurity Audit', dueDate: '2024-02-15', status: 'pending', daysLeft: 31 },
    { id: 3, document: 'Vaccination Record', dueDate: '2024-01-30', status: 'completed', daysLeft: 0 },
    { id: 4, document: 'Feed Safety Certificate', dueDate: '2024-03-01', status: 'pending', daysLeft: 45 }
  ]

  const recentNotifications = [
    { id: 1, type: 'vet', message: 'Dr. Smith completed your farm visit', time: '1 hour ago', read: false },
    { id: 2, type: 'compliance', message: 'Health certificate approved', time: '3 hours ago', read: true },
    { id: 3, type: 'network', message: 'New message from Green Valley Farm', time: '5 hours ago', read: false },
    { id: 4, type: 'training', message: 'New biosecurity course available', time: '1 day ago', read: true }
  ]

  const quickActions = [
    { title: 'Disease Classifier', icon: CameraIcon, color: 'red', action: 'image-classifier', description: 'AI-powered disease detection' },
    { title: 'Farmer Network', icon: UserGroupIcon, color: 'blue', action: 'farmer-network', description: 'Connect with other farmers' },
    { title: 'Compliance Tracker', icon: ClipboardDocumentListIcon, color: 'green', action: 'compliance-tracker', description: 'Manage documents & deadlines' },
    { title: 'Training Modules', icon: AcademicCapIcon, color: 'purple', action: 'training-modules', description: 'Learn best practices' }
  ]

  const handleQuickAction = (action) => {
    setCurrentView(action)
  }

  const handleBackToDashboard = () => {
    setCurrentView('dashboard')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-farmer-500"></div>
      </div>
    )
  }

  // Render different views based on currentView
  if (currentView === 'image-classifier') {
    return <ImageClassifier />
  }
  if (currentView === 'farmer-network') {
    return <FarmerNetwork />
  }
  if (currentView === 'compliance-tracker') {
    return <ComplianceTracker />
  }
  if (currentView === 'training-modules') {
    return <TrainingModules />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Farm Dashboard</h1>
          <p className="text-gray-400">Welcome to your biosecurity management center</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => handleQuickAction('image-classifier')}
            className="btn-farmer"
          >
            <CameraIcon className="w-5 h-5 mr-2" />
            Disease Classifier
          </button>
          <button 
            onClick={() => handleQuickAction('farmer-network')}
            className="btn-secondary"
          >
            <UserGroupIcon className="w-5 h-5 mr-2" />
            Farmer Network
          </button>
        </div>
      </div>

      {/* Farm Health Status */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Farm Health Status</h2>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            farmHealth.overallStatus === 'Good' ? 'bg-green-500/20 text-green-400' :
            farmHealth.overallStatus === 'Fair' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {farmHealth.overallStatus}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">{farmHealth.livestockCount}</div>
            <div className="text-sm text-gray-400">Total Livestock</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">{farmHealth.diseaseCases}</div>
            <div className="text-sm text-gray-400">Active Disease Cases</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">{farmHealth.complianceScore}%</div>
            <div className="text-sm text-gray-400">Compliance Score</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={() => handleQuickAction(action.action)}
            className="card hover:bg-gray-700/50 hover:shadow-lg transition-all duration-200 text-left group cursor-pointer"
          >
            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-lg bg-${action.color}-500/20 group-hover:bg-${action.color}-500/30 transition-colors duration-200`}>
                <action.icon className={`w-6 h-6 text-${action.color}-500`} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white group-hover:text-farmer-400 transition-colors duration-200">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-400 mt-1">{action.description}</p>
                <div className="flex items-center mt-2 text-farmer-400 text-sm font-medium">
                  <span>Open</span>
                  <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Health Trends Chart */}
        <div className="card xl:col-span-2">
          <h3 className="text-lg font-semibold text-white mb-4">Health & Production Trends</h3>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={healthTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="health" 
                  stroke="#388e3c" 
                  strokeWidth={2}
                  name="Health Score"
                />
                <Line 
                  type="monotone" 
                  dataKey="production" 
                  stroke="#26a69a" 
                  strokeWidth={2}
                  name="Production Score"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weather Alerts */}
        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-4">Weather Alerts</h3>
          <div className="space-y-3">
            {weatherAlerts.map((alert) => (
              <div key={alert.id} className="p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700/70 transition-colors duration-200">
                <div className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    alert.severity === 'high' ? 'bg-red-500' :
                    alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">{alert.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Compliance Deadlines */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Compliance Deadlines</h3>
            <button 
              onClick={() => handleQuickAction('compliance-tracker')}
              className="text-farmer-400 hover:text-farmer-300 text-sm font-medium flex items-center"
            >
              View All
              <ArrowRightIcon className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="space-y-3">
            {complianceDeadlines.map((deadline) => (
              <div key={deadline.id} className="p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700/70 transition-colors duration-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-white">{deadline.document}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    deadline.status === 'completed' 
                      ? 'bg-green-500/20 text-green-400' 
                      : deadline.daysLeft <= 7
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {deadline.status === 'completed' ? 'Completed' : `${deadline.daysLeft} days left`}
                  </span>
                </div>
                <p className="text-xs text-gray-400">Due: {deadline.dueDate}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Notifications */}
        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Notifications</h3>
          <div className="space-y-3">
            {recentNotifications.map((notification) => (
              <div key={notification.id} className={`p-3 rounded-lg hover:bg-gray-700/70 transition-colors duration-200 ${
                notification.read ? 'bg-gray-700/30' : 'bg-gray-700/50'
              }`}>
                <div className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    notification.read ? 'bg-gray-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FarmerDashboard


