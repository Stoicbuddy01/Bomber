import React, { useState } from 'react'
import { 
  AcademicCapIcon, 
  PlayIcon,
  ClockIcon,
  CheckCircleIcon,
  StarIcon,
  BookOpenIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  DownloadIcon,
  BookmarkIcon,
  ArrowRightIcon,
  ArrowUpTrayIcon
} from '@heroicons/react/24/outline'

const TrainingModules = () => {
  const [activeTab, setActiveTab] = useState('courses')
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [bookmarkedCourses, setBookmarkedCourses] = useState([1, 3, 5])

  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Basic Biosecurity Practices',
      description: 'Learn fundamental biosecurity measures to protect your livestock from diseases.',
      category: 'Biosecurity',
      duration: '2 hours',
      difficulty: 'Beginner',
      rating: 4.8,
      students: 1250,
      instructor: 'Dr. Sarah Johnson',
      thumbnail: '/api/placeholder/300/200',
      modules: [
        {
          id: 1,
          title: 'Introduction to Biosecurity',
          type: 'video',
          duration: '15 min',
          completed: true
        },
        {
          id: 2,
          title: 'Farm Entry Protocols',
          type: 'video',
          duration: '20 min',
          completed: true
        },
        {
          id: 3,
          title: 'Equipment Sanitization',
          type: 'video',
          duration: '25 min',
          completed: false
        },
        {
          id: 4,
          title: 'Biosecurity Checklist',
          type: 'document',
          duration: '10 min',
          completed: false
        }
      ],
      progress: 50,
      isBookmarked: true,
      certificate: true
    },
    {
      id: 2,
      title: 'Disease Identification and Prevention',
      description: 'Comprehensive guide to identifying common livestock diseases and prevention strategies.',
      category: 'Disease Management',
      duration: '3 hours',
      difficulty: 'Intermediate',
      rating: 4.9,
      students: 980,
      instructor: 'Dr. Michael Chen',
      thumbnail: '/api/placeholder/300/200',
      modules: [
        {
          id: 1,
          title: 'Common Poultry Diseases',
          type: 'video',
          duration: '30 min',
          completed: false
        },
        {
          id: 2,
          title: 'Swine Disease Recognition',
          type: 'video',
          duration: '35 min',
          completed: false
        },
        {
          id: 3,
          title: 'Early Warning Signs',
          type: 'video',
          duration: '25 min',
          completed: false
        }
      ],
      progress: 0,
      isBookmarked: false,
      certificate: true
    },
    {
      id: 3,
      title: 'Emergency Response Procedures',
      description: 'Learn how to handle disease outbreaks and emergency situations on your farm.',
      category: 'Emergency Response',
      duration: '1.5 hours',
      difficulty: 'Advanced',
      rating: 4.7,
      students: 650,
      instructor: 'Dr. Emily Rodriguez',
      thumbnail: '/api/placeholder/300/200',
      modules: [
        {
          id: 1,
          title: 'Outbreak Detection',
          type: 'video',
          duration: '20 min',
          completed: true
        },
        {
          id: 2,
          title: 'Quarantine Procedures',
          type: 'video',
          duration: '25 min',
          completed: true
        },
        {
          id: 3,
          title: 'Emergency Contacts',
          type: 'document',
          duration: '5 min',
          completed: true
        }
      ],
      progress: 100,
      isBookmarked: true,
      certificate: true
    },
    {
      id: 4,
      title: 'Record Keeping Best Practices',
      description: 'Master the art of maintaining accurate farm records for compliance and management.',
      category: 'Record Keeping',
      duration: '1 hour',
      difficulty: 'Beginner',
      rating: 4.6,
      students: 890,
      instructor: 'John Smith',
      thumbnail: '/api/placeholder/300/200',
      modules: [
        {
          id: 1,
          title: 'Digital Record Systems',
          type: 'video',
          duration: '20 min',
          completed: false
        },
        {
          id: 2,
          title: 'Compliance Documentation',
          type: 'document',
          duration: '15 min',
          completed: false
        }
      ],
      progress: 0,
      isBookmarked: false,
      certificate: false
    },
    {
      id: 5,
      title: 'Feed Management and Nutrition',
      description: 'Optimize your livestock nutrition and feed management for better health and productivity.',
      category: 'Nutrition',
      duration: '2.5 hours',
      difficulty: 'Intermediate',
      rating: 4.8,
      students: 720,
      instructor: 'Dr. Lisa Wang',
      thumbnail: '/api/placeholder/300/200',
      modules: [
        {
          id: 1,
          title: 'Nutritional Requirements',
          type: 'video',
          duration: '30 min',
          completed: false
        },
        {
          id: 2,
          title: 'Feed Quality Assessment',
          type: 'video',
          duration: '25 min',
          completed: false
        }
      ],
      progress: 0,
      isBookmarked: true,
      certificate: true
    }
  ])

  const categories = ['all', 'Biosecurity', 'Disease Management', 'Emergency Response', 'Record Keeping', 'Nutrition']

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || course.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const handleBookmark = (courseId) => {
    setBookmarkedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    )
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-500/20'
      case 'Intermediate': return 'text-yellow-400 bg-yellow-500/20'
      case 'Advanced': return 'text-red-400 bg-red-500/20'
      default: return 'text-gray-400 bg-gray-500/20'
    }
  }

  const getModuleIcon = (type) => {
    switch (type) {
      case 'video': return VideoCameraIcon
      case 'document': return DocumentTextIcon
      case 'quiz': return BookOpenIcon
      default: return BookOpenIcon
    }
  }

  const tabs = [
    { id: 'courses', label: 'All Courses', icon: AcademicCapIcon },
    { id: 'bookmarks', label: 'Bookmarked', icon: BookmarkIcon },
    { id: 'certificates', label: 'Certificates', icon: CheckCircleIcon }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Training Modules</h1>
          <p className="text-gray-400">Enhance your farming knowledge with expert-led courses</p>
        </div>
        <button
          onClick={() => window.history.back()}
          className="flex items-center px-4 py-2 text-gray-400 hover:text-white transition-colors duration-200"
        >
          <ArrowUpTrayIcon className="w-5 h-5 mr-2 rotate-90" />
          Back to Dashboard
        </button>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-farmer-500"
            />
            <BookOpenIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-farmer-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
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

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="card hover:shadow-xl transition-shadow duration-300">
            {/* Course Thumbnail */}
            <div className="relative mb-4">
              <div className="w-full h-48 bg-gray-700 rounded-lg flex items-center justify-center">
                <VideoCameraIcon className="w-12 h-12 text-gray-400" />
              </div>
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={() => handleBookmark(course.id)}
                  className={`p-2 rounded-full transition-colors duration-200 ${
                    bookmarkedCourses.includes(course.id)
                      ? 'bg-farmer-500 text-white'
                      : 'bg-gray-800/50 text-gray-400 hover:text-white'
                  }`}
                >
                  <BookmarkIcon className="w-4 h-4" />
                </button>
                {course.certificate && (
                  <div className="p-2 bg-yellow-500/20 text-yellow-400 rounded-full">
                    <CheckCircleIcon className="w-4 h-4" />
                  </div>
                )}
              </div>
              <div className="absolute bottom-2 left-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty)}`}>
                  {course.difficulty}
                </span>
              </div>
            </div>

            {/* Course Info */}
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">{course.title}</h3>
                <p className="text-sm text-gray-300 line-clamp-2">{course.description}</p>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-400">
                <span className="flex items-center">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  {course.duration}
                </span>
                <span className="flex items-center">
                  <StarIcon className="w-4 h-4 mr-1 text-yellow-500" />
                  {course.rating}
                </span>
                <span>{course.students} students</span>
              </div>

              <div className="text-sm text-gray-400">
                Instructor: {course.instructor}
              </div>

              {/* Progress Bar */}
              {course.progress > 0 && (
                <div>
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-farmer-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-2">
                <button
                  onClick={() => setSelectedCourse(course)}
                  className="flex-1 bg-farmer-500 hover:bg-farmer-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
                >
                  {course.progress > 0 ? 'Continue' : 'Start Course'}
                </button>
                <button className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200">
                  <DownloadIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedCourse.title}</h2>
                  <p className="text-gray-400 mt-1">{selectedCourse.description}</p>
                </div>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Course Info */}
                <div className="lg:col-span-2">
                  <h3 className="text-lg font-semibold text-white mb-4">Course Modules</h3>
                  <div className="space-y-3">
                    {selectedCourse.modules.map((module, index) => {
                      const ModuleIcon = getModuleIcon(module.type)
                      return (
                        <div key={module.id} className="flex items-center p-3 bg-gray-700/50 rounded-lg">
                          <div className="flex items-center space-x-3 flex-1">
                            <ModuleIcon className="w-5 h-5 text-gray-400" />
                            <div>
                              <h4 className="font-medium text-white">{module.title}</h4>
                              <p className="text-sm text-gray-400">{module.duration}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {module.completed && (
                              <CheckCircleIcon className="w-5 h-5 text-green-400" />
                            )}
                            <button className="p-2 bg-farmer-500 hover:bg-farmer-600 text-white rounded-lg transition-colors duration-200">
                              <PlayIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Course Details */}
                <div className="space-y-4">
                  <div className="card">
                    <h3 className="text-lg font-semibold text-white mb-3">Course Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Duration:</span>
                        <span className="text-white">{selectedCourse.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Difficulty:</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(selectedCourse.difficulty)}`}>
                          {selectedCourse.difficulty}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Rating:</span>
                        <span className="text-white flex items-center">
                          <StarIcon className="w-4 h-4 text-yellow-500 mr-1" />
                          {selectedCourse.rating}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Students:</span>
                        <span className="text-white">{selectedCourse.students}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Instructor:</span>
                        <span className="text-white">{selectedCourse.instructor}</span>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <h3 className="text-lg font-semibold text-white mb-3">Progress</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Overall Progress</span>
                        <span className="text-white">{selectedCourse.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-farmer-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${selectedCourse.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-farmer-500 hover:bg-farmer-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200">
                    {selectedCourse.progress > 0 ? 'Continue Learning' : 'Start Course'}
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

export default TrainingModules
