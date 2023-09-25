const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to a User model
    required: true,
  },
  profile_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile", // Reference to a Profile model
    required: true,
  },
  personalityVotes: {
    MBTI: String,
    Enneagram: String,
    Zodiac: String,
  },
  likes: {
    type: Number,
    default: 0,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
