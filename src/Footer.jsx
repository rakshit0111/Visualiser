import React from 'react'
import { Link } from 'react-router-dom'
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react'

const socialLinks = [
  { icon: Github, href: 'https://github.com/rakshit0111', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/rakshit-singh-372841282', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/Rakshit17220', label: 'Twitter' },
  { icon: Mail, href: 'mailto:rakshitsingh333@gmail.com', label: 'Email' }
]

const FooterLink = ({ href, icon: Icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-white transition-colors duration-300"
    aria-label={label}
  >
    <Icon size={20} />
  </a>
)

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">About AlgoViz</h3>
            <p className="text-sm">
              AlgoViz is an interactive platform for visualizing and understanding various algorithms.
              Explore sorting algorithms, pathfinding techniques, and more!
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-white transition-colors duration-300">Home</Link></li>
              <li><Link to="/sortingvisualiser" className="hover:text-white transition-colors duration-300">Sorting Visualizer</Link></li>
              <li><Link to="/pathtracking" className="hover:text-white transition-colors duration-300">Path Tracker</Link></li>
              <li><Link to="/sudokusolver" className="hover:text-white transition-colors duration-300">Sudoku Solver</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Connect</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <FooterLink key={link.label} {...link} />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm">&copy; {currentYear} Rakshit. All rights reserved.</p>
          <p className="text-sm mt-4 sm:mt-0 flex items-center">
            Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> by Rakshit Singh
          </p>
        </div>
      </div>
    </footer>
  )
}