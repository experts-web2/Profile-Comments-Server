const mongoose = require("mongoose");
const { MBTI, ENNEAGRAM } = require("../constants/index");

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  mbti: {
    type: String,
    enum: MBTI,
  },
  enneagram: {
    type: String,
    enum: ENNEAGRAM,
  },
  variant: {
    type: String,
  },
  tritype: {
    type: String,
  },
  socionics: {
    type: String,
  },
  sloan: {
    type: String,
  },
  psyche: {
    type: String,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("Profile", profileSchema);
