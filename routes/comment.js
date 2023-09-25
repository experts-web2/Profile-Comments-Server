"use strict";

const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");

const { MESSAGE, STATUS } = require("../constants/index");

module.exports = function () {
  // POST route for adding new comment
  router.post("/add", async function (req, res, next) {
    try {
      const { profile_id, title, description, user, personalityVotes } =
        req.body;
      const newComment = {
        profile_id,
        title,
        description,
        user,
        personalityVotes,
      };
      const result = await new Comment(newComment).save();
      res.status(200).send({
        status: STATUS.SUCCESS,
        data: result,
        message: MESSAGE.CREATED,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        status: STATUS.ERROR,
        message: MESSAGE.SERVER_ERROR,
      });
    }
  });

  // POST route for adding like to a comment
  router.post("/like", async function (req, res, next) {
    try {
      const { comment_id } = req.body;
      const comment = await Comment.findById(comment_id);

      // Check if the comment exists
      if (!comment) {
        return res.status(404).send({
          status: STATUS.ERROR,
          message: MESSAGE.NOT_FOUND,
        });
      }

      // Increment the likes field
      comment.likes += 1;

      // Save the updated comment
      const updatedComment = await comment.save();
      res.status(200).send({
        status: STATUS.SUCCESS,
        data: updatedComment,
        message: MESSAGE.UPDATED,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        status: STATUS.ERROR,
        message: MESSAGE.SERVER_ERROR,
      });
    }
  });

  return router;
};
