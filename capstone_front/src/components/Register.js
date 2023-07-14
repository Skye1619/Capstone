import React, { useState } from "react";
import "./registerCss.css";
import { Alert, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState("");
  const [FormData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
    phonenumber: "",
  });

  const handleRegister = async (event) => {
    console.log("logging");
    event.preventDefault();
    setError("");
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    } else {
      try {
        console.log("try");
        const response = await axios.post(
          "http://127.0.0.1:8000/api/register",
          FormData
        );
        const token = response.data.token;

        localStorage.setItem("login_token", token);
        navigate("/home");
      } catch (e) {
        console.log("catch");
        let errorMessage = e.response.data.error;
        setError(errorMessage);
      }
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (FormData.username === undefined || FormData.username === "") {
      setError("Username is required");
      return false;
    } else if (FormData.email === undefined || FormData.email === "") {
      setError("Email is required");
      return false;
    } else if (FormData.password === undefined || FormData.password === "") {
      setError("Password is required");
      return false;
    } else if (FormData.age === undefined || FormData.age === "") {
      setError("Age is required");
      return false;
    } else if (
      FormData.phonenumber === undefined ||
      FormData.phonenumber === ""
    ) {
      setError("Phonenumber is required");
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    console.log(event.target.name, event.target.value);
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="registerRoot">
      <div className="registerBox">
        <h1>Register Account</h1>
        {Error && <Alert severity="error">{Error}</Alert>}
        <form className="registerForm">
          <TextField
            label="Username"
            name="username"
            variant="outlined"
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Email"
            name="email"
            variant="outlined"
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Age"
            name="age"
            type="number"
            variant="outlined"
            inputProps={{
              min: 0,
              max: 150,
              maxLength: 3
            }}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Phone Number"
            name="phonenumber"
            variant="outlined"
            onChange={handleChange}
            inputProps={{ inputMode: "text", pattern: "[0-9]*" }}
            fullWidth
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleRegister}
            fullWidth
          >
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Register;
