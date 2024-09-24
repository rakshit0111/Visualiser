import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Home, BarChart2, GitBranch, Grid3X3 } from 'lucide-react'

const NavItem = ({ to, icon, children }) => (
  <li>
    <Link
      to={to}
      className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors"
    >
      {icon}
      <span className="ml-2">{children}</span>
    </Link>
  </li>
)

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-white text-xl font-bold">AlgoViz</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <ul className="flex space-x-4">
              <NavItem to="/" icon={<Home className="w-5 h-5" />}>Home</NavItem>
              <NavItem to="/sortingvisualiser" icon={<BarChart2 className="w-5 h-5" />}>Sorting Visualizer</NavItem>
              <NavItem to="/pathtracking" icon={<GitBranch className="w-5 h-5" />}>Path Tracker</NavItem>
              <NavItem to="/sudokusolver" icon={<Grid3X3 className="w-5 h-5" />}>Sudoku Solver</NavItem>
            </ul>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavItem to="/" icon={<Home className="w-5 h-5" />}>Home</NavItem>
          <NavItem to="/sortingvisualiser" icon={<BarChart2 className="w-5 h-5" />}>Sorting Visualizer</NavItem>
          <NavItem to="/pathtracking" icon={<GitBranch className="w-5 h-5" />}>Path Tracker</NavItem>
          <NavItem to="/sudokusolver" icon={<Grid3X3 className="w-5 h-5" />}>Sudoku Solver</NavItem>
        </ul>
      </div>
    </nav>
  )
}