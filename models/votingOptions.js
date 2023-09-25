const mongoose = require("mongoose");
const { MBTI, ENNEAGRAM, ZODIAC } = require("../constants/index");

const votingOptionsSchema = new mongoose.Schema({
  MBTI: {
    type: Array,
    default: MBTI,
  },
  Enneagram: {
    type: Array,
    default: ENNEAGRAM,
  },
  Zodiac: {
    type: Array,
    default: ZODIAC,
  },
});

const votingOptions = mongoose.model("voting-options", votingOptionsSchema);

module.exports = votingOptions;
