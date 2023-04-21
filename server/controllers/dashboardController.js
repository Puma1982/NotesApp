const Note = require("../models/Notes");
const mongoose = require("mongoose");

/*
 * GET /
 * Dashboard
 */

exports.dashboard = async (req, res) => {
  const locals = {
    title: "Dashboard",
    description: "Auth.2 Calandar Note App",
  };

  try {
    /* in this tryCatch we are getting the notes from the DB and doing rendering  */
    const notes = await Note.find({});
    res.render("dashboard/index", {
      userName: req.user.firstName,
      locals,
      notes,
      layout: "../views/layouts/dashboard",
    });
  } catch (error) {}
};
