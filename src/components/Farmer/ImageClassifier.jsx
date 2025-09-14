import React, { useState, useRef } from 'react'
import { 
  CameraIcon, 
  PhotoIcon, 
  ArrowUpTrayIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'

const ImageClassifier = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [classificationResult, setClassificationResult] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [uploadMethod, setUploadMethod] = useState('camera') // 'camera' or 'upload'
  const fileInputRef = useRef(null)

  const handleImageSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target.result)
        setClassificationResult(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAnalyze = async () => {
    if (!selectedImage) return

    setIsAnalyzing(true)
    
    // Simulate API call
    setTimeout(() => {
      const mockResults = [
        {
          disease: 'Avian Influenza',
          confidence: 87,
          severity: 'High',
          description: 'Highly contagious viral disease affecting birds',
          symptoms: ['Respiratory distress', 'Loss of appetite', 'Blue discoloration'],
          immediateActions: [
            'Isolate affected birds immediately',
            'Contact veterinarian urgently',
            'Implement strict biosecurity measures'
          ],
          prevention: [
            'Regular vaccination',
            'Proper sanitation',
            'Limit bird movement'
          ]
        },
        {
          disease: 'Swine Fever',
          confidence: 92,
          severity: 'Critical',
          description: 'Severe viral disease in pigs with high mortality',
          symptoms: ['High fever', 'Skin discoloration', 'Loss of coordination'],
          immediateActions: [
            'Quarantine entire herd',
            'Notify authorities immediately',
            'Stop all animal movement'
          ],
          prevention: [
            'Strict biosecurity protocols',
            'Regular health monitoring',
            'Proper waste management'
          ]
        },
        {
          disease: 'Mastitis',
          confidence: 75,
          severity: 'Medium',
          description: 'Inflammation of mammary gland in dairy animals',
          symptoms: ['Swollen udder', 'Abnormal milk', 'Fever'],
          immediateActions: [
            'Separate affected animal',
            'Apply cold compress',
            'Contact veterinarian'
          ],
          prevention: [
            'Proper milking hygiene',
            'Regular udder health checks',
            'Clean bedding'
          ]
        }
      ]

      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)]
      setClassificationResult(randomResult)
      setIsAnalyzing(false)
    }, 2000)
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'text-red-500'
      case 'High': return 'text-orange-500'
      case 'Medium': return 'text-yellow-500'
      case 'Low': return 'text-green-500'
      default: return 'text-gray-500'
    }
  }

  const getSeverityBg = (severity) => {
    switch (severity) {
      case 'Critical': return 'bg-red-500/20 border-red-500/30'
      case 'High': return 'bg-orange-500/20 border-orange-500/30'
      case 'Medium': return 'bg-yellow-500/20 border-yellow-500/30'
      case 'Low': return 'bg-green-500/20 border-green-500/30'
      default: return 'bg-gray-500/20 border-gray-500/30'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Disease Image Classifier</h1>
          <p className="text-gray-400">Upload or capture images to identify livestock diseases using AI</p>
        </div>
        <button
          onClick={() => window.history.back()}
          className="flex items-center px-4 py-2 text-gray-400 hover:text-white transition-colors duration-200"
        >
          <ArrowUpTrayIcon className="w-5 h-5 mr-2 rotate-90" />
          Back to Dashboard
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Image Upload Section */}
        <div className="card">
          <h2 className="text-xl font-semibold text-white mb-4">Upload Image</h2>
          
          {/* Upload Method Toggle */}
          <div className="flex space-x-2 mb-6">
            <button
              onClick={() => setUploadMethod('camera')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                uploadMethod === 'camera'
                  ? 'bg-farmer-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <CameraIcon className="w-5 h-5 inline mr-2" />
              Camera
            </button>
            <button
              onClick={() => setUploadMethod('upload')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                uploadMethod === 'upload'
                  ? 'bg-farmer-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <PhotoIcon className="w-5 h-5 inline mr-2" />
              Upload File
            </button>
          </div>

          {/* Image Preview */}
          <div className="mb-6">
            {selectedImage ? (
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-full h-64 object-cover rounded-lg border border-gray-600"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors duration-200"
                >
                  ×
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-64 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-500 transition-colors duration-200"
              >
                <PhotoIcon className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-gray-400 text-center">
                  {uploadMethod === 'camera' 
                    ? 'Click to capture or select image' 
                    : 'Click to select image file'
                  }
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Supports JPG, PNG, WebP formats
                </p>
              </div>
            )}
          </div>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
            capture={uploadMethod === 'camera' ? 'environment' : undefined}
          />

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={!selectedImage || isAnalyzing}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors duration-200 ${
              selectedImage && !isAnalyzing
                ? 'bg-farmer-500 hover:bg-farmer-600 text-white'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isAnalyzing ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Analyzing Image...
              </div>
            ) : (
              'Analyze Image'
            )}
          </button>
        </div>

        {/* Results Section */}
        <div className="card">
          <h2 className="text-xl font-semibold text-white mb-4">Analysis Results</h2>
          
          {!classificationResult ? (
            <div className="text-center py-12">
              <InformationCircleIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">Upload an image to get started with disease analysis</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Disease Identification */}
              <div className={`p-4 rounded-lg border ${getSeverityBg(classificationResult.severity)}`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white">{classificationResult.disease}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-medium ${getSeverityColor(classificationResult.severity)}`}>
                      {classificationResult.severity} Risk
                    </span>
                    <span className="text-sm text-gray-400">
                      {classificationResult.confidence}% confidence
                    </span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">{classificationResult.description}</p>
              </div>

              {/* Symptoms */}
              <div>
                <h4 className="text-md font-semibold text-white mb-2">Observed Symptoms:</h4>
                <ul className="space-y-1">
                  {classificationResult.symptoms.map((symptom, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-300">
                      <ExclamationTriangleIcon className="w-4 h-4 text-yellow-500 mr-2" />
                      {symptom}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Immediate Actions */}
              <div>
                <h4 className="text-md font-semibold text-white mb-2">Immediate Actions Required:</h4>
                <ul className="space-y-1">
                  {classificationResult.immediateActions.map((action, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-300">
                      <CheckCircleIcon className="w-4 h-4 text-red-500 mr-2" />
                      {action}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prevention Tips */}
              <div>
                <h4 className="text-md font-semibold text-white mb-2">Prevention Tips:</h4>
                <ul className="space-y-1">
                  {classificationResult.prevention.map((tip, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-300">
                      <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4 border-t border-gray-700">
                <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200">
                  Contact Veterinarian
                </button>
                <button className="flex-1 bg-farmer-500 hover:bg-farmer-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200">
                  Report to Authorities
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Guidelines Section */}
      <div className="card">
        <h2 className="text-xl font-semibold text-white mb-4">Image Capture Guidelines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-2">For Best Results:</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Ensure good lighting and clear visibility</li>
              <li>• Capture affected areas up close</li>
              <li>• Include multiple angles if possible</li>
              <li>• Avoid blurry or dark images</li>
              <li>• Focus on visible symptoms or lesions</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-2">What to Look For:</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Skin discoloration or lesions</li>
              <li>• Abnormal behavior or posture</li>
              <li>• Respiratory symptoms</li>
              <li>• Digestive issues</li>
              <li>• General weakness or lethargy</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageClassifier
