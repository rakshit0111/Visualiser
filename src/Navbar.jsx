import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-gray-900 text-white p-4 flex justify-between items-center w-full">
            <ul className="flex space-x-4 md:space-x-8">
                <li>
                    <Link to="/" className="hover:text-blue-400 transition">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/sortingvisualiser" className="hover:text-blue-400 transition">
                        Visualiser
                    </Link>
                </li>
                <li>
                    <Link to="/pathtracking" className="hover:text-blue-400 transition">
                        Path Tracker
                    </Link>
                </li>
                <li>
                    <Link to="/sudokusolver" className="hover:text-blue-400 transition">
                        Sudoku Solver
                    </Link>
                </li>
            </ul>
            {/* Mobile Menu Button */}
        </nav>
    );
};

export default Navbar;
