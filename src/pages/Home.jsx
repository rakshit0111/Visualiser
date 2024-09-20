import { Link } from "react-router-dom";
import { Parallax } from 'react-parallax';

const Home = () => {
    return (
        <div>
            <Parallax
                bgImage="path_to_your_image.jpg"
                bgImageAlt="Description"
                strength={500}
            >
                <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen flex flex-col items-center justify-center">
                    <h1 className="text-4xl font-bold mb-4">Welcome to My App!</h1>
                    <p className="text-lg mb-6">Explore various features including Visualiser, Path Tracker, and Sudoku Solver.</p>

                    <div className="space-x-4">
                        <Link to="/sortingvisualiser" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
                            Go to Visualiser
                        </Link>
                        <Link to="/pathtracking" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition">
                            Go to Path Tracker
                        </Link>
                        <Link to="/sudokusolver" className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition">
                            Go to Sudoku Solver
                        </Link>
                    </div>
                </div>
            </Parallax>

            <div className="mt-8 text-center">
                <h2 className="text-2xl font-semibold">Features</h2>
                <ul className="list-disc list-inside mt-2">
                    <li>🔍 Visualiser: A tool to visualize sorting algorithms.</li>
                    <li>🗺️ Path Tracker: Find optimal paths in various scenarios.</li>
                    <li>🧩 Sudoku Solver: Solve Sudoku puzzles effortlessly.</li>
                </ul>
            </div>

            <div className="mt-8 text-center">
                <h2 className="text-2xl font-semibold">Get Started!</h2>
                <p className="mt-2">Click on the buttons above to begin exploring!</p>
            </div>
        </div>
    );
}

export default Home;
