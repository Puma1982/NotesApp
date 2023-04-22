const Note = require("../models/Notes");
const mongoose = require("mongoose");

/*
 * GET /
 * Dashboard
 */

exports.dashboard = async (req, res) => {
  let perPage = 6;
  let page = req.query.page || 1;

  const locals = {
    title: "Dashboard",
    description: "Auth.2 Calandar Note App",
  };

  try {
    /* in this tryCatch we are getting the notes from the DB and doing rendering  */
    const notes = await Note.aggregate([
      {
        $sort: {
          updatedAt: -1,
        },
      },
      {
        $match: { user: new mongoose.Types.ObjectId(req.user.id) },
      },
      {
        $project: {
          title: { $substr: ["$title", 0, 30] },
          body: { $substr: ["$body", 0, 100] },
        },
      },
    ])
      /* Pagination */
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Note.count();

    res.render("dashboard/index", {
      userName: req.user.firstName,
      locals,
      notes,
      layout: "../views/layouts/dashboard",
      current: page,
      pages: Math.ceil(count / perPage),
    });
  } catch (error) {
    console.log(error);
  }
};

/* *
 * Get/
 * View Specific Note Separtly
 * this function is for each user separatly
 */

exports.dashboardViewNote = async (req, res) => {
  const note = await Note.findById({ _id: req.params.id })
    .where({ user: req.user.id })
    .lean();
  /* This gets the user Id */

  /* If statement to render the note */
  if (note) {
    res.render("dashboard/view-note", {
      noteID: req.params.id,
      note,
      layout: "../views/layouts/dashboard",
    });
  } else {
    res.send("We are having problems...");
  }
};

/* *
 * PUT/
 * View Specific Note
 * And Update
 */

exports.dashboardUpdateNote = async (req, res) => {
  try {
    await Note.findOneAndUpdate(
      { _id: req.params.id },
      { title: req.body.title, body: req.body.body }
    ).where({ user: req.user.id });
    res.redirect("/deshboard");
  } catch (error) {
    console.log(error);
  }
};

/* *
 * DELETE/
 * View Specific Note
 * And DELETE
 */

exports.dashboardDeleteNote = async (req, res) => {
  try {
    await Note.deleteOne({ _id: req.params.id }).where({ user: req.user.id });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};
