import React from 'react'
import { Link } from 'react-router-dom'
import { BarChart2, GitBranch, Grid3X3, ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <header className="bg-gray-800 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-center">Algorithm Visualizer</h1>
          <p className="text-center mt-2 text-gray-400">Explore and understand algorithms through interactive visualizations</p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            title="Sorting Visualizer"
            description="Watch various sorting algorithms in action and understand how they work."
            icon={<BarChart2 className="w-12 h-12" />}
            gradient="from-purple-600 to-indigo-600"
            link="/sortingvisualizer"
          />
          <FeatureCard
            title="Path Tracker"
            description="Explore pathfinding algorithms and see how they navigate through complex mazes."
            icon={<GitBranch className="w-12 h-12" />}
            gradient="from-blue-600 to-cyan-600"
            link="/pathtracking"
          />
          <FeatureCard
            title="Sudoku Solver"
            description="Witness the power of backtracking algorithms in solving Sudoku puzzles."
            icon={<Grid3X3 className="w-12 h-12" />}
            gradient="from-red-600 to-pink-600"
            link="/sudokusolver"
          />
        </div>
      </main>
    </div>
  )
}

function FeatureCard({ title, description, icon, gradient, link }) {
  return (
    <div className={`bg-gradient-to-br ${gradient} rounded-lg shadow-lg p-6 flex flex-col items-center transition-transform hover:scale-105`}>
      <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-6">
        {icon}
      </div>
      <h2 className="text-2xl font-bold mb-3">{title}</h2>
      <p className="text-center mb-6 text-gray-200">{description}</p>
      <Link
        to={link}
        className="bg-white text-gray-900 py-2 px-4 rounded-full font-semibold hover:bg-opacity-90 transition-colors flex items-center"
      >
        Explore <ArrowRight className="ml-2 w-4 h-4" />
      </Link>
    </div>
  )
}