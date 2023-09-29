"use strict";
const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");
const { MESSAGE, STATUS, STATUS_CODE, FILTER } = require("../constants");
const { validateRequestBody } = require('../middleware');

module.exports = function () {
  // Add New Comment
  router.post("/add", validateRequestBody, async function (req, res) {
    try {
      const result = await new Comment(req.body).save();
      res.status(STATUS_CODE.CREATED).send({
        status: STATUS.SUCCESS,
        data: result,
        message: MESSAGE.CREATED,
      });
    } catch (error) {
      return res.status(STATUS_CODE.INTERVAL_SERVER_ERROR).send({
        error,
        status: STATUS.ERROR,
        message: MESSAGE.SERVER_ERROR,
      });
    }
  });

  //Add Like or Unlike on the Post
  router.post("/like", validateRequestBody, async function (req, res) {
    try {
      const { comment_id, increment } = req.body;
      const comment = await Comment.findById(comment_id);
      if (!comment) {
        return res.status(STATUS_CODE.NOT_FOUND).send({
          status: STATUS.ERROR,
          message: MESSAGE.NOT_FOUND,
        });
      }
      if (increment) {
        comment.likes += 1;
      } else {
        comment.likes = Math.max(comment.likes - 1, 0);
      }

      const updatedComment = await comment.save();
      res.status(STATUS_CODE.SUCCESS).send({
        status: STATUS.SUCCESS,
        data: updatedComment,
        message: MESSAGE.UPDATED,
      });
    } catch (error) {
      return res.status(STATUS_CODE.INTERVAL_SERVER_ERROR).send({
        error,
        status: STATUS.ERROR,
        message: MESSAGE.SERVER_ERROR,
      });
    }
  });

  // Get Comments By Sort, Filter or All
  router.post("/all", validateRequestBody, async function (req, res) {
    try {
      let query = {};
      const { sort, filter } = req.body;
      let sortOptions = {};
      if (sort === FILTER.BEST) {
        sortOptions = { likes: -1 };
      } else if (sort === FILTER.RECENT) {
        sortOptions = { createdDate: -1 };
      }
      if (filter) {
        if (filter === FILTER.ALL) {
          query = {};
        } else {
          query = {
            [`personalityVotes.${filter}`]: {
              $exists: true,
              $ne: ''
            }
          };
        }
      }
      const profile = await Comment.find(query).sort(sortOptions);
      res.status(STATUS_CODE.SUCCESS).send({
        status: STATUS.SUCCESS,
        data: profile,
        message: MESSAGE.RETERIEVED_SUCESSFULLY,
      });
    } catch (error) {
      return res.status(STATUS_CODE.INTERVAL_SERVER_ERROR).send({
        error,
        status: STATUS.ERROR,
        message: MESSAGE.SERVER_ERROR,
      });
    }
  });
  return router;
};
