import React, { useState, useEffect } from 'react'
import { 
  ChartBarIcon, 
  ExclamationTriangleIcon, 
  DocumentCheckIcon, 
  BellIcon,
  UserGroupIcon,
  MapIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'
import api from '../../api'

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState({
    totalFarms: 0,
    farmsInspected: 0,
    activeOutbreaks: 0,
    complianceRate: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Simulate API call - replace with actual endpoint
      const response = await api.get('/admin/dashboard')
      setMetrics(response.data.metrics)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      // Fallback to mock data
      setMetrics({
        totalFarms: 1247,
        farmsInspected: 892,
        activeOutbreaks: 3,
        complianceRate: 87.5
      })
    } finally {
      setLoading(false)
    }
  }

  const diseaseData = [
    { name: 'Jan', cases: 12 },
    { name: 'Feb', cases: 8 },
    { name: 'Mar', cases: 15 },
    { name: 'Apr', cases: 22 },
    { name: 'May', cases: 18 },
    { name: 'Jun', cases: 25 }
  ]

  const complianceData = [
    { name: 'Compliant', value: 87.5, color: '#10b981' },
    { name: 'Non-Compliant', value: 12.5, color: '#ef4444' }
  ]

  const inspectionData = [
    { month: 'Jan', inspections: 45 },
    { month: 'Feb', inspections: 52 },
    { month: 'Mar', inspections: 38 },
    { month: 'Apr', inspections: 61 },
    { month: 'May', inspections: 48 },
    { month: 'Jun', inspections: 55 }
  ]

  const recentActivities = [
    { id: 1, type: 'outbreak', message: 'New disease outbreak reported in Region A', time: '2 minutes ago', priority: 'high' },
    { id: 2, type: 'inspection', message: 'Farm inspection completed - Green Valley Farm', time: '1 hour ago', priority: 'medium' },
    { id: 3, type: 'compliance', message: 'Compliance certificate issued - Sunrise Poultry', time: '3 hours ago', priority: 'low' },
    { id: 4, type: 'alert', message: 'Weather alert: High humidity expected', time: '5 hours ago', priority: 'medium' }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-admin-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-400">Ministry of Agriculture - Biosecurity Management</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-admin">
            <ExclamationTriangleIcon className="w-5 h-5 mr-2" />
            Emergency Response
          </button>
          <button className="btn-secondary">
            <DocumentCheckIcon className="w-5 h-5 mr-2" />
            Compliance Tracking
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-admin-500/20">
              <UserGroupIcon className="w-6 h-6 text-admin-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Total Farms</p>
              <p className="text-2xl font-bold text-white">{metrics.totalFarms.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-secondary-500/20">
              <DocumentCheckIcon className="w-6 h-6 text-secondary-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Farms Inspected</p>
              <p className="text-2xl font-bold text-white">{metrics.farmsInspected.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-500/20">
              <ExclamationTriangleIcon className="w-6 h-6 text-red-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Active Outbreaks</p>
              <p className="text-2xl font-bold text-white">{metrics.activeOutbreaks}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-500/20">
              <ChartBarIcon className="w-6 h-6 text-green-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Compliance Rate</p>
              <p className="text-2xl font-bold text-white">{metrics.complianceRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Disease Trends */}
        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-4">Disease Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={diseaseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" />
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
                dataKey="cases" 
                stroke="#ef4444" 
                strokeWidth={2}
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Compliance Status */}
        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-4">Compliance Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={complianceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {complianceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Inspections */}
        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-4">Monthly Inspections</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={inspectionData}>
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
              <Bar dataKey="inspections" fill="#2196f3" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="card lg:col-span-2">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-700/50 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.priority === 'high' ? 'bg-red-500' :
                  activity.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm text-white">{activity.message}</p>
                  <p className="text-xs text-gray-400 flex items-center mt-1">
                    <ClockIcon className="w-3 h-3 mr-1" />
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard


