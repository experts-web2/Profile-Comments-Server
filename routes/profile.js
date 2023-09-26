const express = require("express");
const router = express.Router();
const Profile = require("../models/profile");
var ObjectId = require("mongodb").ObjectId;
var { MESSAGE, STATUS, STATUS_CODE } = require("../constants");

module.exports = function () {

  // Add New Profile
  router.post("/add", async function (req, res, next) {
    if (!req && !req.body) {
      return res.status(STATUS_CODE.SERVER_CANNOT_PROCESS).json({
        status: STATUS.ERROR,
        message: MESSAGE.SERVER_CANNOT_PROCESS,
      });
    }
    try {
      const result = await new Profile(req.body).save();
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

  // Get Profile by Id
  router.get("/:id", async function (req, res, next) {
    const profileId = req.params.id;
    if (!profileId) {
      return res.status(STATUS_CODE.SERVER_CANNOT_PROCESS).send({
        status: STATUS.ERROR,
        message: MESSAGE.SERVER_CANNOT_PROCESS,
      });
    }
    try {
      const profile = await Profile.findOne({ _id: ObjectId(profileId) });
      if (!profile) {
        return res.status(STATUS_CODE.NOT_FOUND).send({
          status: STATUS.FAILED,
          message: MESSAGE.NOT_FOUND,
        });
      }
      res.render("profile_template", {
        profile: profile,
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
