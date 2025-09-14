import api from '../api'

// Auth Services
export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials)
    return response.data
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData)
    return response.data
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me')
    return response.data
  },

  logout: () => {
    localStorage.removeItem('token')
    window.location.reload()
  }
}

// Admin Services
export const adminService = {
  getDashboardData: async () => {
    const response = await api.get('/admin/dashboard')
    return response.data
  },

  getEmergencyData: async () => {
    const response = await api.get('/admin/emergency')
    return response.data
  },

  getComplianceData: async () => {
    const response = await api.get('/admin/compliance')
    return response.data
  },

  createAlert: async (alertData) => {
    const response = await api.post('/admin/alerts', alertData)
    return response.data
  },

  getAlerts: async () => {
    const response = await api.get('/admin/alerts')
    return response.data
  }
}

// Vet Services
export const vetService = {
  getDashboardData: async () => {
    const response = await api.get('/vet/dashboard')
    return response.data
  },

  getAppointments: async () => {
    const response = await api.get('/vet/appointments')
    return response.data
  },

  getRiskAssessments: async () => {
    const response = await api.get('/vet/risk-assessments')
    return response.data
  },

  createRiskAssessment: async (assessmentData) => {
    const response = await api.post('/vet/risk-assessments', assessmentData)
    return response.data
  },

  classifyImage: async (imageData) => {
    const response = await api.post('/vet/image-classifier', imageData)
    return response.data
  },

  getHealthPredictions: async (parameters) => {
    const response = await api.post('/vet/health-predictor', parameters)
    return response.data
  }
}

// Farmer Services
export const farmerService = {
  getDashboardData: async () => {
    const response = await api.get('/farmer/dashboard')
    return response.data
  },

  getFarmProfile: async () => {
    const response = await api.get('/farmer/profile')
    return response.data
  },

  updateFarmProfile: async (profileData) => {
    const response = await api.put('/farmer/profile', profileData)
    return response.data
  },

  getComplianceStatus: async () => {
    const response = await api.get('/farmer/compliance')
    return response.data
  },

  uploadDocument: async (documentData) => {
    const response = await api.post('/farmer/documents', documentData)
    return response.data
  },

  getNetworkConnections: async () => {
    const response = await api.get('/farmer/network')
    return response.data
  },

  classifyDiseaseImage: async (imageData) => {
    const response = await api.post('/farmer/image-classifier', imageData)
    return response.data
  },

  getTrainingModules: async () => {
    const response = await api.get('/farmer/training')
    return response.data
  }
}

// Common Services
export const commonService = {
  uploadFile: async (file, type) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', type)
    
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  },

  getNotifications: async () => {
    const response = await api.get('/notifications')
    return response.data
  },

  markNotificationRead: async (notificationId) => {
    const response = await api.put(`/notifications/${notificationId}/read`)
    return response.data
  }
}

export default {
  authService,
  adminService,
  vetService,
  farmerService,
  commonService
}


