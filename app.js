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

// App Router
/* index */
app.use("/", require("./server/routes/index"));
/* dashBoard    */
app.use("/", require("./server/routes/dashboard"));

/* Handle the 404 page(this need's to be the last Route) */
app.get("*", function (req, res) {
  res.status(404).render("404");
});

app.listen(port, () => {
  console.log(`Listning to port ${port}`);
});
