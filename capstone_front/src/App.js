import logo from "./logo.svg";
import "./App.css";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import Register from "./components/Register";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Home from "./components/Home";
import SearchAppBar from "./components/Navbar";
import Profiles from "./components/Profiles";
import About from "./components/About";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Search from "./components/Search";

function App() {
  function toTitleCaseAndRemoveFirstLetter(str) {
    const titleCasedString = str.replace(/\b\w+/g, function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });

    // Remove the first letter (character) from the titleCasedString
    const resultString = titleCasedString.slice(1);

    return resultString;
  }

  const loc = useLocation();
  console.log(loc);
  const { pathname } = loc;

  useEffect(() => {
    document.title =
      pathname === "/"
        ? "Reserva"
        : "Reserva - " + toTitleCaseAndRemoveFirstLetter(pathname);
  }, [pathname]);

  const isNavbarVisible =
    pathname !== "/" && pathname !== "/login" && pathname !== "/register";
  const isAuthenticated = localStorage.getItem("login_token");

  return (
    <>
      <div className="appRoot">
        {isNavbarVisible && <SearchAppBar />}
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={isAuthenticated ? <Home /> : <Navigate to="/" />}
          />
          <Route
            path="/profile"
            element={isAuthenticated ? <Profiles /> : <Navigate to="/" />}
          />
          <Route
            path="/about"
            element={isAuthenticated ? <About /> : <Navigate to="/" />}
          />
          <Route
            path="*"
            element={isAuthenticated ? <Search /> : <Navigate to="/" />}
          />
        </Routes>
        <Toaster
          toastOptions={{
            className: "",
            style: {
              border: "1px solid #713200",
              padding: "10px",
              color: "#713200",
            },
          }}
        />
      </div>
    </>
  );
}

export default App;
