import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  HomeIcon, 
  ChartBarIcon, 
  ExclamationTriangleIcon,
  DocumentCheckIcon,
  BellIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  CameraIcon,
  ClipboardDocumentListIcon,
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
  CalendarIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline'

const Sidebar = ({ isOpen, onClose, userRole }) => {
  const location = useLocation()

  const getRoleColor = () => {
    switch (userRole) {
      case 'admin': return 'admin'
      case 'vet': return 'vet'
      case 'farmer': return 'farmer'
      default: return 'primary'
    }
  }

  const getNavigationItems = () => {
    const baseItems = [
      { name: 'Dashboard', href: '/', icon: HomeIcon },
    ]

    if (userRole === 'admin') {
      return [
        ...baseItems,
        { name: 'Emergency Response', href: '/admin/emergency', icon: ExclamationTriangleIcon },
        { name: 'Compliance Tracking', href: '/admin/compliance', icon: DocumentCheckIcon },
        { name: 'Notifications', href: '/admin/notifications', icon: BellIcon },
        { name: 'Analytics', href: '/admin/analytics', icon: ChartBarIcon },
      ]
    } else if (userRole === 'vet') {
      return [
        ...baseItems,
        { name: 'Risk Assessment', href: '/vet/risk-assessment', icon: ShieldCheckIcon },
        { name: 'Protection Hub', href: '/vet/protection-hub', icon: UserGroupIcon },
        { name: 'Health Predictor', href: '/vet/health-predictor', icon: ChartBarIcon },
        { name: 'Image Classifier', href: '/vet/image-classifier', icon: CameraIcon },
        { name: 'Appointments', href: '/vet/appointments', icon: CalendarIcon },
      ]
    } else if (userRole === 'farmer') {
      return [
        ...baseItems,
        { name: 'Image Classifier', href: '/farmer/image-classifier', icon: CameraIcon },
        { name: 'Farmer Network', href: '/farmer/network', icon: UserGroupIcon },
        { name: 'Compliance Tracker', href: '/farmer/compliance', icon: ClipboardDocumentListIcon },
        { name: 'Training Modules', href: '/farmer/training', icon: AcademicCapIcon },
        { name: 'Community Forum', href: '/farmer/forum', icon: ChatBubbleLeftRightIcon },
      ]
    }

    return baseItems
  }

  const navigationItems = getNavigationItems()

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-0
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-700">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-lg bg-${getRoleColor()}-500 flex items-center justify-center`}>
              <span className="text-white font-bold text-lg">P3</span>
            </div>
            <span className="ml-3 text-xl font-bold text-white">Biosecurity</span>
          </div>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    sidebar-item group
                    ${isActive ? 'active' : ''}
                  `}
                  onClick={onClose}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              )
            })}
          </div>

          {/* Settings */}
          <div className="mt-8 pt-6 border-t border-gray-700">
            <Link
              to="/settings"
              className="sidebar-item group"
              onClick={onClose}
            >
              <Cog6ToothIcon className="w-5 h-5 mr-3" />
              <span className="text-sm font-medium">Settings</span>
            </Link>
          </div>
        </nav>
      </div>
    </>
  )
}

export default Sidebar


