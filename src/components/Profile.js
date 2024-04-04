import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
const Profile = () => {
  const profile = localStorage.getItem("ProfilePic");
  const UserName = localStorage.getItem("UserName");
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [Persons, SetPersons] = useState([]);
  const [Friend, SetFriend] = useState([]);
  const [UserFriends, SetUserFriends] = useState([]);

  const [UpdatedFriends,SetUpdatedFriends] = useState([])
  const Posts = JSON.parse(localStorage.getItem("Posts"))
  const ProfileFriends = JSON.parse(localStorage.getItem("UserFriends"))
  const myPosts = Posts.filter((post)=> (
    post.userId === userId
  ))
  const friendsData = JSON.parse(localStorage.getItem("UpdatedFriends"));
  const friends = async () => {
    const res = await axios.get(
      `http://localhost:4000/api/users/getUnknown/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
    
    const FriendsOnly = res.data[0].Friends;
    console.log(res.data[0].Friends)
    
    SetUserFriends(FriendsOnly);
    console.log("Friends",UserFriends)
    
    localStorage.setItem("UserFriends", JSON.stringify(FriendsOnly));
    SetPersons(res.data);
    const SuggestedUsers= Persons.filter((user)=> user._id !== userId);
    SetPersons(SuggestedUsers)
  };
  const getFriends = async()=>
  {
    const res = await axios.get(
      `http://localhost:4000/api/users/getFriends/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    
    console.log("update",res.data);
    const UpdatedFriendsOnly = res.data
    SetUpdatedFriends(UpdatedFriendsOnly)
    localStorage.setItem("UpdatedFriends",JSON.stringify(UpdatedFriendsOnly)) 
  }
  useEffect(() => {
    friends();
    getFriends()
  }, []);
  const FollowAndUnfollow = async (friendId) => {
    try {
      const id = userId;
      console.log(id);
      console.log(friendId);

      const res = await axios.post(
        `http://localhost:4000/api/users/followUnfollow/${id}`,
        {
          friendId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      friends();
      const updatedFriend = res.data;
     

      console.log(res);
      SetFriend(updatedFriend);
      localStorage.setItem("friends", JSON.stringify(updatedFriend));
    } catch (error) {
      console.error("Error following/unfollowing friend:", error);
    }
  };

  return (
    <Container>
      <Container
        sx={{
          marginTop: "140px",
          paddingTop: "50px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "450px",
          boxShadow:
            "0px 4px 16px rgba(17, 17, 26, 0.1), 0px 8px 24px rgba(17, 17, 26, 0.1), 0px 16px 56px rgba(17, 17, 26, 0.1)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={`${profile}`}
            height={200}
            width={200}
            style={{
              borderRadius: "50%",
            }}
          />
          <Typography
            sx={{
              paddingTop: "20px",
              fontSize: "20px",
              fontWeight: "500",
            }}
          >
            {UserName}
          </Typography>
          <Typography>Country:India</Typography>
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
            }}
          >
            <Typography
              sx={{
                marginTop: "15px",
              }}
            >
             {`POST:${myPosts.length}`}
            </Typography>
            <Typography
              sx={{
                marginTop: "15px",
              }}
            >
             {`FRIENDS:${ProfileFriends.length}`}
            </Typography>
          </Box>
        </Box>
      </Container>
      <Container>
        {Persons.map((friend) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            <img
              src={friend.Profile}
              height={80}
              width={80}
              style={{
                borderRadius: "50%",
              }}
            />
            <Typography>{`${friend.FirstName} ${friend.LastName}`}</Typography>
            <Button
              variant="contained"
              onClick={() => FollowAndUnfollow(friend._id)}
              sx={{
                float: "right",
              }}
            >
              Follow
            </Button>
          </Box>
        ))}
      </Container>
    </Container>
  );
};

export default Profile;
