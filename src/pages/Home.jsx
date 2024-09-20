import React from 'react';
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="bg-gray-900 min-h-screen text-white">
         
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Sorting Visualizer Card */}
                    <div className="bg-gradient-to-br from-purple-900 to-indigo-800 rounded-lg shadow-lg p-6 flex flex-col items-center">
                        <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-green-400 rounded-lg flex items-end justify-center mb-4">
                            <div className="w-4 h-8 bg-green-500 mr-1"></div>
                            <div className="w-4 h-12 bg-green-600 mr-1"></div>
                            <div className="w-4 h-16 bg-green-700 mr-1"></div>
                            <div className="w-4 h-20 bg-green-800"></div>
                        </div>
                        <h2 className="text-2xl font-bold mb-2">SORTING VISUALIZER</h2>
                        <p className="text-center mb-4">Visualize various sorting algorithms .</p>
                        <Link to="/sortingvisualiser" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
                           Click Here
                        </Link>
                    </div>

                    {/* Path Tracker Card */}
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-lg p-6 flex flex-col items-center">
                        <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center mb-4">
                            <svg className="w-16 h-16 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold mb-2">PATH TRACKER</h2>
                        <p className="text-center mb-4">Find optimal paths in various scenarios.</p>
                        <Link to="/pathtracking" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition">
                            Click Here
                        </Link>
                    </div>

                    {/* Sudoku Solver Card */}
                    <div className="bg-gradient-to-br from-red-900 to-pink-800 rounded-lg shadow-lg p-6 flex flex-col items-center">
                        <div className="w-24 h-24 bg-white rounded-lg grid grid-cols-3 gap-1 p-1 mb-4">
                            {[...Array(9)].map((_, i) => (
                                <div key={i} className="bg-gray-200 flex items-center justify-center text-gray-700 font-bold">
                                    {i + 1}
                                </div>
                            ))}
                        </div>
                        <h2 className="text-2xl font-bold mb-2">SUDOKU SOLVER</h2>
                        <p className="text-center mb-4">Solve Sudoku puzzles effortlessly.</p>
                        <Link to="/sudokusolver" className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition">
                            Click Here
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;