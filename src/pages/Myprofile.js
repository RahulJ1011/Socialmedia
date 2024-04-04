import React from 'react'
import Navbar from '../components/Navbar'
import UserProfile from '../components/UserProfile'
import { Container, Grid } from '@mui/material'
import Profile from '../components/Profile'

const Myprofile = () => {
  return (
    <>
    <Navbar />
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Container>
          <Profile></Profile>
        </Container>
      </Grid>
      <Grid 
      item xs={8}
      >
        <Container>
          <UserProfile />
        </Container>

      </Grid>
    </Grid>
    </>
  )
}

export default Myprofile
