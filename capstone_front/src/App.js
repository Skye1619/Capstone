import logo from './logo.svg';
import './App.css';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Register from './components/Register';
import Landing from './components/Landing';


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/' element={<Landing/>} />
      </Routes>
    </Router>

    </>
  );
}

export default App;
