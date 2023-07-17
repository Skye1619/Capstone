import logo from "./logo.svg";
import "./App.css";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Register from "./components/Register";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Home from "./components/Home";
import SearchAppBar from "./components/Navbar";
import Profiles from "./components/Profiles";
import About from "./components/About";

function App() {

  const loc = useLocation()
  const {pathname} = loc

  const isNavbarVisible = pathname !== "/" && pathname !== "/login" && pathname !== "/register";
  const isAuthenticated = localStorage.getItem('login_token');

  return (
    <>
        <div className="appRoot">
          {isNavbarVisible && <SearchAppBar />}
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to='/' />} />
            <Route path="/profile" element={isAuthenticated ? <Profiles /> : <Navigate to='/' />} />
            <Route path="/about" element={isAuthenticated ? <About /> : <Navigate to='/' />} />
          </Routes>
        </div>
    </>
  );
}

export default App;
