import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import DetailPage from './pages/DetailPage';
import Update from './pages/Update';
import { MovieContextProvider } from './context/MovieContext';

function App() {
  return (
    <MovieContextProvider>
      <div className='container'>
        <Router>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/movies/:id' element={<DetailPage />} />
            <Route exact path='/movies/:id/update' element={<Update />} />
          </Routes>
        </Router>
      </div>
    </MovieContextProvider>
    
  );
}

export default App;
