
const Posts = require("../models/post");
const User = require("../models/user");

const displayPosts = async (req, res) => {
  try {
    const posts = await Posts.find();
    return res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const createPost = async (req, res) => {
  try {
    const { userId, Description, Post, Location } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ msg: "User not found. Cannot upload post." });
    }
    const newPost = new Posts({
      userId,
      FirstName: user.FirstName,
      LastName: user.LastName,
      Post,
      Description,
      Location,
      Likes: [],
      Comments: [],
    });
    await newPost.save();
    return res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Posts.findById(id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    await Posts.findByIdAndDelete(id);
    return res.status(200).json({ msg: "Post deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const likeOrUnlike = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;
    const post = await Posts.findById(postId);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    const liked = post.Likes.includes(userId);
    if (!liked) {
      post.Likes.push(userId);
    } else {
      post.Likes = post.Likes.filter((id) => id !== userId);
    }
    await post.save();
    return res.status(200).json(post);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text, userId, Profile, userName } = req.body;
    if (!text || !userId || !Profile || !userName) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    const post = await Posts.findById(postId);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    const comment = { userId, text, Profile, userName };
    post.Comments.push(comment);
    await post.save();
    return res.status(201).json({ msg: "Comment added successfully", post });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
const mypost = async(req,res)=>
{
  try
  {
    const {userId} = req.params;
    const post = await Posts.findOne({userId:userId});
    if(!post)
    {
      return res.status(400).json({msg:"post not found"})
    }
    else
    {
      return res.status(201).json(post)
    }
  }catch(err)
  {
    console.log(err);
    return res.status(500).json({msg:"Internal Server Error"})
  }
}
module.exports = {
  displayPosts,
  createPost,
  deletePost,
  likeOrUnlike,
  addComment,
  mypost
};
