const router = require("express").Router();
const accountController = ("../../controller/accountController");

router.route("/")
    .get(function(req, res){
        res.send({message: `TODO: return all posts`});
    })
// .get(function(req, res) {
//     console.log("this is the req from router", req)
//     console.log("this is the res from router", res)
// }).post(function(req, res){
//     console.log("this is the req from router", req)
//     console.log("this is the res from router", res)
// });

router.route("/:id")
    .get(accountController.findById)
    .put(accountController.update)
    .delete(accountController.remove);

// router.route("/snapshots")

module.exports = router;
