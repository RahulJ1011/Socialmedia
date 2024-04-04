import { Box, Button, Container, TextField } from "@mui/material";
import React, { useState } from "react";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebaseConfig";

import axios from "axios";
import { useNavigate } from "react-router-dom";
const Addpost = () => {
  const userName = localStorage.getItem("UserName");
  const userId = localStorage.getItem("userId");
  const Navigate = useNavigate()
  const [data, setData] = useState({
    userId,
    FirstName: userName,
    Post: "",
    Description: "",
    Location: "",
  });
  const [imageUpload, setImageUpload] = useState(null);
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const uploadImage = (e) => {
    e.preventDefault();
    const PostId = Date.now().toString();
    const imageRef = ref(storage, `post/${PostId}`);
    const imageListRef = ref(storage, `post/`);

    if (imageUpload == null) {
      return;
    }
    uploadBytes(imageRef, imageUpload).then(() => {
      alert("Uploaded");
      listAll(imageListRef).then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            if (item.name === PostId) {
              setData({
                ...data,
                Post: url,
              });
            }
          });
        });
      });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:4000/api/post/create",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    Navigate('/feed')
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container
        sx={{
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
          <TextField
            type="text"
            name="FirstName"
            label="UserName"
            value={userName}
            disabled
          />
          <TextField
            type="text"
            name="Description"
            label="Description"
            placeholder="Enter Description"
            required
            value={data.Description}
            onChange={handleChange}
          />
          <TextField
            type="text"
            name="Location"
            label="Location"
            placeholder="Enter Location"
            required
            value={data.Location}
            onChange={handleChange}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <label>POST</label>
            <input
              type="file"
              accept="image/*"
              multiple={false}
              onChange={(e) => setImageUpload(e.target.files[0])}
            />
            <button
              type="submit"
              onClick={uploadImage}
              style={{
                width: "150px",
                backgroundColor: "#00B8FA",
                color: "white",
                fontSize: "15px",
                fontWeight: "400",
              }}
            >
              Upload Image
            </button>{" "}
          </div>
          <Button
            type="submit"
            variant="contained"
            sx={{
              "&:hover": {
                backgroundColor: "black",
              },
            }}
          >
            POST
          </Button>
        </Box>
      </Container>
    </form>
  );
};

export default Addpost;
