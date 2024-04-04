import {
  Avatar,
  Button,
  Box,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
const Signin = () => {
  const [data, setData] = useState({
    Email:"",
    Password:""
  });
  const navigate = useNavigate()
  const handleChange = (e) => {
    const {name,value} = e.target;
    setData((prev)=> {
      return {
        ...prev,
        [name]:value
      }
    })
  };
  const handleSubmit = async(e)=>
  {
    e.preventDefault();
    const response = await axios.post('http://localhost:4000/api/auth/login',data)
    console.log(response)
    const {token,} = response.data;
    const {FirstName,LastName,_id,Profile} = response.data.loggedUser
    const userId = _id;
    console.log(token,FirstName,LastName,userId,Profile);
    localStorage.setItem("userId",userId);
    localStorage.setItem("UserName",FirstName);
    localStorage.setItem("token",token);
    localStorage.setItem("ProfilePic",Profile)
    navigate('/feed')
  }
  return (
    <form
    onSubmit={handleSubmit}
    >

   
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "60px",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          textAlign: "center",
          borderRadius: "15px",
          boxShadow:
            "0px 4px 16px rgba(17, 17, 26, 0.1), 0px 8px 24px rgba(17, 17, 26, 0.1), 0px 16px 56px rgba(17, 17, 26, 0.1)",
        }}
      >
        <Typography
        sx={{
          fontWeight:"500",
          fontSize:"20px"
        }}
        >Welcome Back</Typography>
        <Avatar>
          <LoginIcon></LoginIcon>
        </Avatar>
        <TextField
          type="email"
          placeholder="Enter Your email"
          name="Email"
          required
          label="Enter your  email"
          value={data.Email}
          onChange={handleChange}
          sx={{
            borderRadius: "5px",
          }}
        />
        <TextField
          type="password"
          placeholder="Enter Your Password"
          name="Password"
          required
          label="Enter your  Password"
          value={data.Password}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{
            "&:hover": {
              backgroundColor: "black",
            },
          }}
        >
          LOGIN
        </Button>
      </Box>
    </Container>
    </form>
  );
};

export default Signin;
