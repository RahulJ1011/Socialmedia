import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  IconButton,
} from "@mui/material";
import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import UserPost from "./UserPost";
const UserDetails = ({ isPostShow, isShow, Friends, Post }) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Container
            sx={{
              borderRadius: "10px",

              boxShadow:
                "0px 4px 16px rgba(17, 17, 26, 0.1), 0px 8px 24px rgba(17, 17, 26, 0.1), 0px 16px 56px rgba(17, 17, 26, 0.1)",
            }}
          >
            {isShow && (
              <Container
                sx={{
                  marginTop: "50px",
                  padding: "20px",
                  borderRadius:
                    "0px 4px 16px rgba(17, 17, 26, 0.1), 0px 8px 24px rgba(17, 17, 26, 0.1), 0px 16px 56px rgba(17, 17, 26, 0.1)",
                }}
              >
                {Friends.map((friend) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "4rem",
                      marginBottom: "20px",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={friend.ProfilePic}
                      height={60}
                      width={60}
                      style={{
                        borderRadius: "50%",
                      }}
                    />
                    <Typography>{friend.UserName}</Typography>
                  </Box>
                ))}
              </Container>
            )}
          </Container>
        </Grid>
        <Grid item spacing={7}>
          {isPostShow &&
            Post.map((post) => (
              <Container
              sx={{
                marginTop: "50px",
                padding: "20px",
                borderRadius:
                  "0px 4px 16px rgba(17, 17, 26, 0.1), 0px 8px 24px rgba(17, 17, 26, 0.1), 0px 16px 56px rgba(17, 17, 26, 0.1)",
              }}
              >
                <Card
                  sx={{
                    maxWidth: 345,
                    padding: "40px",
                    marginBottom: "40px",
                    marginLeft: "80px",
                  }}
                >
                  <CardHeader
                    title={`${post.FirstName} ${post.LastName}`}
                    subheader={post.Location}
                  />
                  <CardMedia
                    component="img"
                    height={200}
                    width={200}
                    image={post.Post}
                  />
                  <CardContent>
                    <Typography variant="h6">{post.Description}</Typography>
                  </CardContent>
                  <IconButton>
                    <FavoriteIcon />
                    <Typography variant="span" sx={{ color: "black" }}>
                      {post.Likes.length} likes
                    </Typography>
                  </IconButton>
                  <CardContent>
                    <Box>
                      {post.Comments.map((com) => (
                        <Container>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                              marginBottom: "4px",
                            }}
                          >
                            <img
                              src={com.Profile}
                              width={50}
                              height={50}
                              style={{
                                borderRadius: "50%",
                              }}
                            />
                            <Typography
                              sx={{
                                textAlign: "center",
                              }}
                            >
                              {com.userName}
                            </Typography>
                          </Box>
                          <Typography
                            sx={{
                              display: "block",
                            }}
                          >
                            {com.text}
                          </Typography>
                        </Container>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Container>
            ))}
        </Grid>
      </Grid>
    </>
  );
};

export default UserDetails;
