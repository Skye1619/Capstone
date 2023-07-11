import React from 'react'
import './registerCss.css'
import { Button, TextField } from '@mui/material';

function Register() {
  return (
    <div className='registerRoot'>
        <div className='registerBox'>
            <h1>Register Account</h1>
            <form className='registerForm'>
                <TextField label='Username' name='username' variant='outlined' fullWidth required />
                <TextField label='Email' name='email' variant='outlined' fullWidth required />
                <TextField label='Password' name='password' variant='outlined' fullWidth required />
                <TextField label='Age' name='age' variant='outlined' fullWidth required />
                <TextField label='Phone Number' name='pnonenumber' variant='outlined' fullWidth required />
                <Button type='submit' variant='outlined' color='primary' fullWidth >Register</Button>
            </form>
        </div>
    </div>
  )
}

export default Register
