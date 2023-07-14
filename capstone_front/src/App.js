import logo from "./logo.svg";
import "./App.css";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Register from "./components/Register";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Home from "./components/Home";
import SearchAppBar from "./components/Navbar";
import Profiles from "./components/Profiles";
import Hotels from "./components/Hotels";
import About from "./components/About";

function App() {
  return (
    <>
      <Router>
        <div className="appRoot">
          {window.location.pathname === "/" ? (
            ""
          ) : window.location.pathname === "/login" ? (
            ""
          ) : window.location.pathname === "/register" ? (
            ""
          ) : (
            <SearchAppBar />
          )}
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profiles />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
