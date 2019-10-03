const router = require("express").Router();
const accountController = require('../../controller/accountController')

router.route("/")
// .get(function(req,res){
//     res.send({message:'TODO: return all posts'});
//     })
    .get(accountController.findAll)
    .post(accountController.create);

router.route("/:id")
// .get(function(req,res){
//     res.send({message:'TODO: return all posts'});
//     })
    .get(accountController.findById)
    .put(accountController.update)
    .delete(accountController.delete);

// router.route("/snapshots")

module.exports = router;
