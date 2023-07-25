import {
  Alert,
  Button,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Logincss.css";
import Logo from "./capstoneLogo.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const backendApi = process.env.REACT_APP_BACKEND_API;

  const navigation = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const token = localStorage.getItem("login_token");
  useEffect(() => {
    token ? navigation("/home") : navigation("/login");
  }, []);

  const [error, setError] = useState("");
  const [submitLoading, setsubmitLoading] = useState(false);

  const handleLogin = async (event) => {
    event?.preventDefault();
    setError("");
    setsubmitLoading(true);

    if (!validateForm()) {
      setsubmitLoading(false);
      return;
    } else {
      console.log("logging in");
      try {
        const response = await axios.post(
          `${backendApi}/login`,
          formData,{
            headers : { 'Content-Type': 'application/json','Accept': 'application/json'}
          }
        );
        const token = response.data.token;
        localStorage.setItem("login_token", token);
        /* localStorage.setItem("username", response.data.user.username);
        localStorage.setItem("email", response.data.user.email);
        localStorage.setItem("phonenumber", response.data.user.phonenumber); */
        localStorage.setItem("user", JSON.stringify(response.data.user));
        console.log(response);
        navigation("/home");
      } catch (error) {
        console.log(error);
        /* let errorMessage = error.response.data.error;
        setError(errorMessage); */
      }
      setsubmitLoading(false);
    }
  };

  const buttonClick = async () => {};

  const enterPressed = (event) => {
    console.log(event.key)
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const validateForm = () => {
    if (formData.email === undefined || formData.email === "") {
      setError(`Email is required!`);
      return false;
    } else if (formData.password === undefined || formData.password === "") {
      setError(`password is required!`);
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    // console.log(event.target.name, event.target.value);
    setFormData((prevstate) => ({
      ...prevstate,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="loginRoot">
      <Link to="/">
        <img src={Logo} alt="logo" style={{ marginTop: "50px" }} />
      </Link>
      {error && <Alert severity="error">{error}</Alert>}
      <FormControl className="formControl">
        <TextField
          label="email"
          name="email"
          variant="outlined"
          fullWidth
          required
          onChange={handleChange}
          onKeyUp={enterPressed}
        />
        <TextField
          label="password"
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          required
          onChange={handleChange}
          onKeyUp={enterPressed}
        />
        <Button
          className="loginButton"
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
        >
          Login
        </Button>
        <Button
          className="loginButton"
          variant="contained"
          color="primary"
          fullWidth
          onClick={buttonClick}
        >
          Forgot Password
        </Button>
      </FormControl>
      <Typography variant="p">
        Don't Have an Account?{" "}
        <Link to="/register" style={{ textDecoration: "none", color: "blue" }}>
          Register
        </Link>{" "}
      </Typography>
    </div>
  );
}

export default Login;
