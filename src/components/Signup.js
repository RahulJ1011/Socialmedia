import React, { useState } from "react";
import {
  Avatar,
  Box,
  Container,
  Select,
  CssBaseline,
  FormControl,
  InputLabel,
  TextField,
  Typography,
  MenuItem,
  Button,
} from "@mui/material";

import { storage } from "../firebaseConfig";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import AppRegistration from "@mui/icons-material/AppRegistration";
const Signup = () => {
  const [data, setData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    Profile: "",
    Gender: "",
    Country: "",
  });
  const [imageUpload, setImageUpload] = useState(null);
  const navigate = useNavigate()
  const uploadImage = (e) => {
    e.preventDefault();
    const imageRef = ref(storage, `images/${data.FirstName}`);
    const imageListRef = ref(storage, `images/`);
    if (imageUpload == null) {
      return;
    }
    uploadBytes(imageRef, imageUpload).then(() => {
      alert("Uploaded");
      listAll(imageListRef).then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            if (item.name === data.FirstName) {
              setData({ ...data, Profile: url });
            }
          });
        });
      });
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:4000/api/auth/register",
      data
    );
    console.log(response);
    navigate('/login')
  };
  return (
    <form onSubmit={handleSubmit}>
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
            padding: "4em",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            textAlign: "center",
            borderRadius: "15px",
            boxShadow:
              "0px 4px 16px rgba(17, 17, 26, 0.1), 0px 8px 24px rgba(17, 17, 26, 0.1), 0px 16px 56px rgba(17, 17, 26, 0.1)",
          }}
        >
          <Typography variant="h5">REGISTER</Typography>

          <Avatar>
            <AppRegistration />
          </Avatar>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
            }}
          >
            <TextField
              type="text"
              placeholder="Enter Your First Name"
              name="FirstName"
              required
              label="Enter your First Name"
              value={data.FirstName}
              onChange={handleChange}
              sx={{
                borderRadius: "5px",
              }}
            />
            <TextField
              type="text"
              placeholder="Enter Your Last Name"
              name="LastName"
              required
              label="Enter your Last Name"
              value={data.LastName}
              onChange={handleChange}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
              
            }}
          >
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
          </Box>
          <div
            className="image"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <label>Profile Image</label>
            <input
              type="file"
              accept="image/*"
              multiple={false}
              placeholder
              onChange={(event) => {
                setImageUpload(event.target.files[0]);
              }}
            ></input>
            <button
              type="submit"
              onClick={uploadImage}
              style={{
                width: "150px",
                backgroundColor: "#00B8FA",
                cursor:"pointer",
                color: "white",
                fontSize: "15px",
                fontWeight: "400",
              }}
            >
              Upload Image
            </button>{" "}
          </div>
          <FormControl
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "20px",
            }}
          >
            <InputLabel>Gender</InputLabel>
            <Select
              sx={{
                width: "200px",
              }}
              value={data.Gender}
              name="Gender"
              onChange={handleChange}
            >
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
              <MenuItem value={"others"}>others</MenuItem>
            </Select>
            <TextField
              type="text"
              placeholder="Enter Your Country"
              name="Country"
              required
              label="Enter your  Country"
              value={data.Country}
              onChange={handleChange}
            />
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            sx={{
              "&:hover": {
                backgroundColor: "black",
              },
            }}
          >
            REGISTER
          </Button>
        </Box>
      </Container>
    </form>
  );
};

export default Signup;
