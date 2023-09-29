"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
const { startDatabase } = require("./setup");

// set the view engine to ejs
app.set("view engine", "ejs");

// Set up body-parser to parse request bodies
app.use(bodyParser.urlencoded({ extended: "true" }));
app.use(bodyParser.json({ type: "*/*" }));

// routes
app.use("/api/profile", require("./routes/profile")());
app.use("/api/comment", require("./routes/comment")());

startDatabase(); // Start the database

// start server
const server = app.listen(port);
console.log("Express started. Listening on %s", port);
module.exports = app;
