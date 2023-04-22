const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware/checkAuth");
const dashboardController = require("../controllers/dashboardController");

/**
 * Dasboard Routes
 */

router.get("/dashboard", isLoggedIn, dashboardController.dashboard);

/**
 * Dasboard Routes and type of request, "get"
 */
router.get(
  "/dashboard/item/:id",
  isLoggedIn,
  dashboardController.dashboardViewNote
);

/**
 * Dasboard Routes and type of request, "PUT"
 */
router.put(
  "/dashboard/item/:id",
  isLoggedIn,
  dashboardController.dashboardUpdateNote
);

/**
 * Dasboard Routes and type of request, "DELETE"
 */
router.delete(
  "/dashboard/item-delete/:id",
  isLoggedIn,
  dashboardController.dashboardDeleteNote
);

module.exports = router;
