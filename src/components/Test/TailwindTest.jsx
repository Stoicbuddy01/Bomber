import React from 'react'

const TailwindTest = () => {
  return (
    <div className="p-8 bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Tailwind CSS Test
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-4">Primary Colors</h3>
            <div className="space-y-2">
              <div className="w-full h-8 bg-primary-500 rounded"></div>
              <div className="w-full h-8 bg-primary-600 rounded"></div>
              <div className="w-full h-8 bg-primary-700 rounded"></div>
            </div>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-4">Role Colors</h3>
            <div className="space-y-2">
              <div className="w-full h-8 bg-admin-500 rounded"></div>
              <div className="w-full h-8 bg-vet-500 rounded"></div>
              <div className="w-full h-8 bg-farmer-500 rounded"></div>
            </div>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-4">Buttons</h3>
            <div className="space-y-2">
              <button className="btn-primary w-full">Primary Button</button>
              <button className="btn-admin w-full">Admin Button</button>
              <button className="btn-vet w-full">Vet Button</button>
              <button className="btn-farmer w-full">Farmer Button</button>
            </div>
          </div>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-4">Responsive Grid Test</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="bg-gray-700 p-4 rounded-lg text-center text-white">
                Item {item}
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-green-400 text-lg">
            ✅ Tailwind CSS is working correctly!
          </p>
        </div>
      </div>
    </div>
  )
}

export default TailwindTest


