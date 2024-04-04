// Posts.js
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  Typography,
  CardContent,
  IconButton,
  Box,
  Container,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";

const Posts = ({ post, updatePostLikes }) => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [isLiked, setIsLiked] = useState(post.Likes.includes(userId));
  const [isComment,SetIsComment] = useState(false)

  const handleLike = async () => {
    try {
      const res = await axios.put(
        `http://localhost:4000/api/post/like/${post._id}`,
        { userId: userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const updatedIsLiked = !isLiked;
      setIsLiked(updatedIsLiked);

      updatePostLikes(post._id, updatedIsLiked);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        padding: "40px",
        marginBottom:"40px",
        marginLeft:"80px"
      }}
    >
      <CardHeader
        title={`${post.FirstName} ${post.LastName}`}
        subheader={post.Location}
      />
      <CardMedia component="img" height={200} width={200} image={post.Post} />
      <CardContent>
        <Typography variant="h6">{post.Description}</Typography>
      </CardContent>
      <IconButton onClick={handleLike}>
        <FavoriteIcon sx={{ color: isLiked ? "red" : "inherit" }} />
        <Typography variant="span" sx={{ color: "black" }}>
          {post.Likes.length} likes
        </Typography>
      </IconButton>
      <CardContent>
        
        <Box>
          {post.Comments.map((com) => (
            <Container>
                 <Box sx={{
              display:"flex",
              alignItems:"center",
              gap:"10px",
              marginBottom:"4px"
            }}>
              <img
                src={com.Profile}
                width={50}
                height={50}
              
                style={{
                  borderRadius: "50%",
                }}
              />
              <Typography sx={{
                textAlign:"center"
              }}>{com.userName}</Typography>
              
            </Box>
            <Typography sx={{
                display:"block"
              }}>{com.text}</Typography>
              
            </Container>
           
            
          ))}
        </Box>
       
      </CardContent>
    </Card>
  );
};

export default Posts;
