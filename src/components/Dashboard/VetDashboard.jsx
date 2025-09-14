import React, { useState, useEffect } from 'react'
import { 
  ChartBarIcon, 
  ShieldCheckIcon, 
  CameraIcon, 
  UserGroupIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import api from '../../api'

const VetDashboard = () => {
  const [metrics, setMetrics] = useState({
    farmsAssessed: 0,
    riskAssessments: 0,
    diseaseCases: 0,
    successRate: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/vet/dashboard')
      setMetrics(response.data.metrics)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      setMetrics({
        farmsAssessed: 45,
        riskAssessments: 32,
        diseaseCases: 8,
        successRate: 92.5
      })
    } finally {
      setLoading(false)
    }
  }

  const performanceData = [
    { month: 'Jan', assessments: 12, cases: 3 },
    { month: 'Feb', assessments: 15, cases: 2 },
    { month: 'Mar', assessments: 18, cases: 5 },
    { month: 'Apr', assessments: 14, cases: 1 },
    { month: 'May', assessments: 20, cases: 4 },
    { month: 'Jun', assessments: 16, cases: 2 }
  ]

  const upcomingAppointments = [
    { id: 1, farm: 'Green Valley Farm', time: '9:00 AM', type: 'Routine Check', status: 'confirmed' },
    { id: 2, farm: 'Sunrise Poultry', time: '11:30 AM', type: 'Disease Investigation', status: 'confirmed' },
    { id: 3, farm: 'Meadowbrook Ranch', time: '2:00 PM', type: 'Risk Assessment', status: 'pending' },
    { id: 4, farm: 'Hilltop Livestock', time: '4:30 PM', type: 'Follow-up Visit', status: 'confirmed' }
  ]

  const recentCases = [
    { id: 1, farm: 'Green Valley Farm', disease: 'Avian Influenza', severity: 'High', date: '2024-01-15', status: 'Under Treatment' },
    { id: 2, farm: 'Sunrise Poultry', disease: 'Newcastle Disease', severity: 'Medium', date: '2024-01-14', status: 'Recovered' },
    { id: 3, farm: 'Meadowbrook Ranch', disease: 'Swine Fever', severity: 'High', date: '2024-01-13', status: 'Quarantined' },
    { id: 4, farm: 'Hilltop Livestock', disease: 'Foot and Mouth', severity: 'Low', date: '2024-01-12', status: 'Monitoring' }
  ]

  const tasks = [
    { id: 1, title: 'Complete risk assessment for Green Valley Farm', priority: 'high', due: 'Today' },
    { id: 2, title: 'Review biosecurity protocols for Sunrise Poultry', priority: 'medium', due: 'Tomorrow' },
    { id: 3, title: 'Update treatment records for Meadowbrook Ranch', priority: 'low', due: 'This week' },
    { id: 4, title: 'Prepare monthly report for ministry', priority: 'high', due: 'Friday' }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vet-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Veterinarian Dashboard</h1>
          <p className="text-gray-400">Animal Health & Biosecurity Management</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-vet">
            <ShieldCheckIcon className="w-5 h-5 mr-2" />
            Risk Assessment
          </button>
          <button className="btn-secondary">
            <CameraIcon className="w-5 h-5 mr-2" />
            Image Classifier
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-vet-500/20">
              <UserGroupIcon className="w-6 h-6 text-vet-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Farms Assessed</p>
              <p className="text-2xl font-bold text-white">{metrics.farmsAssessed}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-secondary-500/20">
              <ShieldCheckIcon className="w-6 h-6 text-secondary-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Risk Assessments</p>
              <p className="text-2xl font-bold text-white">{metrics.riskAssessments}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-500/20">
              <ClipboardDocumentListIcon className="w-6 h-6 text-red-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Disease Cases</p>
              <p className="text-2xl font-bold text-white">{metrics.diseaseCases}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-500/20">
              <ChartBarIcon className="w-6 h-6 text-green-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Success Rate</p>
              <p className="text-2xl font-bold text-white">{metrics.successRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <div className="card lg:col-span-2">
          <h3 className="text-lg font-semibold text-white mb-4">Monthly Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
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
              <Bar dataKey="assessments" fill="#7b1fa2" name="Assessments" />
              <Bar dataKey="cases" fill="#ef4444" name="Disease Cases" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Upcoming Appointments */}
        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-4">Today's Appointments</h3>
          <div className="space-y-3">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="p-3 bg-gray-700/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-white">{appointment.farm}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    appointment.status === 'confirmed' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {appointment.status}
                  </span>
                </div>
                <p className="text-xs text-gray-400">{appointment.type}</p>
                <p className="text-xs text-gray-500 flex items-center mt-1">
                  <ClockIcon className="w-3 h-3 mr-1" />
                  {appointment.time}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Cases */}
        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Disease Cases</h3>
          <div className="space-y-3">
            {recentCases.map((case_) => (
              <div key={case_.id} className="p-3 bg-gray-700/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-white">{case_.farm}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    case_.severity === 'High' ? 'bg-red-500/20 text-red-400' :
                    case_.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {case_.severity}
                  </span>
                </div>
                <p className="text-sm text-gray-300">{case_.disease}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-gray-400">{case_.date}</p>
                  <p className="text-xs text-gray-500">{case_.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tasks */}
        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-4">Pending Tasks</h3>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="p-3 bg-gray-700/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-white">{task.title}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    task.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                    task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {task.priority}
                  </span>
                </div>
                <p className="text-xs text-gray-500">Due: {task.due}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VetDashboard


