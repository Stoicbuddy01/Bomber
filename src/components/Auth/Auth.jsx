import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import api, { setAuthToken } from '../../api'

const Auth = ({ onBackToLanding }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState('farmer')
  const [isRegistering, setIsRegistering] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  // Registration fields
  const [fullName, setFullName] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [ministryId, setMinistryId] = useState('')
  const [designation, setDesignation] = useState('')
  const [jurisdictionArea, setJurisdictionArea] = useState('')
  const [veterinaryLicenseNumber, setVeterinaryLicenseNumber] = useState('')
  const [specialization, setSpecialization] = useState('')
  const [practiceArea, setPracticeArea] = useState('')
  const [farmName, setFarmName] = useState('')
  const [farmSize, setFarmSize] = useState('')
  const [livestockType, setLivestockType] = useState('')
  const [location, setLocation] = useState('')

  const { t } = useTranslation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Mock authentication - no backend required
      if (isRegistering) {
        // Validate required fields
        if (!email || !password || !fullName || !mobileNumber) {
          throw new Error('Please fill in all required fields')
        }

        // Add conditional field validation
        if (userType === 'admin' && (!ministryId || !designation || !jurisdictionArea)) {
          throw new Error('Please fill in all admin fields')
        } else if (userType === 'vet' && (!veterinaryLicenseNumber || !specialization || !practiceArea)) {
          throw new Error('Please fill in all veterinarian fields')
        } else if (userType === 'farmer' && (!farmName || !farmSize || !livestockType || !location)) {
          throw new Error('Please fill in all farmer fields')
        }

        // Mock successful registration
        const mockUser = {
          id: Date.now().toString(),
          email,
          userType,
          fullName,
          mobileNumber,
          ...(userType === 'admin' && { ministryId, designation, jurisdictionArea }),
          ...(userType === 'vet' && { veterinaryLicenseNumber, specialization, practiceArea }),
          ...(userType === 'farmer' && { farmName, farmSize, livestockType, location }),
        }

        localStorage.setItem('user', JSON.stringify(mockUser))
        localStorage.setItem('token', 'mock-token-' + Date.now())
        
        // Reload to trigger dashboard
        window.location.reload()
      } else {
        // Mock login - accept any email/password for demo
        if (!email || !password) {
          throw new Error('Please enter email and password')
        }

        // Mock successful login
        const mockUser = {
          id: '1',
          email,
          userType: 'farmer', // Default to farmer for demo
          fullName: 'Demo User',
          mobileNumber: '1234567890',
        }

        localStorage.setItem('user', JSON.stringify(mockUser))
        localStorage.setItem('token', 'mock-token-' + Date.now())
        
        // Reload to trigger dashboard
        window.location.reload()
      }
    } catch (error) {
      console.error('Auth error:', error)
      setError(error.message || 'An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getRoleColor = () => {
    switch (userType) {
      case 'admin': return 'admin'
      case 'vet': return 'vet'
      case 'farmer': return 'farmer'
      default: return 'primary'
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Back Button */}
        {onBackToLanding && (
          <div className="flex justify-start">
            <button
              onClick={onBackToLanding}
              className="flex items-center text-gray-400 hover:text-white transition-colors duration-200"
            >
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </button>
          </div>
        )}
        {/* Logo and Title */}
        <div className="text-center">
          <div className={`mx-auto h-16 w-16 rounded-full bg-${getRoleColor()}-500 flex items-center justify-center`}>
            <span className="text-white font-bold text-2xl">P3</span>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-white">
            {isRegistering ? 'Create your account' : 'Sign in to your account'}
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Pig & Poultry Protection Platform
          </p>
        </div>

        {/* User Type Selection */}
        {isRegistering && (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-300">
              Select your role
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'admin', label: 'Ministry Admin', color: 'admin' },
                { value: 'vet', label: 'Veterinarian', color: 'vet' },
                { value: 'farmer', label: 'Farmer', color: 'farmer' },
              ].map((role) => (
                <button
                  key={role.value}
                  type="button"
                  onClick={() => setUserType(role.value)}
                  className={`
                    p-3 rounded-lg border-2 transition-colors duration-200
                    ${userType === role.value 
                      ? `border-${role.color}-500 bg-${role.color}-500/20` 
                      : 'border-gray-600 hover:border-gray-500'
                    }
                  `}
                >
                  <div className={`w-8 h-8 rounded-full bg-${role.color}-500 mx-auto mb-2`}></div>
                  <span className="text-xs text-gray-300">{role.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field mt-1"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field mt-1"
                placeholder="Enter your password"
              />
            </div>

            {/* Registration Fields */}
            {isRegistering && (
              <>
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="input-field mt-1"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-300">
                    Mobile Number
                  </label>
                  <input
                    id="mobileNumber"
                    name="mobileNumber"
                    type="tel"
                    required
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="input-field mt-1"
                    placeholder="Enter your mobile number"
                  />
                </div>

                {/* Admin Fields */}
                {userType === 'admin' && (
                  <>
                    <div>
                      <label htmlFor="ministryId" className="block text-sm font-medium text-gray-300">
                        Ministry ID
                      </label>
                      <input
                        id="ministryId"
                        name="ministryId"
                        type="text"
                        required
                        value={ministryId}
                        onChange={(e) => setMinistryId(e.target.value)}
                        className="input-field mt-1"
                        placeholder="Enter your ministry ID"
                      />
                    </div>
                    <div>
                      <label htmlFor="designation" className="block text-sm font-medium text-gray-300">
                        Designation
                      </label>
                      <input
                        id="designation"
                        name="designation"
                        type="text"
                        required
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        className="input-field mt-1"
                        placeholder="Enter your designation"
                      />
                    </div>
                    <div>
                      <label htmlFor="jurisdictionArea" className="block text-sm font-medium text-gray-300">
                        Jurisdiction Area
                      </label>
                      <input
                        id="jurisdictionArea"
                        name="jurisdictionArea"
                        type="text"
                        required
                        value={jurisdictionArea}
                        onChange={(e) => setJurisdictionArea(e.target.value)}
                        className="input-field mt-1"
                        placeholder="Enter your jurisdiction area"
                      />
                    </div>
                  </>
                )}

                {/* Vet Fields */}
                {userType === 'vet' && (
                  <>
                    <div>
                      <label htmlFor="veterinaryLicenseNumber" className="block text-sm font-medium text-gray-300">
                        Veterinary License Number
                      </label>
                      <input
                        id="veterinaryLicenseNumber"
                        name="veterinaryLicenseNumber"
                        type="text"
                        required
                        value={veterinaryLicenseNumber}
                        onChange={(e) => setVeterinaryLicenseNumber(e.target.value)}
                        className="input-field mt-1"
                        placeholder="Enter your license number"
                      />
                    </div>
                    <div>
                      <label htmlFor="specialization" className="block text-sm font-medium text-gray-300">
                        Specialization
                      </label>
                      <input
                        id="specialization"
                        name="specialization"
                        type="text"
                        required
                        value={specialization}
                        onChange={(e) => setSpecialization(e.target.value)}
                        className="input-field mt-1"
                        placeholder="Enter your specialization"
                      />
                    </div>
                    <div>
                      <label htmlFor="practiceArea" className="block text-sm font-medium text-gray-300">
                        Practice Area
                      </label>
                      <input
                        id="practiceArea"
                        name="practiceArea"
                        type="text"
                        required
                        value={practiceArea}
                        onChange={(e) => setPracticeArea(e.target.value)}
                        className="input-field mt-1"
                        placeholder="Enter your practice area"
                      />
                    </div>
                  </>
                )}

                {/* Farmer Fields */}
                {userType === 'farmer' && (
                  <>
                    <div>
                      <label htmlFor="farmName" className="block text-sm font-medium text-gray-300">
                        Farm Name
                      </label>
                      <input
                        id="farmName"
                        name="farmName"
                        type="text"
                        required
                        value={farmName}
                        onChange={(e) => setFarmName(e.target.value)}
                        className="input-field mt-1"
                        placeholder="Enter your farm name"
                      />
                    </div>
                    <div>
                      <label htmlFor="farmSize" className="block text-sm font-medium text-gray-300">
                        Farm Size (acres)
                      </label>
                      <input
                        id="farmSize"
                        name="farmSize"
                        type="number"
                        required
                        value={farmSize}
                        onChange={(e) => setFarmSize(e.target.value)}
                        className="input-field mt-1"
                        placeholder="Enter farm size in acres"
                      />
                    </div>
                    <div>
                      <label htmlFor="livestockType" className="block text-sm font-medium text-gray-300">
                        Livestock Type
                      </label>
                      <select
                        id="livestockType"
                        name="livestockType"
                        required
                        value={livestockType}
                        onChange={(e) => setLivestockType(e.target.value)}
                        className="input-field mt-1"
                      >
                        <option value="">Select livestock type</option>
                        <option value="pig">Pig</option>
                        <option value="poultry">Poultry</option>
                        <option value="both">Both</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-300">
                        Location
                      </label>
                      <input
                        id="location"
                        name="location"
                        type="text"
                        required
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="input-field mt-1"
                        placeholder="Enter your location"
                      />
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`
                group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white
                ${loading 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : `bg-${getRoleColor()}-500 hover:bg-${getRoleColor()}-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${getRoleColor()}-500`
                }
                transition-colors duration-200
              `}
            >
              {loading ? 'Processing...' : (isRegistering ? 'Create Account' : 'Sign In')}
            </button>
          </div>

          {/* Toggle Auth Mode */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsRegistering(!isRegistering)
                setError('')
              }}
              className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
            >
              {isRegistering 
                ? 'Already have an account? Sign in' 
                : "Don't have an account? Sign up"
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Auth


