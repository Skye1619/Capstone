import React from 'react'
import { Button, Typography } from "@mui/material";
import './profileCss.css'

function Profiles() {
  return (
    <div className='profileRoot'>
      <div className='profileContainer'>
        <div className='profileImagePlaceholder'></div>
        <Typography variant='h5'>Name Here</Typography>
        <div className='profileDetails'>
          <div className='detailsRow'>
            <Typography variant='p'>Username:</Typography>
            <Typography variant='p'>Username Here</Typography>
          </div>
          <div className='detailsRow'>
            <Typography variant='p'>Email:</Typography>
            <Typography variant='p'>sebastianjohnskyle@yahoo.com</Typography>
          </div>
          <div className='detailsRow'>
            <Typography variant='p'>Phone Number:</Typography>
            <Typography variant='p'>Phone Number Here</Typography>
          </div>
        </div>
        <div style={{padding: '0 60px', marginTop: '50px', display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', boxSizing: 'border-box'}}>
          <Button variant='contained' className='profileButtons' fullWidth>Edit Profile</Button>
          <Button variant='contained' className='profileButtons' fullWidth>List your Property</Button>
          <Button variant='contained' className='profileButtons' fullWidth>Deactivate Account</Button>
          <Button variant='contained' className='profileButtons' fullWidth>Logout</Button>
        </div>
      </div>
    </div>
  )
}

export default Profiles