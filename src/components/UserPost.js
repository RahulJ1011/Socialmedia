import { Card, CardHeader, Container } from "@mui/material";
import React from "react";

const UserPost = ({ isPostShow, post }) => {
  return (
    <>
      <Container
        sx={{
          borderRadius: "10px",

          boxShadow:
            "0px 4px 16px rgba(17, 17, 26, 0.1), 0px 8px 24px rgba(17, 17, 26, 0.1), 0px 16px 56px rgba(17, 17, 26, 0.1)",
        }}
      >
        {isPostShow && (
          post.map((posts)=> (
            <Card
            sx={{
              maxWidth: 345,
              padding: "40px",
              marginBottom: "40px",
              marginLeft: "80px",
            }}
          >
            <CardHeader
            title={`${posts.FirstName} ${posts.LastName}`}
            subheader={posts.Location}
            />
          </Card>
          ))
        )}
      </Container>
    </>
  );
};

export default UserPost;
