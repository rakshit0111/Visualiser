import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Visualiser from './pages/Visualiser';
import Pathtracker from './pages/Pathtracker';
import Solver from './pages/Solver';
import Navbar from './Navbar';
import Home from './pages/Home';
import Footer from './Footer';

function App() {
  return (
    <Router>
    <Navbar/>
    
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/sortingvisualiser' element={<Visualiser />} />
        <Route path='/pathtracking' element={<Pathtracker />} />
        <Route path='/sudokusolver' element={<Solver />} />
      </Routes>
    <Footer/>
  </Router>
  );
}

export default App;
