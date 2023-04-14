/*
 * GET /
 * Homepage
 */

exports.homepage = async (req, res) => {
  const locals = {
    title: "NoteCalandar NodeJs App",
    description: "Auth.2 Calandar Note App",
  };

  res.render("index", locals);
};
/*
 * GET /
 * About
 */

exports.about = async (req, res) => {
  const locals = {
    title: "About NoteCalandar",
    description: "Auth.2 Calandar Note App",
  };

  res.render("about", locals);
};
