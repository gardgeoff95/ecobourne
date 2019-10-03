const path = require("path");
const routers = require("express").Router();
const apiRoutes = require("./api");

// API Routes
routers.use("/api", apiRoutes);

// If no API routes are hit, send the React app
// routers.use((req, res) =>
//     res.sendFile(path.join(__dirname, "../../client/build/index.html"))
// );

module.exports = router;