const path = require("path");
const router = require("express").Router();
const accountsRoutes = require("./account");
const animalsRoutes = require("./animal");

// To look for accounts
router.use("/account", accountsRoutes);

// To look for animals
router.use("/animal", animalsRoutes);

// For anything else, render the html page
router.use(function(req, res) {
    res.sendFile(path.join(__dirname, "../../client/public/index.html"));
  });

module.exports = router;
// {
//  Account: require("./accounts"),
//  animal: require("./animal")
// }
