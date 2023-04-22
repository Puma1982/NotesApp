require("dotenv").config();

const express = require("express");
const expressLayouts = require("express-ejs-layouts");

/* Override method for update Notes */
const methodOverride = require("method-override");

/* import DB file */
const connectDB = require("./server/config/db");

/* Starting session for Authenticating/passport/MongoStore */
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");

const app = express();
const port = 5001 || process.env.PORT;

/* Initialize session in DB */
app.use(
  session({
    secret: "wawuchka",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* using the PUT & PAT method, override */
app.use(methodOverride("_method"));

/* start to connect the DB */
connectDB();
/* Passport initialization for Oauth */
app.use(passport.initialize());
app.use(passport.session());

// static files
app.use(express.static("public"));

// template engine
app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// App Router
/* Auth-route */
app.use("/", require("./server/routes/auth"));

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
