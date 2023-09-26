"use strict";
const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");
const { MESSAGE, STATUS, STATUS_CODE } = require("../constants");

module.exports = function () {
  // Add New Comment
  router.post("/add", async function (req, res, next) {
    if (!req && !req.body) {
      return res.status(STATUS_CODE.SERVER_CANNOT_PROCESS).json({
        status: STATUS.ERROR,
        message: MESSAGE.SERVER_CANNOT_PROCESS,
      });
    }
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

  //Add Like on the Post
  router.post("/like", async function (req, res, next) {
    try {
      const { comment_id } = req.body;
      if (!comment_id) {
        return res.status(STATUS_CODE.SERVER_CANNOT_PROCESS).json({
          status: STATUS.ERROR,
          message: MESSAGE.SERVER_CANNOT_PROCESS,
        });
      }
      const comment = await Comment.findById(comment_id);
      if (!comment) {
        return res.status(STATUS_CODE.NOT_FOUND).send({
          status: STATUS.ERROR,
          message: MESSAGE.NOT_FOUND,
        });
      }
      comment.likes += 1;
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
  return router;
};
