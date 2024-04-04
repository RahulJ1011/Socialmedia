import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import axios from "axios";
import Posts from "./Posts";

const DisplayPosts = () => {
  const token = localStorage.getItem("token");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/post/feed", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setPosts(res.data);
        localStorage.setItem("Posts",JSON.stringify(res.data))
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  const updatePostLikes = (postId,isLiked)=>
  {
    const updatedPosts = JSON.parse(localStorage.getItem("Posts")).map(post => {
      if (post._id === postId) {
        return {
          ...post,
          Likes: isLiked
            ? [...post.Likes, localStorage.getItem("userId")]
            : post.Likes.filter(id => id !== localStorage.getItem("userId")),
        };
      }
      return post;
    });

    localStorage.setItem("Posts", JSON.stringify(updatedPosts)); 

   
    setPosts(updatedPosts);
  }

  return (
    <Container  sx={{
      marginTop:"150px",
      
      
    }}>
      {posts.map((post) => (
        <Posts key={post._id} post={post} updatePostLikes={updatePostLikes} />
      ))}
    </Container>
  );
};

export default DisplayPosts;
