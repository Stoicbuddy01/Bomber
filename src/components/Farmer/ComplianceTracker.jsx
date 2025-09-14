import React, { useState, useEffect } from 'react'
import { 
  ClipboardDocumentListIcon, 
  DocumentArrowUpIcon,
  CalendarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  DocumentTextIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ArrowUpTrayIcon
} from '@heroicons/react/24/outline'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

const ComplianceTracker = () => {
  const [activeTab, setActiveTab] = useState('documents')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState(null)
  const [newDocument, setNewDocument] = useState({
    type: '',
    name: '',
    description: '',
    expirationDate: null,
    file: null
  })

  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Health Certificate - Poultry Batch A',
      type: 'Health Certificate',
      status: 'approved',
      uploadDate: '2024-01-15',
      expirationDate: '2024-04-15',
      daysLeft: 89,
      file: 'health_cert_poultry_a.pdf',
      description: 'Health certificate for poultry batch A from local veterinary office',
      approvedBy: 'Dr. Smith',
      approvedDate: '2024-01-16'
    },
    {
      id: 2,
      name: 'Biosecurity Audit Report',
      type: 'Biosecurity Audit',
      status: 'pending',
      uploadDate: '2024-01-20',
      expirationDate: '2024-02-20',
      daysLeft: 30,
      file: 'biosecurity_audit_2024.pdf',
      description: 'Annual biosecurity audit report submitted for review',
      approvedBy: null,
      approvedDate: null
    },
    {
      id: 3,
      name: 'Vaccination Record - Swine',
      type: 'Vaccination Record',
      status: 'expired',
      uploadDate: '2023-12-01',
      expirationDate: '2024-01-01',
      daysLeft: -15,
      file: 'vaccination_swine_dec2023.pdf',
      description: 'Vaccination records for swine herd',
      approvedBy: 'Dr. Johnson',
      approvedDate: '2023-12-02'
    },
    {
      id: 4,
      name: 'Feed Safety Certificate',
      type: 'Feed Safety',
      status: 'rejected',
      uploadDate: '2024-01-10',
      expirationDate: '2024-07-10',
      daysLeft: 180,
      file: 'feed_safety_cert.pdf',
      description: 'Feed safety certificate from supplier',
      approvedBy: null,
      approvedDate: null,
      rejectionReason: 'Incomplete documentation - missing supplier details'
    }
  ])

  const [complianceStats, setComplianceStats] = useState({
    totalDocuments: 4,
    approved: 1,
    pending: 1,
    expired: 1,
    rejected: 1,
    complianceScore: 75
  })

  const [upcomingDeadlines, setUpcomingDeadlines] = useState([
    {
      id: 1,
      document: 'Biosecurity Audit Report',
      dueDate: '2024-02-20',
      daysLeft: 30,
      priority: 'high'
    },
    {
      id: 2,
      document: 'Health Certificate Renewal',
      dueDate: '2024-04-15',
      daysLeft: 89,
      priority: 'medium'
    },
    {
      id: 3,
      document: 'Feed Safety Certificate',
      dueDate: '2024-07-10',
      daysLeft: 180,
      priority: 'low'
    }
  ])

  const documentTypes = [
    'Health Certificate',
    'Biosecurity Audit',
    'Vaccination Record',
    'Feed Safety',
    'Transport Permit',
    'Export Certificate',
    'Insurance Document',
    'Other'
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-green-400 bg-green-500/20'
      case 'pending': return 'text-yellow-400 bg-yellow-500/20'
      case 'expired': return 'text-red-400 bg-red-500/20'
      case 'rejected': return 'text-red-400 bg-red-500/20'
      default: return 'text-gray-400 bg-gray-500/20'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return CheckCircleIcon
      case 'pending': return ClockIcon
      case 'expired': return ExclamationTriangleIcon
      case 'rejected': return XCircleIcon
      default: return DocumentTextIcon
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-400'
      case 'medium': return 'text-yellow-400'
      case 'low': return 'text-green-400'
      default: return 'text-gray-400'
    }
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setNewDocument({ ...newDocument, file })
    }
  }

  const handleSubmitDocument = () => {
    if (newDocument.type && newDocument.name && newDocument.file) {
      const document = {
        id: documents.length + 1,
        name: newDocument.name,
        type: newDocument.type,
        status: 'pending',
        uploadDate: new Date().toISOString().split('T')[0],
        expirationDate: newDocument.expirationDate?.toISOString().split('T')[0] || null,
        daysLeft: newDocument.expirationDate ? 
          Math.ceil((newDocument.expirationDate - new Date()) / (1000 * 60 * 60 * 24)) : null,
        file: newDocument.file.name,
        description: newDocument.description,
        approvedBy: null,
        approvedDate: null
      }
      setDocuments([...documents, document])
      setNewDocument({
        type: '',
        name: '',
        description: '',
        expirationDate: null,
        file: null
      })
      setShowUploadModal(false)
    }
  }

  const tabs = [
    { id: 'documents', label: 'My Documents', icon: DocumentTextIcon },
    { id: 'calendar', label: 'Compliance Calendar', icon: CalendarIcon },
    { id: 'templates', label: 'Templates', icon: ClipboardDocumentListIcon }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Compliance Tracker</h1>
          <p className="text-gray-400">Manage your farm compliance documents and deadlines</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowUploadModal(true)}
            className="btn-farmer"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Upload Document
          </button>
          <button
            onClick={() => window.history.back()}
            className="flex items-center px-4 py-2 text-gray-400 hover:text-white transition-colors duration-200"
          >
            <ArrowUpTrayIcon className="w-5 h-5 mr-2 rotate-90" />
            Back
          </button>
        </div>
      </div>

      {/* Compliance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-white">{complianceStats.totalDocuments}</div>
          <div className="text-sm text-gray-400">Total Documents</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-400">{complianceStats.approved}</div>
          <div className="text-sm text-gray-400">Approved</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-yellow-400">{complianceStats.pending}</div>
          <div className="text-sm text-gray-400">Pending</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-farmer-400">{complianceStats.complianceScore}%</div>
          <div className="text-sm text-gray-400">Compliance Score</div>
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

      {/* Documents Tab */}
      {activeTab === 'documents' && (
        <div className="space-y-6">
          {/* Documents List */}
          <div className="card">
            <h2 className="text-xl font-semibold text-white mb-4">Document Library</h2>
            <div className="space-y-4">
              {documents.map((doc) => {
                const StatusIcon = getStatusIcon(doc.status)
                return (
                  <div key={doc.id} className="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <StatusIcon className="w-5 h-5 text-gray-400" />
                          <h3 className="font-semibold text-white">{doc.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                            {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-300 mb-2">{doc.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span>Type: {doc.type}</span>
                          <span>Uploaded: {doc.uploadDate}</span>
                          {doc.expirationDate && (
                            <span className={doc.daysLeft < 0 ? 'text-red-400' : doc.daysLeft < 30 ? 'text-yellow-400' : 'text-gray-400'}>
                              {doc.daysLeft < 0 ? `Expired ${Math.abs(doc.daysLeft)} days ago` : 
                               doc.daysLeft === 0 ? 'Expires today' : 
                               `Expires in ${doc.daysLeft} days`}
                            </span>
                          )}
                        </div>
                        {doc.approvedBy && (
                          <div className="text-sm text-gray-400 mt-1">
                            Approved by {doc.approvedBy} on {doc.approvedDate}
                          </div>
                        )}
                        {doc.rejectionReason && (
                          <div className="text-sm text-red-400 mt-1">
                            Rejection reason: {doc.rejectionReason}
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-400 hover:text-white transition-colors duration-200">
                          <EyeIcon className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-white transition-colors duration-200">
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-400 hover:text-red-300 transition-colors duration-200">
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Calendar Tab */}
      {activeTab === 'calendar' && (
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-semibold text-white mb-4">Upcoming Deadlines</h2>
            <div className="space-y-4">
              {upcomingDeadlines.map((deadline) => (
                <div key={deadline.id} className="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-white">{deadline.document}</h3>
                      <p className="text-sm text-gray-400">Due: {deadline.dueDate}</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${getPriorityColor(deadline.priority)}`}>
                        {deadline.daysLeft} days
                      </div>
                      <div className="text-sm text-gray-400 capitalize">{deadline.priority} priority</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-semibold text-white mb-4">Document Templates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {documentTypes.map((type) => (
                <div key={type} className="p-4 bg-gray-700/50 rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors duration-200">
                  <div className="flex items-center space-x-3">
                    <DocumentTextIcon className="w-8 h-8 text-farmer-500" />
                    <div>
                      <h3 className="font-semibold text-white">{type}</h3>
                      <p className="text-sm text-gray-400">Download template</p>
                    </div>
                  </div>
                  <button className="w-full mt-3 py-2 bg-farmer-500 hover:bg-farmer-600 text-white rounded-lg font-medium transition-colors duration-200">
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg max-w-2xl w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Upload Document</h2>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Document Type
                  </label>
                  <select
                    value={newDocument.type}
                    onChange={(e) => setNewDocument({ ...newDocument, type: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-farmer-500"
                  >
                    <option value="">Select document type</option>
                    {documentTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Document Name
                  </label>
                  <input
                    type="text"
                    value={newDocument.name}
                    onChange={(e) => setNewDocument({ ...newDocument, name: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-farmer-500"
                    placeholder="Enter document name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newDocument.description}
                    onChange={(e) => setNewDocument({ ...newDocument, description: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-farmer-500"
                    rows="3"
                    placeholder="Enter document description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Expiration Date
                  </label>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      value={newDocument.expirationDate}
                      onChange={(date) => setNewDocument({ ...newDocument, expirationDate: date })}
                      className="w-full"
                      slotProps={{
                        textField: {
                          className: "w-full",
                          sx: {
                            '& .MuiOutlinedInput-root': {
                              backgroundColor: '#374151',
                              color: 'white',
                              '& fieldset': {
                                borderColor: '#4B5563',
                              },
                              '&:hover fieldset': {
                                borderColor: '#6B7280',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#388e3c',
                              },
                            },
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Upload File
                  </label>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                    <DocumentArrowUpIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer text-farmer-400 hover:text-farmer-300 font-medium"
                    >
                      Click to upload file
                    </label>
                    <p className="text-sm text-gray-400 mt-2">
                      {newDocument.file ? newDocument.file.name : 'No file selected'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={handleSubmitDocument}
                  className="flex-1 bg-farmer-500 hover:bg-farmer-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
                >
                  Upload Document
                </button>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ComplianceTracker
