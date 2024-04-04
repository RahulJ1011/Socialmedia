const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
    },
    Gender: {
      type: String,
      required: true,
    },
    Country: {
      type: String,
      required: true,
    },
    Friends: [
      {
        userId: {
          type: String,
          required: true,
        },
        ProfilePic: {
          type: String,
          required: true,
        },
        UserName: {
          type: String,
          required: true,
        },
      },
    ],
    Profile: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);


module.exports =User
