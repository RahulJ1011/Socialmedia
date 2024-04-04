const User = require("../models/user");

const followUnfollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { friendId } = req.body;

    if (id === friendId) {
      return res
        .status(400)
        .json({ error: "You cannot follow/unfollow yourself" });
    }

    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ error: "User or friend not found" });
    }

    const isFollowing = user.Friends.some(
      (friend) => friend.userId === friendId
    );

    if (isFollowing) {
      const friendIndex = user.Friends.findIndex((f) => f.userId === friendId);
      if (friendIndex !== -1) {
        await User.findByIdAndUpdate(id, {
          $pull: { Friends: { userId: friendId } },
        });
      }
      await User.findByIdAndUpdate(friendId, {
        $pull: { Friends: { userId: id } },
      });
      const users = await User.find({ "Friends.userId": id });
      const userFriends = users.map((user) => user.Friends);
      return res.status(200).json(userFriends);
    } else {
      await User.findByIdAndUpdate(id, {
        $push: {
          Friends: {
            userId: friendId,
            ProfilePic: friend.Profile,
            UserName: friend.FirstName,
          },
        },
      });

      await User.findByIdAndUpdate(friendId, {
        $push: {
          Friends: {
            userId: id,
            ProfilePic: user.Profile,
            UserName: user.FirstName,
          },
        },
      });

      const users = await User.find({ "Friends.userId": id });
      const userFriends = users.map((user) => user.Friends);

      return res.status(200).json(userFriends);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
const getunknown = async (req, res) => {
  try {
    const { userId } = req.params;
    const users = await User.find();
    const unKnowns = users.filter(
      (user) => !user.Friends.some((friend) => friend.userId === userId)
    );
    return res.status(200).json(unKnowns);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal Server error" });
  }
};
const getFriends = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const friends = user.Friends;
    return res.status(200).json(friends);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = { followUnfollowUser, getunknown, getFriends };
