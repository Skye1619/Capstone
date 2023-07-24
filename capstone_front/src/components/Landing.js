import { Button } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './landingCss.css'
import Logo from './capstoneLogo.png'

function Landing() {

    const token = localStorage.getItem('login_token')
    const navigate = useNavigate()

    useEffect(() => {
      token ? navigate('/home') : navigate('/')
    }, [])

    const buttonClick = (operation) => {

        if (operation === 'login') {
            navigate('/login')
        }

        if (operation === 'register') {
            navigate('/register')
        }

    }

  return (
    <div className='landingRoot'>
      <img src={Logo} alt='logo' />
      <div className='buttonsDiv'>
        <Button className='landingButton' variant='contained' color='primary' fullWidth onClick={() => buttonClick('login')} >Login</Button>
        <Button className='landingButton' variant='contained' color='primary' fullWidth onClick={() => buttonClick('register')} >Register</Button>
      </div>
    </div>
  )
}

export default Landing
