import { Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./landingCss.css";
import Logo from "./capstoneLogo.png";

function Landing() {
  const token = localStorage.getItem("login_token");
  const navigate = useNavigate();

  useEffect(() => {
    token ? navigate("/home") : navigate("/");
  }, []);

  const buttonClick = (operation) => {
    if (operation === "login") {
      navigate("/login");
    }

    if (operation === "register") {
      navigate("/register");
    }
  };

  return (
    <div className="landingRoot">
      <img src={Logo} alt="logo" />

      <div className="buttonsDiv">
        <Button
          className="landingButton"
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => buttonClick("login")}
        >
          Login
        </Button>
        <Button
          className="landingButton"
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => buttonClick("register")}
        >
          Register
        </Button>
      </div>
      <div
        className="attentionContainer"
        style={{
          maxWidth: "500px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" color="red">
          Attention!
        </Typography>
        <Typography variant="p" sx={{ textAlign: "center" }}>
          Before continuing, please visit this site{" "}
          <Link
            to="https://ec2-34-207-75-51.compute-1.amazonaws.com"
            target="_blank"
          >
            ec2-34-207-75-51.compute-1.amazonaws.com
          </Link>{" "}
          to be able to access the backend of my application
        </Typography>
        <Typography variant="h5" sx={{fontWeight: 'bolder'}}>Login using Test Account or Register</Typography>
        <Typography variant="p">Email: Admin@reserva.com</Typography>
        <Typography variant="p">Password: admin</Typography>
      </div>
    </div>
  );
}

export default Landing;
