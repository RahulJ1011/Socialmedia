import { Container, Grid } from "@mui/material";
import React from "react";
import Profile from "../components/Profile";
import DisplayPosts from "../components/DisplayPosts";
import Navbar from "../components/Navbar";

const Feed = () => {
  return (
    <>
      <Navbar />
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Container
            
          >
            <Profile />
          </Container>
        </Grid>
        <Grid item xs={9}>
          <Container
            
          >
            <DisplayPosts />
          </Container>
        </Grid>
      </Grid>
      
    </>
  );
};

export default Feed;
