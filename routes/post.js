const express = require("express");
const {
  displayPosts,
  createPost,
  deletePost,
likeOrUnlike,
  addComment,
  mypost,
} = require("../controllers/post");
const { verifyToken } = require("../middleware/verify");
const router = express.Router();
router.get("/feed", verifyToken, displayPosts);
router.post("/create", verifyToken, createPost);
router.delete("/deletePost/:id", verifyToken, deletePost);
router.put("/like/:postId", verifyToken, likeOrUnlike);
router.put("/comment/:postId", verifyToken, addComment);
router.get('/mypost/:userId',verifyToken,mypost)

module.exports = router;