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
    /* const notes = await Note.find({}); */

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
