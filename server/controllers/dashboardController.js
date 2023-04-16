/*
 * GET /
 * Dashboard
 */

exports.dashboard = async (req, res) => {
  const locals = {
    title: "Dashboard",
    description: "Auth.2 Calandar Note App",
  };
  res.render("dashboard/index", {
    locals,
    layout: "../views/layouts/dashboard",
  });
};
