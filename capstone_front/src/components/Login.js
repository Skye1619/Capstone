import { Alert, Button, FormControl, TextField } from "@mui/material";
import React, { useState } from "react";
import "./Logincss.css";
import Logo from "./capstoneLogo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigation = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [submitLoading, setsubmitLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setsubmitLoading(true);

    if (!validateForm()) {
      setsubmitLoading(false);
      return;
    } else {
      console.log("logging in");
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/login",
          formData
        );
        const token = response.data.token;
        localStorage.setItem("login_token", token);
        localStorage.setItem("username", response.data.user.username);
        localStorage.setItem("email", response.data.user.email);
        localStorage.setItem("phonenumber", response.data.user.phonenumber);
        navigation("/home");
      } catch (error) {
        console.log(error);
        let errorMessage = error.response.data.error;
        setError(errorMessage);
      }
      setsubmitLoading(false);
    }
  }

  const buttonClick = async () => {
    
    
  }

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
      <img src={Logo} alt="logo" style={{ marginTop: "50px" }} />
      {error && <Alert severity="error">{error}</Alert>}
      <FormControl className="formControl">
        <TextField
          label="email"
          name="email"
          variant="outlined"
          fullWidth
          required
          onChange={handleChange}
        />
        <TextField
          label="password"
          name="password"
          variant="outlined"
          fullWidth
          required
          onChange={handleChange}
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
    </div>
  );
}

export default Login;
