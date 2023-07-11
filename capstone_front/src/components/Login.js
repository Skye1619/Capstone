import { Button, FormControl, TextField } from "@mui/material";
import React from "react";
import './Logincss.css'
import Logo from './capstoneLogo.png'

function Login() {

    const buttonClick = (operation) => {

        if (operation === "login") { }
    }

  return (
    <div className="loginRoot">
          <img src={Logo} alt='logo' style={{marginTop:"50px"}}/>
      <FormControl className='formControl'>
        <TextField
          label="email"
          name="email"
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          label="password"
          name="password"
          variant="outlined"
          fullWidth
          required
        />
        <Button
          className="loginButton"
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => buttonClick("login")}
        >
          Login
        </Button>
        <Button
          className="loginButton"
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => buttonClick("login")}
        >
          Forgot Password
        </Button>
      </FormControl>
    </div>
  );
}

export default Login;
