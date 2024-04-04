const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    Post: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
    },
    Location: {
      type: String,
      required: true,
    },
    Likes: {
      type: [String],
      ref: "User",
      default: [],
    },
    Comments: [
      {
        userId: {
          type: String,

          required: true,
        },
        text: {
          type: String,
          required: true,
        },
        Profile: {
          type: String,
        },
        userName: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);


module.exports = Post
