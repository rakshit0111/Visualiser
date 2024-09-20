import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>&copy; {currentYear} Your Name. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <a href="https://github.com/rakshit0111" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors duration-300">
              <FaGithub size={24} />
            </a>
            <a href="https://linkedin.com/in/rakshit-singh-372841282" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors duration-300">
              <FaLinkedin size={24} />
            </a>
            <a href="https://twitter.com/Rakshit17220" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors duration-300">
              <FaTwitter size={24} />
            </a>
            <a href="rakshitsingh333@gmail.com" className="hover:text-gray-400 transition-colors duration-300">
              <FaEnvelope size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;