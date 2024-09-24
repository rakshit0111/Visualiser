import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BarChart2, GitBranch, Grid3X3, ArrowRight, Sun, Moon } from 'lucide-react'

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-b from-gray-900 to-gray-800 text-white' : 'bg-gradient-to-b from-gray-100 to-white text-gray-900'}`}>
      <header className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="container mx-auto px-4 py-6 relative">
          <h1 className="text-4xl font-bold text-center">Algorithm Visualizer</h1>
          <p className={`text-center mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Explore and understand algorithms through interactive visualizations</p>
          <button
            onClick={toggleDarkMode}
            className={`absolute top-6 right-4 p-2 rounded-full ${isDarkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-yellow-400'}`}
            aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            title="Sorting Visualizer"
            description="Watch various sorting algorithms in action and understand how they work."
            icon={<BarChart2 className="w-12 h-12" />}
            gradient={isDarkMode ? "from-purple-600 to-indigo-600" : "from-purple-400 to-indigo-400"}
            link="/sortingvisualiser"
            isDarkMode={isDarkMode}
          />
          <FeatureCard
            title="Path Tracker"
            description="Visualise graphs and find the minimum distance between given source and target nodes."
            icon={<GitBranch className="w-12 h-12" />}
            gradient={isDarkMode ? "from-blue-600 to-cyan-600" : "from-blue-400 to-cyan-400"}
            link="/pathtracking"
            isDarkMode={isDarkMode}
          />
          <FeatureCard
            title="Sudoku Solver"
            description="Witness the power of backtracking algorithms in solving Sudoku puzzles."
            icon={<Grid3X3 className="w-12 h-12" />}
            gradient={isDarkMode ? "from-red-600 to-pink-600" : "from-red-400 to-pink-400"}
            link="/sudokusolver"
            isDarkMode={isDarkMode}
          />
        </div>
      </main>
    </div>
  )
}

function FeatureCard({ title, description, icon, gradient, link, isDarkMode }) {
  return (
    <div className={`bg-gradient-to-br ${gradient} rounded-lg shadow-lg p-6 flex flex-col items-center transition-transform hover:scale-105`}>
      <div className={`w-24 h-24 ${isDarkMode ? 'bg-white bg-opacity-20' : 'bg-gray-900 bg-opacity-20'} rounded-full flex items-center justify-center mb-6`}>
        {icon}
      </div>
      <h2 className="text-2xl font-bold mb-3">{title}</h2>
      <p className={`text-center mb-6 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{description}</p>
      <Link
        to={link}
        className={`${isDarkMode ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'} py-2 px-4 rounded-full font-semibold hover:bg-opacity-90 transition-colors flex items-center`}
      >
        Explore <ArrowRight className="ml-2 w-4 h-4" />
      </Link>
    </div>
  )
}