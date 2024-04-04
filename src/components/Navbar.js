import styled from "@emotion/styled";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  TextField,
  InputAdornment,
  alpha,
  Badge,
  MenuItem,
  Select,
  
} from "@mui/material";
import {makeStyles} from "@mui/styles"
import React, { useState,useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link, NavLink } from "react-router-dom";
const useStyles = makeStyles(() => ({
  link: {
    textDecoration: 'none',
    color:"black"
  },
}));


const Navbar = () => {
 
  const classes = useStyles();
  const [profile,setProfile] = useState('')
  const FirstName = localStorage.getItem("UserName")
  const Profile = localStorage.getItem("ProfilePic")
  const token = localStorage.getItem("token")
  const handleProfileChange = (e) => {
    setProfile(e.target.value);
    console.log(e.target.value);
  
    if (e.target.value === "logout") {
      localStorage.setItem("token", null);
      window.location.href = '/login'; 
    }
  }
  
  useEffect(() => {
    const storedProfile = localStorage.getItem('profile');
    if (storedProfile) {
      setProfile(storedProfile);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('profile', profile);
  }, [profile]); 
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
          sx={{
            padding:"25px",
            fontWeight:"600",
            fontSize:"27px"
          }}
          >

            <NavLink
            className={classes.link}
            to={'/feed'}
            >
                  SOCIALMEDIA

            </NavLink>
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Search"
            label="search"
            sx={{
              position: "relative",
              marginLeft: "80px",
              marginTop: "10px",
              marginBottom: "10px",
              borderRadius: "10px",
              backgroundColor: alpha("#E3E0F3", 0.15),
              width: "20%",
              "&:hover": {
                backgroundColor: alpha("#ACA7CB", 0.25),
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <SearchIcon
                      sx={{
                        padding: "20px",
                        height: "100%",
                        position: "absolute",
                        pointerEvents: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <IconButton size="large" color="white">
              <Badge>
                <AddIcon />
              </Badge>
              <Typography
                variant="h6"
                textAlign={"center"}
                ml={1}
                sx={{ margin: 0 }}
              >
                <Link className={classes.link} to={"/post"}>
                  POST
                </Link>
              </Typography>
            </IconButton>
            <IconButton>
              <Badge>
                <PersonIcon />
              </Badge>
              <Typography
                variant="h6"
                textAlign={"center"}
                ml={1}
                sx={{ margin: 0 }}
              >
                <Link className={classes.link} to={"/profile"}>
                  PROFILE
                </Link>
              </Typography>
            </IconButton>
            <Select
              value={profile}
              onChange={handleProfileChange}
              sx={{
                width: "200px",
                height: "60px",
                border: "0.5px solid black",
                marginLeft: "10px",
              }}
             
            >
              <MenuItem value={"firstName"}>
                <IconButton>
                 <img src={`${Profile}`} height={50} width={50} style={
                  {
                    borderRadius:"50%"
                  }
                 } />
                </IconButton>
                {FirstName}
              </MenuItem>
              <MenuItem value={"logout"}><Link
              to={'/login'}
              >
              LOGOUT
              </Link></MenuItem>
            </Select>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
