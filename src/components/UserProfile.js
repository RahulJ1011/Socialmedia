import { Box, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import UserDetails from "./UserDetails";

const UserProfile = () => {
  const Profile = localStorage.getItem("ProfilePic");
  const userId = localStorage.getItem("userId");
  const UserName = localStorage.getItem("UserName");
  const token = localStorage.getItem("token");
  const Posts = JSON.parse(localStorage.getItem("Posts"))
  const [Friends, SetFriends] = useState([]);
  const [UserPosts, SetUserPosts] = useState([]);
  const [isShow, SetIsShow] = useState(false);
  const [isPostShow, SetIsPostShow] = useState(false);
  const Post = Posts.filter((post)=> post.userId === userId)
  useEffect(()=> {
    const fetchMyPosts = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/post/mypost/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
    
        console.log("Fetched user posts:", res.data);
        SetUserPosts(res.data);
        console.log(UserPosts)
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };
       
    fetchMyPosts();
  },[])
  useEffect(() => {
    const friendsData = JSON.parse(localStorage.getItem("UpdatedFriends"));
    SetFriends(friendsData);
    console.log("Posts",Post)
  }, []);

  
  useEffect(() => {
    console.log("UserPosts:", UserPosts);
  }, [UserPosts]);

  const handleChange = () => {
    SetIsShow(!isShow);
  };

  const handlePostChange = () => {
    SetIsPostShow(!isPostShow);
  };

  return (
    <Container sx={{ marginTop: "150px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          boxShadow:
            "0px 4px 16px rgba(17, 17, 26, 0.1), 0px 8px 24px rgba(17, 17, 26, 0.1), 0px 16px 56px rgba(17, 17, 26, 0.1)",
        }}
      >
        <Box
          sx={{
            padding: "30px",
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          <img
            src={Profile}
            style={{
              borderRadius: "50%",
              marginLeft: "80px",
              height: "200px",
              width: "250px",
            }}
          />
          <Typography variant="h5" sx={{ fontSize: "25px", fontWeight: "600" }}>
            {UserName}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ marginTop: "25px", fontSize: "25px", fontWeight: "600" }}
            >
              FRIENDS
            </Typography>
            <Typography>{Friends.length}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            marginLeft: "150px",
            display: "flex",
            gap: "30rem",
          }}
        >
          <Button variant="contained" onClick={handleChange}>
            FRIENDS
          </Button>
          <Button variant="contained" onClick={handlePostChange}>
            POSTS
          </Button>
        </Box>
      </Box>
      <UserDetails
        handleChange={handleChange}
        isShow={isShow}
        Friends={Friends}
        Post={Post}
        handlePostChange={handlePostChange}
        isPostShow={isPostShow}
      />
    </Container>
  );
};

export default UserProfile;

