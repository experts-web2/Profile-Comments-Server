"use strict";

const express = require("express");
const router = express.Router();
const Profile = require("../models/profile");
var ObjectId = require("mongodb").ObjectId;

const { MESSAGE, STATUS } = require("../constants/index");
const votingOptions = require("../models/votingOptions");

module.exports = function () {
  // POST route for creating new profiles
  router.post("/add", async function (req, res, next) {
    try {
      const {
        name,
        description,
        mbti,
        enneagram,
        variant,
        tritype,
        socionics,
        sloan,
        psyche,
      } = req.body;
      const newProfile = {
        name,
        description,
        mbti,
        enneagram,
        variant,
        tritype,
        socionics,
        sloan,
        psyche,
        image: "https://soulverse.boo.world/images/1.png",
      };
      const result = await new Profile(newProfile).save();
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

  // GET route for displaying profile by ID
  router.get("/:id", async function (req, res, next) {
    const profileId = req.params.id; // Extract the profile ID from the URL
    try {
      const profile = await Profile.findOne({ _id: ObjectId(profileId) }); // Find the profile by ID

      // If no matching profile is found, return a 404 error
      if (!profile) {
        return res.status(404).send({
          status: STATUS.FAILED,
          message: MESSAGE.NOT_FOUND,
        });
      }

      res.render("profile_template", {
        profile: profile,
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
