require("dotenv").config();

const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const app = express();
const port = 5001 || process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// static files
app.use(express.static("public"));

// template engine
app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  // this is for browser tab naming and description
  const locals = {
    title: "Note Calandar App",
    description: "Ejs App",
  };

  res.render("index", locals);
});

app.listen(port, () => {
  console.log(`Listning to port ${port}`);
});
