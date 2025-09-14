import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { 
  ShieldCheckIcon, 
  UserGroupIcon, 
  ChartBarIcon, 
  CameraIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  GlobeAltIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon
} from '@heroicons/react/24/outline'

const LandingPage = ({ onLoginClick }) => {
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const features = [
    {
      icon: ShieldCheckIcon,
      title: 'Biosecurity Management',
      description: 'Comprehensive biosecurity protocols and compliance tracking for livestock protection.'
    },
    {
      icon: CameraIcon,
      title: 'AI Disease Detection',
      description: 'Advanced image classification and ML models for early disease identification.'
    },
    {
      icon: ChartBarIcon,
      title: 'Real-time Analytics',
      description: 'Live dashboards with key metrics, trends, and performance indicators.'
    },
    {
      icon: UserGroupIcon,
      title: 'Multi-role Platform',
      description: 'Tailored interfaces for government officials, veterinarians, and farmers.'
    },
    {
      icon: DocumentTextIcon,
      title: 'Compliance Tracking',
      description: 'Automated document verification and regulatory compliance management.'
    },
    {
      icon: AcademicCapIcon,
      title: 'Training Modules',
      description: 'Interactive learning content and certification programs for all users.'
    }
  ]

  const stats = [
    { number: '10,000+', label: 'Farms Protected' },
    { number: '500+', label: 'Veterinarians' },
    { number: '50+', label: 'Disease Types Detected' },
    { number: '99.9%', label: 'Uptime' }
  ]

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <nav className="bg-gray-800/90 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="h-10 w-10 bg-primary-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">P3</span>
                </div>
                <div className="ml-3">
                  <h1 className="text-xl font-bold text-white">Pig & Poultry Protection</h1>
                  <p className="text-xs text-gray-400">Biosecurity Platform</p>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#features" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200">
                  Features
                </a>
                <a href="#about" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200">
                  About
                </a>
                <a href="#contact" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200">
                  Contact
                </a>
                <a href="#pricing" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200">
                  Pricing
                </a>
              </div>
            </div>

            {/* Login Button */}
            <div className="flex items-center space-x-4">
              <button
                onClick={onLoginClick}
                className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Sign In
              </button>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800 rounded-lg mt-2">
                <a href="#features" className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium">
                  Features
                </a>
                <a href="#about" className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium">
                  About
                </a>
                <a href="#contact" className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium">
                  Contact
                </a>
                <a href="#pricing" className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium">
                  Pricing
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Protect Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">
                {" "}Livestock
              </span>
              <br />
              with AI-Powered
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-vet-400 to-farmer-400">
                {" "}Biosecurity
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              The comprehensive platform for government officials, veterinarians, and farmers to manage biosecurity, detect diseases early, and ensure livestock health through advanced technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onLoginClick}
                className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Get Started Free
              </button>
              <button className="border border-gray-600 hover:border-gray-500 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200">
                Watch Demo
              </button>
            </div>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-transparent to-secondary-900/20"></div>
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-secondary-500/10 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Powerful Features for Every Role
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive tools designed specifically for government officials, veterinarians, and farmers to ensure livestock health and biosecurity compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card hover:shadow-xl transition-shadow duration-300">
                <div className={`w-12 h-12 bg-${index % 2 === 0 ? 'primary' : 'secondary'}-500 rounded-lg flex items-center justify-center mb-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role-based Benefits */}
      <section className="py-20 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Tailored Solutions for Every User
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Admin Benefits */}
            <div className="card border-admin-500/20">
              <div className="w-12 h-12 bg-admin-500 rounded-lg flex items-center justify-center mb-4">
                <UserGroupIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Government Officials</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Emergency response management</li>
                <li>• Compliance tracking & verification</li>
                <li>• Real-time outbreak monitoring</li>
                <li>• Policy implementation tools</li>
              </ul>
            </div>

            {/* Vet Benefits */}
            <div className="card border-vet-500/20">
              <div className="w-12 h-12 bg-vet-500 rounded-lg flex items-center justify-center mb-4">
                <ChartBarIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Veterinarians</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• AI-powered disease diagnosis</li>
                <li>• Risk assessment tools</li>
                <li>• Treatment recommendations</li>
                <li>• Case management system</li>
              </ul>
            </div>

            {/* Farmer Benefits */}
            <div className="card border-farmer-500/20">
              <div className="w-12 h-12 bg-farmer-500 rounded-lg flex items-center justify-center mb-4">
                <CameraIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Farmers</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Easy disease detection</li>
                <li>• Compliance tracking</li>
                <li>• Training modules</li>
                <li>• Community network</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Protect Your Livestock?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of users already using P3 to ensure biosecurity and livestock health.
          </p>
          <button
            onClick={onLoginClick}
            className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Start Your Free Trial
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 bg-primary-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">P3</span>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-white">P3 Platform</h3>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Advanced biosecurity management for livestock protection.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center">
                  <EnvelopeIcon className="h-4 w-4 mr-2" />
                  support@p3platform.com
                </li>
                <li className="flex items-center">
                  <PhoneIcon className="h-4 w-4 mr-2" />
                  +1 (555) 123-4567
                </li>
                <li className="flex items-center">
                  <MapPinIcon className="h-4 w-4 mr-2" />
                  New Delhi, India
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 P3 Platform. All rights reserved. | Privacy Policy | Terms of Service
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
