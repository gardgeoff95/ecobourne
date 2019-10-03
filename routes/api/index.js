const path = require("path");
const router = require("express").Router();
const accountsRoutes = require("./accounts");
const animalsRoutes = require("./animal");

// To look for accounts
router.use("/accounts", accountsRoutes);

// To look for animals
router.use("/animals", animalsRoutes);

// For anything else, render the html page
router.use(function(req, res) {
    res.sendFile(path.join(__dirname, "../../client/build/index.html"));
  });

module.exports = router;
// {
//  Account: require("./accounts"),
//  animal: require("./animal")
// }

