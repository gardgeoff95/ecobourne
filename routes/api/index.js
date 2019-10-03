const path = require("path");
const router = require("express").Router();
const accountsRoutes = require("./accounts");
const animalsRoutes = require("./animal");

// To look for accounts
router.use("/accounts", accountsRoutes);

// To look for animals
router.use("/animals", animalsRoutes);

module.exports = {
 Account: require("./accounts"),
 animal: require("./animal")
}

