import React, { useState, useEffect } from 'react'
import { 
  UserGroupIcon, 
  MapPinIcon, 
  ChatBubbleLeftRightIcon,
  UserPlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CalendarIcon,
  StarIcon,
  PhoneIcon,
  EnvelopeIcon,
  ArrowUpTrayIcon
} from '@heroicons/react/24/outline'

const FarmerNetwork = () => {
  const [activeTab, setActiveTab] = useState('directory')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedFarm, setSelectedFarm] = useState(null)

  const [farms, setFarms] = useState([
    {
      id: 1,
      name: 'Green Valley Farm',
      owner: 'John Smith',
      type: 'Poultry',
      size: '50 acres',
      location: 'Delhi, India',
      distance: '5.2 km',
      rating: 4.8,
      livestock: 1200,
      specialties: ['Organic Farming', 'Free Range'],
      contact: '+91 98765 43210',
      email: 'john@greenvalley.com',
      description: 'Specialized in organic poultry farming with 15 years of experience.',
      joined: '2023-01-15',
      lastActive: '2 hours ago',
      isConnected: false
    },
    {
      id: 2,
      name: 'Sunrise Piggery',
      owner: 'Maria Garcia',
      type: 'Pig',
      size: '25 acres',
      location: 'Mumbai, India',
      distance: '12.8 km',
      rating: 4.6,
      livestock: 800,
      specialties: ['Biosecurity', 'Feed Management'],
      contact: '+91 98765 43211',
      email: 'maria@sunrisepiggery.com',
      description: 'Modern pig farming with advanced biosecurity protocols.',
      joined: '2023-03-20',
      lastActive: '1 day ago',
      isConnected: true
    },
    {
      id: 3,
      name: 'Golden Harvest Farm',
      owner: 'Raj Patel',
      type: 'Both',
      size: '100 acres',
      location: 'Pune, India',
      distance: '25.3 km',
      rating: 4.9,
      livestock: 2500,
      specialties: ['Mixed Farming', 'Technology Integration'],
      contact: '+91 98765 43212',
      email: 'raj@goldenharvest.com',
      description: 'Large-scale mixed farming operation with modern technology.',
      joined: '2022-11-10',
      lastActive: '3 hours ago',
      isConnected: false
    },
    {
      id: 4,
      name: 'Eco-Friendly Poultry',
      owner: 'Sarah Johnson',
      type: 'Poultry',
      size: '30 acres',
      location: 'Bangalore, India',
      distance: '8.7 km',
      rating: 4.7,
      livestock: 1500,
      specialties: ['Sustainable Farming', 'Disease Prevention'],
      contact: '+91 98765 43213',
      email: 'sarah@ecopoultry.com',
      description: 'Sustainable poultry farming with focus on disease prevention.',
      joined: '2023-02-05',
      lastActive: '5 hours ago',
      isConnected: true
    }
  ])

  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'Green Valley Farm',
      message: 'Hi! I saw your post about biosecurity measures. Could you share some tips?',
      time: '2 hours ago',
      unread: true
    },
    {
      id: 2,
      from: 'Sunrise Piggery',
      message: 'Thanks for the feed supplier recommendation!',
      time: '1 day ago',
      unread: false
    },
    {
      id: 3,
      from: 'Golden Harvest Farm',
      message: 'The vaccination schedule you shared was very helpful.',
      time: '2 days ago',
      unread: true
    }
  ])

  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Biosecurity Workshop',
      date: '2024-02-15',
      time: '10:00 AM',
      location: 'Delhi Agricultural Center',
      attendees: 25,
      description: 'Learn about advanced biosecurity measures for livestock farming.'
    },
    {
      id: 2,
      title: 'Farmers Meet & Greet',
      date: '2024-02-20',
      time: '2:00 PM',
      location: 'Community Hall, Mumbai',
      attendees: 40,
      description: 'Network with local farmers and share experiences.'
    },
    {
      id: 3,
      title: 'Technology in Agriculture',
      date: '2024-02-25',
      time: '9:00 AM',
      location: 'Online Event',
      attendees: 100,
      description: 'Discover latest agricultural technologies and their applications.'
    }
  ])

  const filteredFarms = farms.filter(farm => {
    const matchesSearch = farm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farm.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farm.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || farm.type.toLowerCase() === filterType.toLowerCase()
    return matchesSearch && matchesFilter
  })

  const handleConnect = (farmId) => {
    setFarms(farms.map(farm => 
      farm.id === farmId 
        ? { ...farm, isConnected: !farm.isConnected }
        : farm
    ))
  }

  const tabs = [
    { id: 'directory', label: 'Farm Directory', icon: UserGroupIcon },
    { id: 'messages', label: 'Messages', icon: ChatBubbleLeftRightIcon },
    { id: 'events', label: 'Events', icon: CalendarIcon }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Farmer Network</h1>
          <p className="text-gray-400">Connect with fellow farmers and share knowledge</p>
        </div>
        <button
          onClick={() => window.history.back()}
          className="flex items-center px-4 py-2 text-gray-400 hover:text-white transition-colors duration-200"
        >
          <ArrowUpTrayIcon className="w-5 h-5 mr-2 rotate-90" />
          Back to Dashboard
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-700">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-farmer-500 text-farmer-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-5 h-5 mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Directory Tab */}
      {activeTab === 'directory' && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="card">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search farms, owners, or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-farmer-500"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-farmer-500"
                >
                  <option value="all">All Types</option>
                  <option value="poultry">Poultry</option>
                  <option value="pig">Pig</option>
                  <option value="both">Both</option>
                </select>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white hover:bg-gray-600 transition-colors duration-200"
                >
                  <FunnelIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Farm Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFarms.map((farm) => (
              <div key={farm.id} className="card hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{farm.name}</h3>
                    <p className="text-gray-400">by {farm.owner}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <StarIcon className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-300">{farm.rating}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-300">
                    <MapPinIcon className="w-4 h-4 mr-2 text-gray-400" />
                    {farm.location} • {farm.distance}
                  </div>
                  <div className="text-sm text-gray-300">
                    <span className="font-medium">{farm.type}</span> • {farm.size} • {farm.livestock} animals
                  </div>
                  <div className="text-sm text-gray-300">
                    Last active: {farm.lastActive}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {farm.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-farmer-500/20 text-farmer-400 text-xs rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-sm text-gray-300 mb-4">{farm.description}</p>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleConnect(farm.id)}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                      farm.isConnected
                        ? 'bg-gray-600 text-gray-300'
                        : 'bg-farmer-500 hover:bg-farmer-600 text-white'
                    }`}
                  >
                    {farm.isConnected ? 'Connected' : 'Connect'}
                  </button>
                  <button
                    onClick={() => setSelectedFarm(farm)}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Messages Tab */}
      {activeTab === 'messages' && (
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-semibold text-white mb-4">Recent Messages</h2>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 rounded-lg border transition-colors duration-200 ${
                    message.unread
                      ? 'bg-farmer-500/10 border-farmer-500/30'
                      : 'bg-gray-700/50 border-gray-600'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-white">{message.from}</h3>
                      <p className="text-gray-300 mt-1">{message.message}</p>
                      <p className="text-sm text-gray-400 mt-2">{message.time}</p>
                    </div>
                    {message.unread && (
                      <div className="w-2 h-2 bg-farmer-500 rounded-full"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Events Tab */}
      {activeTab === 'events' && (
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-semibold text-white mb-4">Upcoming Events</h2>
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{event.title}</h3>
                      <p className="text-gray-300 mt-1">{event.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                        <span className="flex items-center">
                          <CalendarIcon className="w-4 h-4 mr-1" />
                          {event.date} at {event.time}
                        </span>
                        <span className="flex items-center">
                          <MapPinIcon className="w-4 h-4 mr-1" />
                          {event.location}
                        </span>
                        <span>{event.attendees} attendees</span>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-farmer-500 hover:bg-farmer-600 text-white rounded-lg font-medium transition-colors duration-200">
                      Join
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Farm Detail Modal */}
      {selectedFarm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">{selectedFarm.name}</h2>
                <button
                  onClick={() => setSelectedFarm(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-white mb-2">Owner Information</h3>
                  <p className="text-gray-300">{selectedFarm.owner}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                    <span className="flex items-center">
                      <PhoneIcon className="w-4 h-4 mr-1" />
                      {selectedFarm.contact}
                    </span>
                    <span className="flex items-center">
                      <EnvelopeIcon className="w-4 h-4 mr-1" />
                      {selectedFarm.email}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">Farm Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Type:</span>
                      <span className="text-white ml-2">{selectedFarm.type}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Size:</span>
                      <span className="text-white ml-2">{selectedFarm.size}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Livestock:</span>
                      <span className="text-white ml-2">{selectedFarm.livestock} animals</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Rating:</span>
                      <span className="text-white ml-2 flex items-center">
                        <StarIcon className="w-4 h-4 text-yellow-500 mr-1" />
                        {selectedFarm.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedFarm.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-farmer-500/20 text-farmer-400 text-sm rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">Description</h3>
                  <p className="text-gray-300">{selectedFarm.description}</p>
                </div>

                <div className="flex space-x-3 pt-4 border-t border-gray-700">
                  <button
                    onClick={() => handleConnect(selectedFarm.id)}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                      selectedFarm.isConnected
                        ? 'bg-gray-600 text-gray-300'
                        : 'bg-farmer-500 hover:bg-farmer-600 text-white'
                    }`}
                  >
                    {selectedFarm.isConnected ? 'Connected' : 'Connect'}
                  </button>
                  <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FarmerNetwork
