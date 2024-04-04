const express = require("express");
const { verifyToken } = require("../middleware/verify");
const { followUnfollowUser,  getunknown, getFriends } = require("../controllers/friends");
const router = express.Router();
router.post("/followUnfollow/:id", verifyToken, followUnfollowUser);
router.get('/getUnknown/:userId',verifyToken,getunknown)
router.get('/getFriends/:userId',verifyToken,getFriends)

module.exports = router;
